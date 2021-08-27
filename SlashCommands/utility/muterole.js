const { CommandInteraction, Client } = require('discord.js');
const db = require('../../models/muterole')

module.exports = {
    name: 'muterole',
    description: 'Set the servers mute role',
    options: [
        {
            name: 'role',
            description: 'The mute role that you want to set',
            type: "ROLE",
            required: true,
        }
    ],
    category: 'config',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color, perm) => {

        const role = interaction.options.getRole('role')
        
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return perm("ADMINISTRATOR");
 
        if(interaction.guild.me.roles.highest.position <= role.position) return interaction.followUp(`My role needs to be higher than the mute role.`);

        const data = await db.findOne({guild: interaction.guild.id}, async(err, data) => {
            if(data) data.delete();
            new db({
                role: role.id,
                guild: interaction.guild.id
            }).save();
            interaction.followUp(`Successfully set the mute role for the server as \`@${role.name}\``)
        })


         
    }
}