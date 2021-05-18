import { sendReply } from "./common.js"

const helpText = "Available Commands\n/set district <DISTRICT>: Set desired district\n/set age <AGE>: Set vaccinator's age.\n/notify-me: Notify user hourly if there are slots available for a week.\n/check <AGE> <DATE> <DISTRICT>: Check vaccine availability now for these parameters.";

export const commandData = {
    "name": "help",
    "description": "Help",
};

export function showHelp(bot, interaction){
    sendReply(bot, interaction, helpText);
}