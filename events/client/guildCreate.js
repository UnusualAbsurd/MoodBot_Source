const client = require('../../index')
const { MessageEmbed, Message } = require('discord.js')
const { Webhook, MessageBuilder } = require('discord-webhook-node')
const hook = new Webhook('https://discord.com/api/webhooks/879904545130553365/u_wSLGI1oOc4PegYUnGw53j5Ct7HRBYLW3ExYA0l2cpNiERN_cnkNn1JzFuO2FGyNE1c');


client.on('guildCreate', async(guild) => {
 
    const embed = new MessageBuilder()
    .addField(`Guild`, `${guild.name}`, true)
    .addField(`Member Count`, `${guild.memberCount}`, true)
    .addField(`ID`, `${guild.id}`)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setTimestamp()
    .setColor('#32353b')

    hook.send(embed);

})