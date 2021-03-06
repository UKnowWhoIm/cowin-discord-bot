import {
    Command,
    getAge,
    getUserID,
    parseDistrict,
    processResults,
    sendReply,
} from "./common.js";
import {
    createCacheDistrict,
    getCachedDistrict,
    readUserData,
} from "../dbCrud.js";
import { getCalenderByDistrict, getDataFromResponse } from "../api/api.js";

const cmdName = "check";

const cmdData = {
    name: cmdName,
    description: "Check availabilty of slots on a particular date",
    options: [
        {
            name: "date",
            description: "Enter date for checking(DD-MM-YYYY)",
            required: true,
            type: 3, // String
        },
        {
            name: "district",
            description: "Enter district, if omitted will use from history",
            required: false,
            type: 3, // String
        },
        {
            name: "age",
            description: "Enter age, if omitted will use from history",
            required: false,
            type: 3, // String
        },
    ],
};

async function checkAvailability(bot, interaction) {
    const options = interaction.data.options;
    let date = options.filter((option) => option.name === "date")[0].value;

    let district = options.filter((option) => option.name === "district")[0]
        ?.value;
    let age = options.filter((option) => option.name === "age")[0]?.value;
    
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    const userInDb = await readUserData(getUserID(interaction));

    if (!district) {
        if (!userInDb?.district)
            return sendReply(
                bot,
                interaction,
                "Set your district using /set command or enter them while using /check"
            );
        district = userInDb.district;
    } else {
        let districtData = await parseDistrict(district);
        if (!districtData.code)
            return sendReply(bot, interaction, "District not found");
        district = districtData.code;
    }
    if (!age) {
        if (!userInDb?.age)
            return sendReply(
                bot,
                interaction,
                "Set your age using /set command or enter it while using /check"
            );
        age = userInDb.age;
    } else age = getAge(age);

    if (!dateRegex.test(date))
        return sendReply(
            bot,
            interaction,
            "Invalid date, please enter date in format dd-mm-yyyy"
        );

    const cachedDistrict = await getCachedDistrict(district);
    let result;

    if (cachedDistrict)
        result = cachedDistrict.data;
    else {
        const apiFetch = await getCalenderByDistrict(district, date, age);
        if (apiFetch.status) {
            result = apiFetch.result;
            createCacheDistrict({ district: district, data: result }).then(
                console.log(`Cached district ${district}`)
            );
        } else
            sendReply(
                bot,
                interaction,
                "API is not responding, Please try again later"
            );
    }
    if (result)
        processResults(
            bot,
            interaction,
            getDataFromResponse(result, age, date)
        );
}

new Command(cmdName, cmdData, checkAvailability);
