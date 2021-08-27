const client = require("../../index");
const db = require('../../models/log');
const moment = require('moment');
const { MessageEmbed, WebhookClient } = require("discord.js");


client.on('guildBanAdd', async(ban) => {
    const data = await db.findOne({guild: ban.guild.id})
    const hook = new WebhookClient({id: `${data.id}`, token: `${data.token}`})
    if(!hook) return;
    if(!data) return;
    if(data) {
        
        await ban.fetch()
        const embed = new MessageEmbed()
        .setAuthor(`${ban.user.tag} Is Banned From The Server`, ban.user.displayAvatarURL({dynamic: true}))
        .addField(`Reason 📑`, `${ban.reason.toString() || "No Reason Provided"}`)
        .setColor("RED")
        .setTimestamp()
        
        hook.send({embeds: [embed]});
        

    }
})