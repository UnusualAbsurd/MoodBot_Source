const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'whois',
    description: 'View the users information',
    options: [
        {
            name: 'user',
            type: "USER",
            description: 'The user that you want to view the information',
            required: false
        }
    ],
    category: 'info',
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {



        const user = interaction.options.getMember('user') || interaction.member;

        

        let displayRoles;

        const roles = user.roles.cache // getting the roles of the person
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        if (roles.length < 20) {
            displayRoles = roles.join(' ')
            if (roles.length < 1) displayRoles = "None" // if no roles say None

        } else {

            // if he have more then 20 just display 20 roles
            displayRoles = roles.slice(20).join(' ')
        }

        const embed = new MessageEmbed()
            .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addField(`User Tag`, `\`${user.user.tag}\``, true)
            .addField(`User ID`, `\`${user.id}\``, true)
            .addField(`Account Creation`, `${moment(user.user.createdAt).format(`DD/MM/YYYY [at] HH:MM`)} - ${moment(user.user.createdAt).fromNow().toString()}`)
            .addField(`Server Joined`, `${moment(user.user.joinedAt).format(`DD/MM/YYYY [at] HH:mm`)} - ${moment(user.joinedAt).fromNow().toString()}`)
            .addField(`Role [ ${roles.length} ]`, displayRoles)
            .setColor(color)
            .setTimestamp()

        interaction.followUp({ embeds: [embed] })



    }
}