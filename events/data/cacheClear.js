const client = require('../../index') 
const event = require('../../models/log')
const modlogs = require('../../models/modlogs')
const muted = require('../../models/muted')
const muterole = require('../../models/muterole')

client.on('guildDelete', async(guild) => {
    await event.findOneAndRemove({guild: guild.id})
    await modlogs.findOneAndRemove({guild: guild.id})
    await muted.findOneAndRemove({guild: guild.id})
    await muterole.findOneAndRemove({guild: guild.id})
})