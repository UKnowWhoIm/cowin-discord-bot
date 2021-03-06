import axios from "axios";
import { API_BASE } from "../config.js";

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        accept: "application/json",
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
    },
});

const getStatesPath = "admin/location/states/";
const getDistrictsByStatePath = "admin/location/districts";
const getCalenderByPinPath = "appointment/sessions/public/calendarByPin?";
const getCalenderByDistrictPath =
    "appointment/sessions/public/calendarByDistrict?";

export {
    api,
    getStatesPath,
    getDistrictsByStatePath,
    getCalenderByPinPath,
    getCalenderByDistrictPath,
};
