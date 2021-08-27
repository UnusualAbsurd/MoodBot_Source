const { CommandInteraction, Client } = require('discord.js');
const db = require('../../models/log')

module.exports = {
    name: 'logs',
    description: 'Set the logs for server events',
    options: [
         {
             name: "channel",
             type: "CHANNEL",
             description: 'The channel that you want to set the event log as!',
             required: true,
         }
    ],
    category: 'config',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {
        const channel = interaction.options.getChannel('channel')

        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.followUp(`You need \`ADMINISTRATOR\` permission to run this interaction.`)

        if(!channel.isText()) return interaction.followUp(`The log channel must be a \`TEXT_CHANNEL\` only!`)

        if(channel.isText()) {

            const data = await db.findOne({guild: interaction.guild.id}) 
       

          channel.createWebhook('MoodBot-Logs', {
              avatar: client.user.displayAvatarURL()
          }).then(async(webhook) => {
             
               const w = webhook;

               if(!data) {

                const new_data = new db({
                    hook: `https://discord.com/api/webhooks/${w.id}/${w.token}`,
                    token: `${w.token}`,
                    id: `${w.id}`,
                    guild: interaction.guild.id
                }).save();
  
                interaction.followUp(`Sucessfully set the log channel as ${channel}`)
               
            } else {
                 await db.findOneAndUpdate({guild: interaction.guild.id}, { $set: { hook: `https://discord.com/api/webhooks/${w.id}/${w.token}`, token: `${w.token}`, id: `${w.id}`}})
                 interaction.followUp(`Sucessfully set the log channel as ${channel}`)

               }
          })

        }
    }
}