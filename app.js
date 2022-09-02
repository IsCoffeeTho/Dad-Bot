const prefix = "dad ";
var botauthor = {
  id : "274012313785466881"
};

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const cmds = require("./commands.js");
const cc = require("./concolors.js")
const bot = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
	disableEveryone: true
});

// bot.commands = new Discord.Collection();

Object.size = (obj) =>
{
	var size = 0;
	for (var key in obj)
		if(obj.hasOwnProperty(key))
			size++;
	return size;
};

bot.on("ready", async () => {
	console.log(cc.fg.lime+"Bot Active!"+cc.reset);
	bot.users.fetch(botauthor.id).then((val) => {
		botauthor = val;
		console.log(`Author: ${val.username}#${val.discriminator}`);
	});
	bot.user.setActivity("a joke off",{type:5});
});

bot.on("messageCreate", async (message) => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	if (message.content.startsWith(prefix))
	{
		var v = message.content.slice(prefix.length).split(" ");
		var c = v.length;
		if (v[0] == "help")
		{
			var body = [];
			for (var key in cmds.commands)
				body.push({
					name : `${prefix}${cmds.commands[key].syntax}`,
					value : `${cmds.commands[key].shortdesc}`
				});

			const helpEmbed = new EmbedBuilder(
				{
					color : 0xE6E7A3,
					title: "Commands",
					footer: {
						text: `Made By ${botauthor.username}#${botauthor.discriminator}`,
						icon_url: `https://cdn.discordapp.com/avatars/${botauthor.id}/${botauthor.avatar}.png?size=128`
					},
					fields: body
				}
			);
			
			message.channel.send({
				embeds: [
					helpEmbed
				]
			});
		}
		else if (cmds.commands[v[0]])
			message.channel.send(cmds.commands[v[0]].run(v));
	}
});

bot.login(process.env['token']);
