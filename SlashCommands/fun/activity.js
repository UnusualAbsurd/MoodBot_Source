const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'bored',
    description: 'Get a random activity to fill up your boredness!',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        await fetch('https://www.boredapi.com/api/activity/')
        .then(response => response.json())
        .then(async(r) => {
            const embed = new MessageEmbed()
            .setDescription(`${r.activity}`)
            .setFooter(`Type: ${r.type} | Participants: ${r.participants}`)
            .setColor(color)
            .setTimestamp()

            interaction.followUp({embeds: [embed]})
        })

    }
}