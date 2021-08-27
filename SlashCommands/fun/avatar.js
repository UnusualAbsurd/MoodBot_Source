const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'View a users avatar',
    options: [
        {
            name: 'user',
            description: 'The user that you want to view the avatar as.',
            type: 'USER',
            required: false

        }
    ],
    category: 'fun',    
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
      
        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new MessageEmbed()
        .setAuthor(`${user.tag} Avatar`, user.displayAvatarURL({dynamic: true}))
        .setImage(`${user.displayAvatarURL({dynamic: true})}?size=512`)
        .setColor(color)
        .setTimestamp()

        interaction.followUp({embeds: [embed]})

    }
}