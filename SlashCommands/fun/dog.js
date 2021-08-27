const { CommandInteraction, Client, MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch')
const axios = require('axios')

module.exports = {
    name: 'dog',
    description: 'Get a random dog image',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
 
        const res = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.json())
 
        
       
          
                const embed = new MessageEmbed()
                .setTitle('Woof! 🐶')
                .setURL(res.message)
                .setImage(res.message)
                .setColor(color)

                interaction.followUp({embeds: [embed]})
            
       
 
    }
}