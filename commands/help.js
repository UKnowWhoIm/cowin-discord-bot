import { sendReply, Command } from "./common.js"

const helpText = "Available Commands\n/set district <DISTRICT>: Set desired district\n/set age <AGE>: Set vaccinator's age.\n/notify-me: Notify user hourly if there are slots available for a week.\n/check <AGE> <DATE> <DISTRICT>: Check vaccine availability now for these parameters.";

const cmdName = "help";

const commandData = {
    "name": cmdName,
    "description": "Help",
};

function showHelp(bot, interaction){
    sendReply(bot, interaction, helpText);
}

new Command(cmdName, commandData, showHelp);