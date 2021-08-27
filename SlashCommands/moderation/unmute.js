const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const db = require('../../models/muted')

module.exports = {
    name: 'unmute',
    description: 'Unmute a user',
    options: [
        {
            name: 'user',
            description: "The user that you want to unmute",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "The reason why you want to unmute this user",
            type: "STRING",
            required: false,
        }
    ],
    category: 'moderation',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color, perm) => {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return perm("MANAGE_MESSAGES");

        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || "No Reason Provided";

        const data = await db.findOne({ guild: interaction.guild.id, user: user.id }, async (err, data) => {
            if (!data) return interaction.followUp(`That user is not in the servers muted database`)
            if (data) {
                const role = interaction.guild.roles.cache.get(data.role);
                if (!role) return interaction.followUp(`Error: Couldnt find mute role`)
                user.roles.remove(role);
                if (!user.user.bot) {
                    const embed = new MessageEmbed()
                        .setDescription(`You have been unmuted in ${interaction.guild.name}`)
                        .setFooter(`Reason: ${reason}`, interaction.guild.iconURL({ dynamic: true }))
                        .setTimestamp()
                        .setColor("GREEN")

                    user.send({ embeds: [embed] })
                }
                data.delete();
                client.modlogs(
                    {
                        member: user,
                        action: 'Unmute',
                        Color: '#32353b',
                        reason: reason,
                    },
                    interaction
                )
                interaction.followUp(`Successfully unmuted \`${user.user.tag}\``)

            }
        })

    }
}