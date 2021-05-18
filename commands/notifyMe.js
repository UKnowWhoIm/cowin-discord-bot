import { sendReply } from "./common.js"

export const commandData = {
    "name": "notify-me",
    "description": "Send hourly alerts if slot is available"
}

export function addUserToListners(bot, interaction){
    sendReply(bot, interaction, `User ${interaction.member.user.username}#${interaction.member.user.discriminator} subscribed`)
}