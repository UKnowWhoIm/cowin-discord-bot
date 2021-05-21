import { readUserData, updateUserData } from "../dbCrud.js";
import { Command, sendReply } from "./common.js";

const cmdName = "notify-me";

const commandData = {
    "name": cmdName,
    "description": "Send hourly alerts if slot is available"
};

async function addUserToListners(bot, interaction){
    const user = interaction.member.user;
    
    const userInDB = await readUserData(user.id);
    
    // jshint ignore:start
    if(!userInDB?.district)
        return sendReply(bot, interaction,
            "Set your district using /set command to recieve hourly notifications");
    if(!userInDB?.age)
        return sendReply(bot, interaction,
            "Set your age using /set command to recieve hourly notifications")
    // jshint ignore:end

    updateUserData(user.id, {"notify": true});
    sendReply(bot, interaction, `You have subscribed to hourly notifications`);
    
}

new Command(cmdName, commandData, addUserToListners);