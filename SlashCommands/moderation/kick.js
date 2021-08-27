const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'kick',
    description: 'Kick a user from your server',
    options: [
        {
            name: 'user',
            description: 'The user that you want to kick from the server',
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason why you want to kick that user",
            type: "STRING",
            required: false
        }
    ],
    category: 'moderation',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color, perm) => {
        const user = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || "No Reason Provided";

        if (!interaction.member.permissions.has("KICK_MEMBERS")) return perm('KICK_MEMBERS')
        if (interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.followUp(`You cannot kick users with higher roles than you!`)

        client.modlogs(
            {
                member: user,
                action: 'Kick',
                Color: '#32353b',
                reason: reason,
            },
            interaction
        )

        const embed = new MessageEmbed()
        .setDescription(`You have been kicked from ${interaction.guild.name}`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Reason: ${reason}`, interaction.guild.iconURL({dynamic: true}))
        
        if(!user.user.bot) {
            user.send({embeds: [embed]})
        }
        interaction.followUp(`Successfully kicked \`${user.user.tag}\`.`)
       
        user.kick({reason: `${reason}`})

    }
}