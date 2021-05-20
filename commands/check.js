import { Command, getAge, getUserID, parseDistrict, processResults, sendReply } from "./common.js";
import { readUserData } from "../dbCrud.js";

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

    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    const userInDb = await readUserData(getUserID(interaction));
    
    if(!district){
        // jshint ignore:start
        if(!userInDb?.district) 
            return sendReply(bot, interaction, 
                "Set your district using /set command or enter them while using /check");
        district = userInDb.district;
        // jshint ignore:end
    }
    else{
        let districtData = await parseDistrict(district);
        if(!districtData.code)
            return sendReply(bot, interaction,
                "District not found");
        district = districtData.code;
    }
    if(!age){
        // jshint ignore:start
        if(!userInDb?.age)
            return sendReply(bot, interaction,
                "Set your age using /set command or enter it while using /check");
        age = userInDb.age;
        // jshint ignore:end
    }
    else
        age = getAge(age);

    if(!dateRegex.test(date))
        return sendReply(bot, interaction,
            "Invalid date, please enter date in format dd-mm-yyyy");
    
    await processResults(bot, interaction, district, date, age);
}

new Command(cmdName, cmdData, checkAvailability);
