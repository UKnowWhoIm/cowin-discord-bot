import { sendReply, Command } from "./common.js";

const helpText = `Available Commands

/set district <DISTRICT>: Set desired district
/set age <AGE>: Set vaccinator's age.
/notify-me: Notify user hourly if there are slots available for a week.
/check <AGE> <DATE> <DISTRICT>: Check vaccine availability now for these parameters.`;

const cmdName = "help";

const commandData = {
    "name": cmdName,
    "description": "Help",
};

function showHelp(bot, interaction){
    sendReply(bot, interaction, helpText);
}

new Command(cmdName, commandData, showHelp);