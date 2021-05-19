import { Command, sendReply } from "./common.js";
import { getCalenderByDistrict } from "../api/api.js";

const cmdName = "check";

const cmdData = {
    "name": cmdName,
    "description": "Check availabilty of slots on a particular date",
    "options": [
        {
            "name": "date",
            "description": "Enter date for checking(DD-MM-YYYY)",
            "required": true,
            "type": 3 // String
        },
        {
            "name": "district",
            "description": "Enter district, if omitted will use from history",
            "required": false,
            "type": 3 // String
        },
        {
            "name": "age",
            "description": "Enter age, if omitted will use from history",
            "required": false,
            "type": 3 // String
        }
    ]
};

async function checkAvailability(bot, interaction){
    const options = interaction.data.options;
    let date = options.filter((option) => option.name === "date")[0].value;
   
    /* jshint ignore:start */
    let district = options.filter((option) => option.name === "district")[0]?.value;
    let age = options.filter((option) => option.name === "age")[0]?.value
    /* jshint ignore:end */
    
    sendReply(bot, interaction, `Check availabilty for ${date} ${district} ${age}`);
}

new Command(cmdName, cmdData, checkAvailability);