const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const muterole = require('../../models/muterole')
const db = require('../../models/muted')
const ms = require('ms')


module.exports = {
    name: 'mute',
    description: 'Mute a user in your server',
    options: [
        {
            name: 'user',
            description: 'The user that you want to mute',
            type: "USER",
            required: true,
        },
        {
            name: 'time',
            description: 'How long you want to mute this user',
            type: "STRING",
            required: false,
        },
        {
            name: 'reason',
            description: "The reason why you want to mute this user",
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



        const user = interaction.options.getMember('user');
        const time = interaction.options.getString('time') || "6h";
        const reason = interaction.options.getString('reason') || "No Reason Provided"

        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return perm("MANAGE_MESSAGES");

        const data = await muterole.findOne({ guild: interaction.guild.id })
        if (!data) return interaction.followUp(`This server did not setup the mute role yet!`);
        const role = interaction.guild.roles.cache.get(data.role);
        if (!role) return interaction.followUp(`This server did not setup the mute role yet!`)

        

        const dmEmbed = new MessageEmbed()
            .setDescription(`You have been muted in ${interaction.guild.name} for \`${time}\``)
            .setColor("RED")
            .setTimestamp()
            .setFooter(`Reason: ${reason}`, interaction.guild.iconURL({ dynamic: true }))


        if (data && role) {

             const filter = await db.findOne({guild: interaction.guild.id, user: user.id})
             if(filter) return interaction.followUp(`That user is already in the muted database!`);

            user.roles.add(role)
            interaction.followUp(`Successfully muted \`${user.user.tag}\` for \`${time}\`.`)
            if(!user.user.bot) {
                user.send({embeds: [dmEmbed]})
            }

            client.modlogs(
                {
                    member: user,
                    action: 'Mute',
                    Color: '#32353b',
                    reason: reason,
                },
                interaction
            )
            /*
             role: String,
    user: String,
    guild: String, */
            new db({
                role: role.id,
                user: user.id,
                guild: interaction.guild.id,
            }).save();

            setTimeout(async () => {


                const removed = new MessageEmbed()
                    .setDescription(`You have been unmuted in ${interaction.guild.name}`)
                    .setFooter(`Reason: Auto Unmute After Time Expired`, interaction.guild.iconURL({ dynamic: true }))
                    .setTimestamp()
                    .setColor("GREEN")

                user.roles.remove(role);
                if(!user.user.bot) {
                    user.send({embeds: [removed]})
                }

                const d = await db.findOne({ guild: interaction.guild.id, user: user.id, role: role.id })
                if (!d) return;
                if (d) d.delete();

                client.modlogs(
                    {
                        member: user,
                        action: 'Unmute',
                        Color: '#32353b',
                        reason: 'Auto Unmute After Time Expire',
                    },
                    interaction
                )

            }, ms(time))

        }


    }
}