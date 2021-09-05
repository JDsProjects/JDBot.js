const { Client, Intents } = require("discord.js"),
    token = process.env.TOKEN,
    allIntents = new Intents(32767),
    client = new Client({ allIntents });

client.once("ready", () => {
    client.user.setStatus("online");
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Id: ${client.user.id}`);
});

client.login(token);
