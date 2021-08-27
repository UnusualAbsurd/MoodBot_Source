const { CommandInteraction, Client, MessageAttachment, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'kill',
    description: 'Kill a user',
    options: [
        {
            name: 'user',
            description: 'The user that you want to trigger',
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
        
        const user = interaction.options.getUser('user') 

        if(user) {
            const embed = new MessageEmbed()
            .setTitle(`${interaction.user.tag} has killed ${user.tag}! 💀`)
            .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${user.displayAvatarURL({format: 'png'})}?size=512`)
            .setColor(color)
            .setTimestamp()

            interaction.followUp({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setTitle(`${interaction.user.tag} has killed himself! 💀`)
            .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${interaction.user.displayAvatarURL({format: 'png'})}?size=512`)
            .setColor(color)
            .setTimestamp()

            interaction.followUp({embeds: [embed]})

        }

        


    }
}