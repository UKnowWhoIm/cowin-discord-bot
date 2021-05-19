import { Command, sendReply } from "./common.js";

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

function checkAvailability(bot, interaction){
    const options = interaction.data.options;
    let date = options.filter((option) => option.name === "date")[0].value;
    let district = options.filter((option) => option.name === "district")[0];
    let age = options.filter((option) => option.name === "age")[0];
    
    if(district)
        district = district.value;
    if(age)
        age = age.value;
    
    sendReply(bot, interaction, `Check availabilty for ${date} ${district} ${age}`);
}

new Command(cmdName, cmdData, checkAvailability);