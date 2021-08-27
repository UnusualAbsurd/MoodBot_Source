const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'blurple',
    description: 'Make your avatar blurple! 💙💜',
    options: [
        {
            name: 'user',
            description: 'The user that you want to set their avatar to blurple',
            type: "USER",
            required: false

        }
    ],
    category: 'image',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new MessageEmbed()
        .setImage(`https://some-random-api.ml/canvas/blurple2?avatar=${user.displayAvatarURL({format: 'png'})}?size=512`)
        .setColor(color)
        .setTimestamp()

        interaction.followUp({embeds: [embed]})

    }
}