import { findBestMatch } from "string-similarity";
import { getCalenderByDistrict } from "../api/api.js";
import { getDistricts } from "../dbCrud.js";

export class Command{
    static instances = [];    // jshint ignore:line

    constructor(cmdName, cmdData, cmdCallBack){
        this.name = cmdName;
        this.data = cmdData;
        this.callback = cmdCallBack;
        Command.instances.push(this);
    }

    static initialize(appInstance){
        // Create all commands
        Command.instances.forEach(async (instance) => {
            await appInstance({
                "data": instance.data
            });
        });
    }

    static getCallBackMap(){
        let map = {};
        Command.instances.forEach((instance) => {
            map[instance.name] = instance.callback;
        });
        return map;
    }
}


export function sendReply(bot, interaction, msg){
    bot.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: msg
            }
        }
    });
}
export const getUserID = (interaction) => interaction.member.user.id;

export const getAge = (age) => age >= 45 ? 45 : 18;

export function sendDM(bot, userId, msg){
    bot.users.fetch(userId).then(dm => dm.send(msg));
}

export async function parseDistrict(district){
    // TODO: return multiple matches if it exists.
    const minDiceCoeff = 0.8;
    const districtsInDb = await getDistricts();
    const districtNames = districtsInDb.map((districtDoc) => districtDoc.districtName.toLowerCase());
    const matches = findBestMatch(district.toLowerCase(), districtNames).ratings
        .filter((match) => match.rating >= minDiceCoeff);
    console.log(districtsInDb.filter((district) => district.districtName.toLowerCase() === matches[0]?.target));
    /* jshint ignore:start */
    return {
        "name": matches[0]?.target,
        "code": districtsInDb.filter((district) => 
            district.districtName.toLowerCase() === matches[0]?.target
        )[0]?.districtID
    };
    /* jshint ignore:end */
}

export async function processResults(bot, interaction, district, date, age){
    const apiFetch = await getCalenderByDistrict(district, date, age);
    if(apiFetch.status){
        if(apiFetch.result.length > 0){
            apiFetch.result.forEach((session) => sendDM(bot, getUserID(interaction),
            `
<<<<<<<< New Center Available >>>>>>>>  
Center Name: ${session.name}
Address: ${session.address}
PinCode: ${session.pincode}
Fee Type: ${session.feeType}
Vaccine: ${session.vaccine}
Dose1 Capacity: ${session.dose1Capacity}
Dose2 Capacity: ${session.dose2Capacity}
Age Limit: ${session.ageLimit}`)
            );
            return sendReply(bot, interaction,
                "Slots available");
        }
        return sendReply(bot, interaction, 
            "No slots available");
    }
    sendReply(bot, interaction, 
        "Internal Server Error, Please try again later");
}