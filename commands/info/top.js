const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'top',
    description: '',
    usage: '',
    category: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if(message.author.id !== '746721583804055634') return;

        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(15);

        const description = guilds
        .map((guild, index) => {
            return `\`\`\`${index + 1} ${guild.name} - ${guild.memberCount} Members\`\`\``
        })
        .join('\n')

        const embed =  new MessageEmbed()
        .setTitle(`${client.user.username} Top Servers`)
        .setDescription(description)
        .setTimestamp()
        .setColor("GREEN")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))

        message.channel.send(
           {embeds: [embed]}
        )

        const description1 = guilds
        .map((guild, index) => {
            return `\`\`\`${index + 1} ${guild.id} - ${guild.memberCount} Members\`\`\``
        })
        .join('\n')

        const embd =  new MessageEmbed()
        .setTitle(`${client.user.username} Top Servers`)
        .setDescription(description1)
        .setTimestamp()
        .setColor("GREEN")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))

        message.channel.send({embeds: [embd]})

    }
}