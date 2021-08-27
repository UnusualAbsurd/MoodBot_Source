const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'howgay',
    description: 'View how gay are you?',
    options: [
      {
          name: 'user',
          description: 'The user that you want to check their gay rate',
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
        
        const random = Math.floor(Math.random() * 100);

        const user = interaction.options.getUser('user') || interaction.user;
        const uri = `https://some-random-api.ml/canvas/gay?avatar=${user.displayAvatarURL({format: 'png'})}?size=256`

        const embed = new MessageEmbed()
        .setAuthor(`How gay is ${user.username}?`)
        .setDescription(`\`${user.tag} is ${random}% gay! 🌈\``)
        .setThumbnail(uri)
        .setTimestamp()
        .setColor(color)

        interaction.followUp({embeds: [embed]})

    }
}