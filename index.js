const { Client, Intents } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");

const client = new Client({ intents: 32767 });

// Keep repl process alive
require("http").createServer((req, res) => res.end("JDBot.js is up and running ")).listen(8080);

let commands = [];
const files = fs.readdirSync("commands").filter(file => file.endsWith(".js"));
files.forEach(file => commands.push(require(`commands${file}`).data.toJSON()));

client.once("ready", () => {
    // Status
    const statuses = [
        { 
            msg: 'JDBot but in discord.js', 
            type: 'PLAYING' 
        }, 
        {
            msg: `${client.guilds.cache.size === 0 ? "No " : client.guilds.cache.size} servers | ${client.users.cache.size === 0 ? "No " : client.users.cache.size} Users`,
            type: 'WATCHING'
        },
        {
            msg: 'Watching new updates coming soon...',
            type: 'WATCHING'
        }
    ];
    var i = 0;
    function changeStatus() {
        client.user.setActivity(statuses[i].msg, statuses[i].type);
        i++;
    }
    client.user.setStatus("online");
    changeStatus();
    setTimeout(changeStatus, 60000);

    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Id: ${client.user.id}`);

    // This is a lot of new code I will explain once you get back
    const rest = new REST({
        version: '9'
    }).setToken(process.env.TOKEN);
    // This is a self executing asyncronous arrow function
    (async () => {
        // Here is the error handling you wanted
        try {
            await rest.put(
                // The testing guild is the server that will get the commands without wait
                Routes.applicationCommands(client.user.id, process.env.TESTING_GUILD), 
                {
                    body: commands
                }
            );
        } catch (error) {
            console.log(error);
        }
    })();
});

client.on("interactionCreate", async interaction => {
    // If the command doesn't exist or is being ran by a bot; exit
    if (!interaction.isCommand() || interaction.user.bot) return;
    const command = commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "Could't run command due to an error!", ephemeral: true
        });
    }
});
