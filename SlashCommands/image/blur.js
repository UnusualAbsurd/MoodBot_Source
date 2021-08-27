const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'blur',
    description: 'Make your avatar blur',
    options: [
        {
            name: 'user',
            description: "The users avatar that you want to blur",
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

        const av = `${user.displayAvatarURL({format: 'png'})}?size=512`;
        const uri = `https://some-random-api.ml/canvas/blur?avatar=${av}`

        const embed = new MessageEmbed()
        .setImage(uri)
        .setColor(color)
        .setTimestamp()

        interaction.followUp({embeds: [embed]})

    }
}