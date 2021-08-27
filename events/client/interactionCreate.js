const client = require("../../index");
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const { MessageEmbed } = require("discord.js");
const hook = new Webhook('https://discord.com/api/webhooks/879881612869902377/2Jx1Ums3D9jkiE7ju0XBS2TSs2aAFjA2Bp18uPpholvuOF6Gj-XGdbu2D34itK3xm7H1')

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({}).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        const color = '#32353b'

        function perm(str) {
            interaction.followUp({content: `You need \`${str}\` to use this interaction.`})
        }

        module.exports = { perm }

        try{
           cmd.run(client, interaction, args, color, perm);
        }        
        catch(error) {
            var web = 'https://discord.com/api/webhooks/880007973294981121/UhvABiGGAexjET5nBwe9TS5lP7RdnSQFycCA1mscXJlGqtiqGdvF3BhhiWMs0ItXpfFk';
            const logs = new Webhook(web);

            const embed = new MessageEmbed()
            .setTitle(`Error Report`)
            .setDescription(`\`\`\`${err.stack}\`\`\``)
            .setTimestamp()
            .setColor('RED')
            .setThumbnail(client.user.displayAvatarURL())

            logs.send(embed);
        } 
        
		hook.send(`**${interaction.user.tag}** ran a command! (\`${interaction.guild.id}\`)`)
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

});
