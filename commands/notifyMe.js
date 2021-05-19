import { Command, sendReply, sendDM } from "./common.js";

const name = "notify-me";

const commandData = {
    "name": "notify-me",
    "description": "Send hourly alerts if slot is available"
};

function addUserToListners(bot, interaction){
    const user = interaction.member.user;
    console.log(user);
    sendReply(bot, interaction, `User ${user.id} subscribed`);

    //sendDM(bot, user.id, `User ${user.id} subscribed`)
}

new Command(name, commandData, addUserToListners);