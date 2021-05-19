import { Command, sendReply } from "./common.js";

const name = "set";

const commandData = {
    "name": "set",
    "description": 'Set age/district of vaccinator',
    "options": [
        {
            "name": "age",
            "description": "Set Vaccinator's age",
            "type": 1, // Subcommand
            "options": [
                {
                    "name": "age",
                    "description": "Vaccinator's age",
                    "required": true,
                    "type": 4 // Integer
                }
            ]
        },
        {
            "name": "district",
            "description": "Set Preferred District",
            "type": 1, // Subcommand
            "options": [
                {
                    "name": "district",
                    "description": "Preferred district",
                    "required": true,
                    "type": 3 // String
                }
            ]
        },
    ]
}

function extractValueOfSubCommand(data){
    return data.options[0].options[0].value;
}

function extractSubCommand(data){
    return data.options[0].name;
}

function setAgeOrDistrict(bot, interaction){
    let data = interaction.data;
    let subCommand = extractSubCommand(data);    
    let subValue = extractValueOfSubCommand(data);

    let msg;

    if(subCommand === "age")
        msg = `Your Age is ${subValue}`;
    else if(subCommand === "district")
        msg = `Your District is ${subValue}`;
    
    sendReply(bot, interaction, msg);
}

new Command(name, commandData, setAgeOrDistrict);