import {
    getStates,
    getDistrictsByStateId,
    getCalenderByPin,
    getCalenderByDistrict,
} from "./api/api.js";

async function blah() {
    console.log(await getCalenderByDistrict(376, "20-05-2021"));
}

blah();
