const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'joke',
    description: 'Make the bot to send a joke in the channel!',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {

        let uri = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist';

        await fetch(uri).then(response => response.json()).then(result => {
    
            if(result.type === 'twopart') {
                const embed = new MessageEmbed()
            .setTitle(`${result.setup}`)
            .setDescription(`${result.delivery}`)
            .setFooter(`Category: ${result.category}`)
            .setColor(color)

            interaction.followUp({embeds: [embed]})
               
            }
            if(result.type === 'single') {
                const embed = new MessageEmbed()
                .setTitle(`${result.joke}`)
                .setColor(color)
                .setFooter(`Category: ${result.category}`)

                interaction.followUp({embeds: [embed]})
            }
        })
    
    }
}