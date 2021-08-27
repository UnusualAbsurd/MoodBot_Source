const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'gen',
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

        if(!args.length) return message.reply('Specify an ID')
        const guild = client.guilds.cache.get(args[0]);


        const channel = await guild.channels.cache.filter(ch => ch.isText()).random().createInvite();
        message.reply(`discord.gg/${channel.code}`)
      

    }
}