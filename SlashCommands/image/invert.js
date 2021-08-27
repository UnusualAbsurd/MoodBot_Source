const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'invert',
    description: 'make your avatar looks weird..',
    options: [
        {
            name: 'user',
            description: 'The user that you want to make the avatar look weird!',
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
        
        const user = interaction.options.getUser('user') || interaction.user

        const embed = new MessageEmbed()
        .setImage(`https://some-random-api.ml/canvas/invert?avatar=${user.displayAvatarURL({format: 'png'})}?size=512`)
        .setColor(color)

        interaction.followUp({embeds: [embed]})


    }
}