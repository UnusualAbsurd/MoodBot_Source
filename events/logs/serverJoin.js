const client = require("../../index");
const { MessageEmbed, WebhookClient } = require('discord.js')
const db = require('../../models/log');
const moment = require('moment')

client.on('guildMemberAdd', async(member) => {
    const data = await db.findOne({guild: member.guild.id})
   
    if(!data) return;
    if(data) {
    
        const hook = new WebhookClient({id: `${data.id}`, token: `${data.token}`})
       
        const embed = new MessageEmbed()
        .setAuthor(`${member.user.tag} Joined The Server`, member.user.displayAvatarURL({dynamic: true}))
        .setColor("GREEN")
        .addField(`User ID`, member.id)
        .addField(`Joined At`, `${moment(member.joinedAt).format('DD-MM-YYYY [at] HH:mm')}`)
        .setTimestamp()

        hook.send({embeds: [embed]})
    }
})