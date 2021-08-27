const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    description: 'Get a random meme from reddit',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        await fetch('http://meme-api.herokuapp.com/gimme/memes')
        .then(response => response.json())
        .then(async(r) => {
            const embed = new MessageEmbed()
            .setImage(`${r.url}`)
            .setTitle(`${r.title}`)
            .setURL(`${r.postLink}`)
            .setColor(color)
            .setFooter(`👍 ${r.ups} | Author: ${r.author}`)

            const send = await interaction.followUp({embeds: [embed]})
            send.react('👍')
            send.react('👎')
            send.react('🤮')
        }) 

    }
}