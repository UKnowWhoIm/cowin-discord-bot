import { Client } from "discord.js";
import { Command } from "./commands/common.js";
import "./commands/loadCommands.js";
import { DEBUG, BOT_TOKEN, GUILD_ID } from "./config.js";

const bot = new Client();

const getApp = (guildId) => {
	const app = bot.api.applications(bot.user.id);
	
	if(DEBUG)
		return app.guilds(guildId);
	
	return app;
		
};

const botCmdMap = Command.getCallBackMap();

bot.once("ready", async () => {
  	
	console.log(`Logged in as ${bot.user.tag}!`);
	
	Command.initialize(getApp(GUILD_ID).commands.post);

	bot.ws.on("INTERACTION_CREATE", async (interaction) => {
		const command = interaction.data.name;
		
		if(botCmdMap[command])
			botCmdMap[command](bot, interaction);
	});
});

bot.login(BOT_TOKEN);