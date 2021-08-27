const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pixelate',
    description: 'Pixelate a users avatar',
    options: [
        {
          name: 'user',
          description: 'The user avatar you want to pixelate',
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

        const av = `${user.displayAvatarURL({format: 'png'})}?size=512`
        const uri = `https://some-random-api.ml/canvas/pixelate?avatar=${av}`;

        const embed = new MessageEmbed()
        .setImage(uri)
        .setTimestamp()
        .setColor(color)

        interaction.followUp({embeds: [embed]})


 
    }
}