const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'wanted',
    description: 'View the wanted list that was made by the FBI',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {

        const rando = Math.floor(Math.random() * 10)

        await fetch('https://api.fbi.gov/wanted/v1/list')
        .then(response => response.json())
        .then(async(r) => {
            const embed = new MessageEmbed()
            .setTitle(`${r.items[rando].title}`)
            .setURL(`${r.items[rando].files[0].url}`)
            .setDescription(`Reward : \n\`\`\`${r.items[0].reward_text}\`\`\``)
            .setTimestamp()
            .setColor(color)

            interaction.followUp({embeds: [embed]})
        })
    }
}