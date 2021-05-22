import { updateUserData } from "../dbCrud.js";
import { Command, getUserID, sendReply } from "./common.js";

const cmdName = "unsubscribe";

const commandData = {
    "name": cmdName,
    "description": "Unsubscribe from hourly alerts"
};

function unsubscribe(bot, interaction){
    updateUserData(getUserID(interaction), {"notify": false});
    sendReply(bot, interaction,
        "You have been unsubscribed from hourly notifications");
}

new Command(cmdName,commandData, unsubscribe);