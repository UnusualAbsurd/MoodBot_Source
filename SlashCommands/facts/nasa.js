const { CommandInteraction, Client, MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'nasa',
    description: 'Get a random pics from NASA space programs! Pictures generate every 24 hours!',
    category: 'fact',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {

        const uri = 'https://api.nasa.gov/planetary/apod?api_key=G1qb5WR8yuSBBcSykQqJFBt7R38KQ9uMKhPruzHP';
        await fetch(uri).then(response => response.json()).then(result => {
            const embed = new MessageEmbed()
            .setTitle(`${result.title}`)
            .setColor(color)
            .setImage(result.url)
            .setDescription(`\`\`\`${result.explanation}\`\`\``) 
            .setFooter(`Copyright : ${result.copyright} | Date: ${result.date}`)

            interaction.followUp({embeds: [embed]})
        })
        
    }
}