import {
    api,
    getStatesPath,
    getDistrictsByStatePath,
    getCalenderByPinPath,
    getCalenderByDistrictPath,
} from "./helper.js";

async function getStates() {
    try {
        const res = await api.get(getStatesPath);

        if (res.status === 200) {
            console.log(res);
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

async function getCalenderByPin(pin, date) {
    try {
        const res = await api.get(
            `${getCalenderByPinPath}pincode=${pin}&date=${date}`
        );

        if (res.status === 200) {
            if (res.data.centers !== undefined)
                return {
                    status: true,
                    result: res.data.centers,
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

async function getCalenderByDistrict(id, date) {
    try {
        const res = await api.get(
            `${getCalenderByDistrictPath}district_id=${id}&date=${date}`
        );

        if (res.status === 200) {
            if (res.data.centers !== undefined)
                return {
                    status: true,
                    result: res.data.centers,
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
};
