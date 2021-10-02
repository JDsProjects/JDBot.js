const { Client, Intents } = require("discord.js");

const client = new Client({ intents: 32767 });

// Keep repl process alive
require("http").createServer((req, res) => res.end("JDBot.js is up and running ")).listen(8080);

const statuses = [
    { msg: 'JDBot but in discord.js', type: 'PLAYING' }, 
    { msg: `${client.guilds.cache.size} | ${client.users.cache.size}`, type: 'WATCHING'},
    { msg: 'watching new updates coming soon...', type: 'WATCHING' }
];

var i = 0;
function changeStatus() {
    client.user.setActivity(statuses[i].msg, statuses[i].type);
    i++;
}

// When the bot is authenticated to Discord
client.once("ready", () => {
    // Status
    client.user.setStatus("online");
    changeStatus();
    setTimeout(changeStatus, 60000);

    // Debug
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Id: ${client.user.id}`);

    // Register commands
    client.application.commands.create({
        name: "hi",
        description: "says hello"
    });
});

// When a command is called
client.on("interactionCreate", async msg => {
    // If the command doesn't exist or is being ran by a bot; exit
    if (!msg.isCommand() || msg.user.bot) return;

    // Next time we will make a modular command handler
    if (msg.commandName = "hi") await msg.reply({ content: `Hello ${msg.user.username}${msg.user.discriminator}`});
});

// Authenticate to Discord API
client.login(process.env.TOKEN);