const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'pass',
    description: 'Pass a mission and gain respect! 🙋‍♂️',
    options: [
        {
            name: 'user',
            description: 'The user that you want to give respect to!',
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
        .setImage(`https://some-random-api.ml/canvas/passed?avatar=${user.displayAvatarURL({format: 'png'})}?size=512`)
        .setColor(color)

        interaction.followUp({embeds: [embed]})


    }
}