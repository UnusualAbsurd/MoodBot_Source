const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'Ban a user from your server',
    options: [
        {
            name: 'user',
            description: 'The user that you want to ban from the server',
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason why you want to ban that user",
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

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return perm('BAN_MEMBERS')
        if (interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.followUp(`You cannot ban users with higher roles than you!`)

        client.modlogs(
            {
                member: user,
                action: 'Ban',
                Color: '#32353b',
                reason: reason,
            },
            interaction
        )

        const embed = new MessageEmbed()
        .setDescription(`You have been banned from ${interaction.guild.name}`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(`Reason: ${reason}`, interaction.guild.iconURL({dynamic: true}))
        
        if(!user.user.bot) {
            user.send({embeds: [embed]})
        }
        interaction.followUp(`Successfully banned \`${user.user.tag}\`.`)
       
        user.ban({reason: `${reason}`})

    }
}