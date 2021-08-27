const client = require("../../index");
const { MessageEmbed, WebhookClient } = require('discord.js')
const db = require('../../models/log');
const moment = require('moment')

client.on('guildMemberRemove', async(member) => {
    const data = await db.findOne({guild: member.guild.id})
   
    if(!data) return;
    if(data) {
    
        const hook = new WebhookClient({id: `${data.id}`, token: `${data.token}`})
        if(!hook) return;
        const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag} Left The Server`, member.user.displayAvatarURL({dynamic: true}))
        .setColor("RED")
        .addField(`User ID`, member.id)
        .addField(`Joined At`, `${moment(member.joinedAt).format('DD-MM-YYYY [at] HH:mm')}`)
        .setTimestamp()

        hook.send({embeds: [embed]})
    }
})