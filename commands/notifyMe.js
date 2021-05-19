import { Command, sendReply } from "./common.js"

const name = "notify-me";

const commandData = {
    "name": "notify-me",
    "description": "Send hourly alerts if slot is available"
}

function addUserToListners(bot, interaction){
    sendReply(bot, interaction, `User ${interaction.member.user.username}#${interaction.member.user.discriminator} subscribed`)
}

new Command(name, commandData, addUserToListners);