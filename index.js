const { Client, Intents } = require("discord.js");

const client = new Client({ intents: Intents.ALL });

const token = process.env.TOKEN;

client.once("ready", () => {
    client.user.setStatus("online");
    client.user.setActivity('Playing JDBot but in discord.js', {type: 'PLAYING'});

    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Id: ${client.user.id}`);

    let commands = client.application.commands;

    commands.create({
        name: "hi",
        description: "says hello"
    })
});

client.on("interactionCreate", async interation => {
    if(!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName = "hi") interaction.reply({});
});

client.login(token);