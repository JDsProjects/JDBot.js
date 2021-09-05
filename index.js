const { Client, Intents } = require("discord.js");
const token = process.env.TOKEN;
const allIntents = new Intents(32767);
const client = new Client({ allIntents });

client.once("ready", () => {
    console.log("Bot has connected to discord also hi jdjg!");
});

client.login(token);