const { Client, Intents } = require("discord.js");

const client = new Client({ intents: 32767 });

const token = process.env.TOKEN;

client.once("ready", () => {
    client.user.setStatus("online");
    client.user.setActivity('Playing JDBot but in discord.js', {type: 'PLAYING'});

    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Id: ${client.user.id}`);

    const guildId = "438848185008390158";
    const guild = client.guilds.cache.get(guildId);

    let commands;

    if (guild) commands = guild.commands;
    else commands = client.application.commands;

    commands.create({
        name: "hi",
        description: "says hello"
    });
});

client.on("interactionCreate", async () => {
    if(!interaction.isCommand()) return;

    if (interaction.commandName = "hi") await interaction.reply({ content: "hello" });
});

client.login(token);

