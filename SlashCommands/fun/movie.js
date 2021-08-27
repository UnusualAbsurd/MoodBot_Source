const { CommandInteraction, Client, MessageEmbed, Message } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'movie',
    description: 'Get a random movie to watch!',
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        
        const random = Math.floor(Math.random() * 1000);

        const res = await fetch(`https://api.themoviedb.org/3/movie/${random}?api_key=25bd8b64ebd70b791b9696535f5bb27f`).then(response => response.json());
  
        if(res.original_title === undefined) {
            return interaction.followUp('Failed to find movie!')
        } else {
            const embed = new MessageEmbed()
        .setImage(`https://image.tmdb.org/t/p/w500${res.poster_path}`)
        .setDescription(`Overview: \n\`\`\`${res.overview || "No Overview Provided"}\`\`\``)
        .setColor(color)
        .setTitle(`${res.original_title}`)
        .addField(`Release Date`, `${res.release_date}`)
        .setFooter(`Tagline: ${res.tagline} | ⭐ ${res.vote_average} | Total Votes: ${res.vote_count}`)

        interaction.followUp({embeds: [embed]})
        }
        


        
    }
}