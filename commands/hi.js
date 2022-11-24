const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Says hello."),
    async execute(interaction) {
        interaction.reply({
            content: `Hello ${interaction.user.username}${interaction.user.discriminator}`
        })
    }
}