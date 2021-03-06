import { DateTime } from "luxon";
import { bulkCreateCacheDistrict, clearCache, getUsersByFilter } from "./dbCrud.js";
import { getCalenderByDistrict, getDataFromResponse } from "./api/api.js";
import { Client } from "discord.js";
import { processResults } from "./commands/common.js";
import { BOT_TOKEN } from "./config.js";

async function initilizeBot() {
    const TOKEN = BOT_TOKEN;
    const bot = new Client();
    await bot.login(TOKEN);
    return bot;
}

function padLeft(num) {
    // pad 0 to left
    if (num < 10) return `0${num}`;
    return `${num}`;
}

function getDate() {
    const date = new Date();
    return `${padLeft(date.getDate())}-${padLeft(
        date.getMonth() + 1
    )}-${date.getFullYear()}`;
}

function processDataForStorage(cached) {
    // Convert to list of objects for db storage
    let finalData = [];
    for (const key of Object.keys(cached)) {
        finalData.push({
            district: key,
            data: cached[key],
        });
    }
    return finalData;
}

export async function job() {
    await clearCache();
    let cache = {};
    const bot = await initilizeBot();
    const subscribedUsers = await getUsersByFilter({ notify: true });
    for (const user of subscribedUsers) {
        if (cache[user.district] === undefined) {
            const apiFetch = await getCalenderByDistrict(
                user.district,
                getDate(),
                null,
                false
            );
            if (apiFetch.status) cache[user.district] = apiFetch.result;
        }
        if (cache[user.district]) {
            const results = getDataFromResponse(
                cache[user.district],
                user.age,
                DateTime.now().toFormat("dd-MM-yyyy"),
            );
            processResults(bot, null, results, user.userID);
        }
    }
    bulkCreateCacheDistrict(processDataForStorage(cache));
}
