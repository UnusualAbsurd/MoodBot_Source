const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Get the current weather of a place!',
    options: [
        {
            name: 'place',
            description: 'The place that you want to view the weather in!',
            type: 'STRING',
            required: true,
        }
    ],
    category: 'fun',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
 
        const query = interaction.options.getString('place')


        weather.find({search: query, degreeType: 'F'}, function (error, result){
            // 'C' can be changed to 'F' for farneheit results
            if(error) return interaction.followUp(error);
           
    
            if(result === undefined || result.length === 0) interaction.followUp('**Invalid** location');
    
            var current = result[0].current;
            var location = result[0].location;
    
            const weatherinfo = new MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(color)
            .addField('Timezone โฐ', `UTC${location.timezone}`, true)
            .addField('Degree Type ๐', 'Celsius', true)
            .addField('Temperature ๐งช', `${current.temperature}ยฐ`, true)
            .addField('Wind ๐จ', current.winddisplay, true)
            .addField('Feels like ๐โโ๏ธ', `${current.feelslike}ยฐ`, true)
            .addField('Humidity ๐', `${current.humidity}%`, true)
    
    
            interaction.followUp({embeds: [weatherinfo]})
            })    
    }
}