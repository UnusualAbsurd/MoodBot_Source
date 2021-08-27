const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'porn',
    description: 'Get a porn image , for your thirst!',
    category: 'nsfw',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        

        if(!interaction.channel.nsfw) return interaction.followUp('You need to be in a NSFW type channel to use this command!')

        const send = await interaction.followUp('Here is your image!')

        const embed = new MessageEmbed()
        .setTitle(`🤣 LOL , GET BAITED 😂`)
        .setImage('https://c.tenor.com/DAHTLrMlhHQAAAAC/4k-caught-in4k.gif')
        .setColor(color)

        send.reply({ephermeral: true, embeds: [embed]})

    }
}