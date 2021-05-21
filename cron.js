import { getUsersByFilter } from "./dbCrud.js";
import { getCalenderByDistrict } from "./api/api.js";
import { Client } from "discord.js";
import { processResults } from "./commands/common.js";

function filterByAge(results, minAge){
    return results.filter((result) => result.ageLimit === minAge);
}

async function initilizeBot(){
    const TOKEN = process.env.TOKEN;
    const bot = new Client();
    await bot.login(TOKEN);
    return bot;
}

function padLeft(num){
    // pad 0 to left
    if(num < 10)
        return `0${num}`;
    return `${num}`;
}

function getDate(){
    const date = new Date();
    
    return `${padLeft(date.getDay())}-${padLeft(date.getMonth())}-${date.getFullYear()}`;
}

export async function job(){
    let cache = {};
    const bot = await initilizeBot();
    const subscribedUsers = await getUsersByFilter({"notify": true});
    for(const user of subscribedUsers){
        if(cache[user.district] === undefined){
            const apiFetch = await getCalenderByDistrict(user.district, getDate(), null);
            if(apiFetch.status)
                cache[user.district] = apiFetch.result;
        } 
        const results = filterByAge(cache[user.district], user.age);
        processResults(bot, null, results, user.userID);
    }
    // Dump Cache After Use
    cache = {};
}
