const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'agify',
    description: 'Make the bot guess your age by your name!',
    options: [
        {
            name: 'name',
            description: 'Your name that you want the bot to guess',
            type: "STRING",
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
     
 
        const query = interaction.options.getString('name')

        await fetch(`https://api.agify.io/?name=${query}`)
        .then(response => response.json())
        .then(async(r) => {
           const embed = new MessageEmbed()
           .setDescription(`Based of your age , I guess you are \`${r.age}\` Years Old!`)
           .setColor(color)
           .setTimestamp()

           const send = await interaction.followUp({embeds: [embed]})
           send.react('✅')
           send.react('❌')
        })

    }
}