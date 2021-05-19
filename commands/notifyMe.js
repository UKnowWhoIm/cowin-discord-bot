import { Command, sendReply } from "./common.js";

const name = "notify-me";

const commandData = {
    "name": "notify-me",
    "description": "Send hourly alerts if slot is available"
};

function addUserToListners(bot, interaction){
    const user = interaction.member.user;
    sendReply(bot, interaction, 
        `User ${user.username}#${user.discriminator} subscribed`);
}

new Command(name, commandData, addUserToListners);