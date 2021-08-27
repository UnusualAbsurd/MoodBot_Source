const { CommandInteraction, Client } = require('discord.js');
module.exports = {
    name: 'test',
    description: 'dadaa',
    options: [
        {
            name: 'user',
            description: "HAHAHHA",
            type: "USER",
            required: false,
        },
        {
            name: 'reason',
            description: 'HAHHAHHAAHHAAHHAHA',
            type: "STRING",
            required: false
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {

        if(!interaction.user.id !== '746721583804055634') return interaction.followUp(`This is developer only test command which he uses for beta commands! 👀`)

        const member = interaction.options.getMember('user');
        const query = interaction.options.getString('reason') || "ada"

        client.modlogs(
            {
                member: member,
                action: 'testing',
                Color: '#32353b',
                reason: query,
            },
            interaction
        )
    }
}