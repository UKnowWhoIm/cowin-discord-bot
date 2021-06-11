import { findBestMatch } from "string-similarity";
import { getDistricts } from "../dbCrud.js";

export class Command {
    static instances = []; // jshint ignore:line

    constructor(cmdName, cmdData, cmdCallBack) {
        this.name = cmdName;
        this.data = cmdData;
        this.callback = cmdCallBack;
        Command.instances.push(this);
    }

    static initialize(callback) {
        // Create all commands
        Command.instances.forEach(async (instance) => {
            await callback({
                "data": instance.data
            });
        });
    }

    static getCallBackMap() {
        let map = {};
        Command.instances.forEach((instance) => {
            map[instance.name] = instance.callback;
        });
        return map;
    }
}


export function sendReply(bot, interaction, msg) {
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

export const getAge = (age) => {
    switch (true) {
        case age >= 40 && age <= 44:
            return 40;
        case age >= 45:
            return 45;
        default:
            return 18;
    }
}

export async function sendDM(bot, userId, msg) {
    const user = await bot.users.fetch(userId);
    user.send(msg);
}

export async function parseDistrict(district) {
    // TODO: return multiple matches if it exists.
    const minDiceCoeff = 0.8;
    const districtsInDb = await getDistricts();
    const districtNames = districtsInDb.map((districtDoc) => districtDoc.districtName.toLowerCase());
    const matches = findBestMatch(district.toLowerCase(), districtNames).ratings
        .filter((match) => match.rating >= minDiceCoeff);

    return {
        "name": matches[0]?.target,
        "code": districtsInDb.filter((district) =>
            district.districtName.toLowerCase() === matches[0]?.target
        )[0]?.districtID
    };
}

function getSessionText(sessions) {
    let result = "";
    sessions.forEach((session) => result += `
-------- DATE: ${session.date} --------
Age Limit: ${session.ageLimit}
Vaccine: ${session.vaccine}
Dose1 Capacity: ${session.dose1Capacity}
Dose2 Capacity: ${session.dose2Capacity}`);
    return result;
}

export async function processResults(bot, interaction, results, userID) {
    if (results.length > 0) {
        if (!userID)
            sendReply(bot, interaction,
                "Slots available");
        for (const center of results)
            await sendDM(bot, userID ?? getUserID(interaction), `
<<<<<<<< New Center Available >>>>>>>>
Center Name: ${center.name}
Address: ${center.address}
Pincode: ${center.pincode}
Fee Type: ${center.feeType} ${getSessionText(center.sessions)}`);

        return sendDM(bot, userID ?? getUserID(interaction),
            `Register Now: https://www.cowin.gov.in/home
***I'm a bot, so don't reply***....
`);
    }
    if (!userID)
        return sendReply(bot, interaction,
            "No slots available");
}