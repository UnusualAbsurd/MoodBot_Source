const { CommandInteraction, Client, MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch')
const axios = require('axios')

module.exports = {
    name: 'cat',
    description: 'Get a random cat image',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
 
        const res = await fetch('https://api.thecatapi.com/v1/images/search').then(response => response.json())

        

       
          
                const embed = new MessageEmbed()
                .setTitle('Meow! 🐶')
                .setURL(res[0].url)
                .setImage(res[0].url)
                .setColor(color)

                interaction.followUp({embeds: [embed]})
            
       
 
    }
}