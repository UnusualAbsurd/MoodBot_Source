const db = require('../../models/muted')
const client = require('../../index')

client.on('guildMemberAdd', async(member) => {
    const data = await db.findOne({guild: member.guild.id, user: member.id})
    if(!data) return;
    if(data) {
        member.roles.add(data.role);
    }
})