const { Client, Intents } = require("discord.js");
const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });