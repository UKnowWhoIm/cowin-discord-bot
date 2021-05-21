import {
    api,
    getStatesPath,
    getDistrictsByStatePath,
    getCalenderByPinPath,
    getCalenderByDistrictPath,
} from "./helper.js";

function getDataFromResponse(res, age) {
    let data = [];
    for (const r of res) {
        /* jshint ignore:start */
        let result = {
            centerId: r.center_id,
            name: r.name,
            address: r.address,
            pincode: r.pincode,
            blockName: r.block_name,
            from: r.from,
            to: r.to,
            feeType: r.fee_type,
        };
        for (const session of r.sessions) {
            result.totalCapacity = session.available_capacity;
            result.dose1Capacity = session.available_capacity_dose1;
            result.dose2Capacity = session.available_capacity_dose2;
            result.ageLimit = session.min_age_limit;
            result.vaccine = session.vaccine;
            result.slots = session.slots;
        }
        /* jshint ignore:end */

        if (result.totalCapacity && age === result.ageLimit)
            data = [...data, result];
    }
    return data;
}

async function getStates() {
    try {
        const res = await api.get(getStatesPath);

        if (res.status === 200) {
            if (res.data.states !== undefined)
                return {
                    status: true,
                    result: res.data.states,
                };
            else throw new Error("State is undefined");
        } else {
            if (res.status === 401) throw new Error("Unauthenticated access!");

            if (res.status === 500) throw new Error("Internal Server Error");
        }
    } catch (error) {
        return {
            status: false,
            result: error.message,
        };
    }
}

async function getDistrictsByStateId(id) {
    try {
        const res = await api.get(`${getDistrictsByStatePath}/${id}`);

        if (res.status === 200) {
            if (res.data.districts !== undefined)
                return {
                    status: true,
                    result: res.data.districts,
                };
            else throw new Error("District is undefined");
        } else {
            if (res.status === 401) throw new Error("Unauthenticated access!");

            if (res.status === 500) throw new Error("Internal Server Error");
        }
    } catch (e) {
        return {
            status: false,
            message: e.message,
        };
    }
}

async function getCalenderByPin(pin, date, age, process=true) {
    try {
        const res = await api.get(
            `${getCalenderByPinPath}pincode=${pin}&date=${date}`
        );

        if (res.status === 200) {
            const result = res.data.centers;
            if (result !== undefined)
                return {
                    status: true,
                    result: (process) ? getDataFromResponse(result, age) : result,
                };
            else throw new Error("Centers are undefined");
        } else {
            if (res.status === 400) throw new Error(res.error);

            if (res.status === 401) throw new Error("Unauthenticated access!");

            if (res.status === 500) throw new Error("Internal Server Error");
        }
    } catch (e) {
        return {
            status: false,
            message: e.message,
        };
    }
}

async function getCalenderByDistrict(id, date, age, process=true) {
    try {
        const url = `${getCalenderByDistrictPath}district_id=${id}&date=${date}`;
        const res = await api.get(url);

        if (res.status === 200) {
            const result = res.data.centers;
            if (result !== undefined)
                return {
                    status: true,
                    result: (process) ? getDataFromResponse(result, age) : result,
                };
            else throw new Error("Centers are undefined");
        } else {
            if (res.status === 400) throw new Error(res.error);

            if (res.status === 401) throw new Error("Unauthenticated access!");

            if (res.status === 500) throw new Error("Internal Server Error");
        }
    } catch (e) {
        return {
            status: false,
            message: e.message,
        };
    }
}

export {
    getStates,
    getDistrictsByStateId,
    getCalenderByPin,
    getCalenderByDistrict,
    getDataFromResponse
};
