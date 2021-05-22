import { Command, sendReply, parseDistrict, getUserID, getAge } from "./common.js";
import { createUser, updateUserData, readUserData } from "../dbCrud.js";

const name = "set";

const commandData = {
    "name": "set",
    "description": "Set age/district of vaccinator",
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
};

function extractValueOfSubCommand(data){
    return data.options[0].options[0].value;
}

function extractSubCommand(data){
    return data.options[0].name;
}

async function setAgeOrDistrict(bot, interaction){
    const data = interaction.data;
    const subCommand = extractSubCommand(data);    
    let subValue = extractValueOfSubCommand(data);
    let userData = {};
    // data = {subCommand: subValue} makes the key "subCommand"
    let msg;
   
    if(subCommand === "age"){
        subValue = getAge(subValue);
        msg = `Vaccination age slot set to ${subValue}`;
    }
    else if(subCommand === "district"){
        let districtData = await parseDistrict(subValue);
        if(!districtData.code)
            return sendReply(bot, interaction, "District not found");
        subValue = districtData.code;
        msg = `District set to ${districtData.name}`;
    }

    userData[subCommand] = subValue;
    const userInDb = await readUserData(getUserID(interaction));
    if(userInDb){
        await updateUserData(userInDb.userID, userData);
    }
    else{
        await createUser(interaction.member.user.id, userData);
    }
    sendReply(bot, interaction, msg);
}

new Command(name, commandData, setAgeOrDistrict);