const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'comrade',
    description: 'Become a comrade! 💂‍♀️',
    options: [
        {
            name: 'user',
            description: 'The user that you want to hire as a comrade!',
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
        .setImage(`https://some-random-api.ml/canvas/comrade?avatar=${user.displayAvatarURL({format: 'png'})}?size=512`)
        .setColor(color)

        interaction.followUp({embeds: [embed]})


    }
}