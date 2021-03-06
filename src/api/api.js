import { IS_PROXY } from "../config.js";
import { DateTime } from "luxon";
import {
    api,
    getStatesPath,
    getDistrictsByStatePath,
    getCalenderByPinPath,
    getCalenderByDistrictPath,
} from "./helper.js";

function getDataFromResponse(res, age, date) {
    let data = [];
    let flag = 0;
    for (const r of res) {
        /* jshint ignore:start */
        flag = 0;
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
        result.sessions = [];
        for (const session of r.sessions) {
            let d1 = DateTime.fromFormat(session.date, "dd-MM-yyyy").startOf(
                "day"
            );
            let d2 = DateTime.fromFormat(date, "dd-MM-yyyy").startOf("day");
            if (d1 >= d2) {
                let center = {
                    date: session.date,
                    totalCapacity: session.available_capacity,
                    dose1Capacity: session.available_capacity_dose1,
                    dose2Capacity: session.available_capacity_dose2,
                    ageLimit: session.min_age_limit,
                    vaccine: session.vaccine,
                    slots: session.slots,
                };
                if (center.totalCapacity > 0 && age === center.ageLimit) {
                    result.sessions.push(center);
                    flag = 1;
                }
            }
        }
        /* jshint ignore:end */
        if (flag === 1)
            data.push(result);
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

async function getCalenderByPin(pin, date, age, process = true) {
    try {
        const res = await api.get(
            `${getCalenderByPinPath}pincode=${pin}&date=${date}`
        );

        if (res.status === 200) {
            const result = res.data.centers;
            if (result !== undefined)
                return {
                    status: true,
                    result: process ? getDataFromResponse(result, age) : result,
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

async function getCalenderByDistrict(id) {
    try {
        console.log("API CALL");
        const today = DateTime.now().toFormat("dd-MM-yyyy");
        const url = `${getCalenderByDistrictPath}district_id=${id}&date=${today}`;
        const res = await api.get(url);
        let result = res.data;

        if (IS_PROXY) result = result.data.centers;
        else result = result.centers;

        if (res.status === 200) {
            if (result !== undefined) {
                return {
                    status: true,
                    result: result,
                };
            } else throw new Error("Centers are undefined");
        } else {
            if (res.status === 400) throw new Error(res.error);

            if (res.status === 401) throw new Error("Unauthenticated access!");

            if (res.status === 500) throw new Error("Internal Server Error");
        }
    } catch (e) {
        console.log(e);
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
    getDataFromResponse,
};
