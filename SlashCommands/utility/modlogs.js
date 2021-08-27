const { CommandInteraction, Client } = require('discord.js');
const db = require('../../models/modlogs')

module.exports = {
    name: 'modlogs',
    description: 'Set the server moderation loggins for the bot',
    options: [
        {
          name: "channel",
          description: "The channel that you want to set the mod logs as",
          type: "CHANNEL",
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

        if(!channel.isText()) return interaction.followUp(`The modlogs channel must be a \`TEXT_CHANNEL\` only!`)

        if(channel.isText()) {
            await db.findOne({ guild: interaction.guild.id }, async(err, data) => {
                if(data) data.delete();
                new db({
                    guild: interaction.guild.id,
                    hook: channel.id,
                }).save();
                interaction.followUp(`Successfully set the mod-logs channel as ${channel}`)

            })
        }

        
     

             
    }
}