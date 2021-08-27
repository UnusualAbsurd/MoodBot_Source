const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'gender',
    description: 'Guess a someones gender by their name!',
    options: [
        {
            name: 'name',
            description: 'The name that you want to make the bot guess',
            type: "STRING",
            required: true
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        const name = interaction.options.getString('name')

        await fetch(`https://api.genderize.io/?name=${name}`)
        .then(response => response.json())
        .then(async(r) => {
            const embed = new MessageEmbed()
            .setDescription(`Based of the name \`${name}\` , I guess your gender is \`${r.gender}\`!`)
            .setColor(color)
            .setTimestamp()

            const send = await interaction.followUp({embeds: [embed]})
            send.react('✅')
            send.react('❌')
        }) 

    }
}