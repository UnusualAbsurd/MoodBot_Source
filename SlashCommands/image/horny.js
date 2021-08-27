const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'horny',
    description: 'Make a horny card with the bot',
    options: [
        {
            name: 'user',
            description: 'The user that you want to make the horny card',
            type: "USER",
            required: false,
        }
    ],
    category: 'image',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        const user = interaction.options.getUser(`user`) || interaction.user;

        const embed = new MessageEmbed()
        .setImage(`https://some-random-api.ml/canvas/horny?avatar=${user.displayAvatarURL({format: 'png'})}?size=256`)
        .setColor(color)
        .setTimestamp()

        interaction.followUp({embeds: [embed]})

    }
}