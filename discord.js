import { Client } from "discord.js";
import { config } from "dotenv";
import { commandData as helpCmdData, showHelp } from "./commands/help.js";
import { commandData as setCmdData, setAgeOrDistrict } from "./commands/set.js";
import { commandData as notifyCmdData, addUserToListners } from "./commands/notifyMe.js";

config();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;

const getApp = (guildId) => {
	return bot.api
		.applications(bot.user.id)
		.guilds(guildId);
};

const botCmdMap = {
	"help": showHelp,
	"set": setAgeOrDistrict,
	"notify-me": addUserToListners
};

bot.once("ready", async () => {
  	console.log(`Logged in as ${bot.user.tag}!`);
	const commands = await getApp(GUILD_ID).commands.get();
	/*
	await getApp(GUILD_ID).commands.post({
		"data": notifyCmdData
	});
	await getApp(GUILD_ID).commands.post({
		"data": helpCmdData
	});
	
	await getApp(GUILD_ID).commands.post({
		"data": setCmdData
	});
	*/

	console.log(commands);

	bot.ws.on("INTERACTION_CREATE", async (interaction) => {
		const command = interaction.data.name.toLowerCase();
		
		if(botCmdMap[command])
			botCmdMap[command](bot, interaction);
	});
});

bot.login(TOKEN);