const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'stats',
    description: 'View the bots statistics',
    category: 'info',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        const embed = new MessageEmbed()
        .addField(`Servers`, `${client.guilds.cache.size || "0"}`, true)
        .addField(`Users`, `${client.users.cache.size || '0'}`, true)
        .addField(`Commands`, `${client.slashCommands.size || "0"}`)
        .addField(`Uptime`, `${ms(client.uptime, {long: true})}`)
        .setColor(color)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())

        interaction.followUp({embeds: [embed], ephemeral: true});
 
        


    }
}