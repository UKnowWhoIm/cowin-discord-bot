import { Client } from "discord.js";
import { config } from "dotenv";
import { Command } from "./commands/common.js";
import "./commands/loadCommands.js";

config();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;

const getApp = (guildId) => {
	return bot.api
		.applications(bot.user.id)
		.guilds(guildId);
};

const botCmdMap = Command.getCallBackMap();

bot.once("ready", async () => {
  	
	console.log(`Logged in as ${bot.user.tag}!`);
	
	Command.initialize(getApp(GUILD_ID).commands.post);

	bot.ws.on("INTERACTION_CREATE", async (interaction) => {
		console.log(interaction.member);
		const command = interaction.data.name;
		
		if(botCmdMap[command])
			botCmdMap[command](bot, interaction);
	});
});

bot.login(TOKEN);