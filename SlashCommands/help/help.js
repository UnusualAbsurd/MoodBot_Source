const { CommandInteraction, Client, MessageEmbed, Message } = require('discord.js');
const { pagination}  = require('reconlx')


module.exports = {
    name: 'help',
    description: 'View the commands for the bot!',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    * @param {Message} message
    */
    run: async (client, interaction, args, color) => {
        
        interaction.followUp('Here is the Help Panel , using `pagination` from the reconlx package.')
 
        const fun = new MessageEmbed()
        .setTitle('Fun Commands')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const config = new MessageEmbed()
        .setTitle(`Configuration Command`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const fact = new MessageEmbed()
        .setTitle(`Fact Commands`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const img = new MessageEmbed()
        .setTitle('Image Manipulation')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        
        const mod = new MessageEmbed()
        .setTitle('Moderation Manipulation')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const info = new MessageEmbed()
        .setTitle('Info Commands')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()
		
		 const music = new MessageEmbed()
        .setTitle('Music Commands')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const p = new MessageEmbed()
        .setTitle('NSFW Commands')
        .setThumbnail(client.user.displayAvatarURL())
        .setColor(color)
        .setTimestamp()

        const funarray = new Array();
        const infoarray = new Array();
        const image = new Array();
        const nsfw = new Array();
		const sound = new Array();
        const facts  = new Array();
        const cfg = new Array();
        const moderation = new Array();
        
        client.slashCommands.forEach(command => {
            switch(command.category) {
                case 'fun':
                    funarray.push(command)
                break
                case 'info':
                    infoarray.push(command)
                break
                case 'image':
                  image.push(command);
                break
                case 'nsfw':
                    nsfw.push(command);
                break
				case 'music':
                    sound.push(command);
                break
                case 'fact':
                    facts.push(command);
                break
                case 'config':
                    cfg.push(command);
                break
                case 'moderation':
                  moderation.push(command)
                break
            }
        })

        funarray.forEach(command => {
            fun.addField(`/${command.name}`, command.description)
        })

        moderation.forEach(command => {
            mod.addField(`/${command.name}`, command.description)
        })

        cfg.forEach(command => {
            config.addField(`/${command.name}`, command.description);
        })


        facts.forEach(command => {
            fact.addField(`/${command.name}`, command.description)
        })
		
		sound.forEach(command => {
            music.addField(`/${command.name}`, command.description)
        })

        infoarray.forEach(command => {
            info.addField(`/${command.name}`, command.description)
        })

        image.forEach(command => {
            img.addField(`/${command.name}`, command.description)
        })

        nsfw.forEach(command => {
            p.addField(`/${command.name}`, command.description)
        })

        const main = new MessageEmbed()
        .setColor(color)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle('MoodBot Slash Commands')
        .setDescription(`Total Commands : ${client.slashCommands.size}`)

        const embeds = [main, config, fun, img, mod, music, fact, info, p];

        pagination({
            embeds: embeds,
            channel: interaction.channel,
            author: interaction.user,
            fastSkip: true,
            pageTravel: true,
            button: [
                {
                    name: 'first',
                    emoji: '🏠',
                    style: 'SUCCESS'
                },
                {
                    name: 'last',
                    emoji: '⛪',
                    style: 'SUCCESS'
                }, 
                {
                    name: 'next',
                    emoji: '👉',
                    style: 'PRIMARY',
                },
                {
                    name: 'previous',
                    emoji: '👈',
                    style: 'PRIMARY'
                },
                {
                    name: 'number',
                    emoji: '✍',
                    style: 'SECONDARY'
                }
            ]
        })



    }
}