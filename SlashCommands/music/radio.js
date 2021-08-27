const {
    createAudioResource,
    createAudioPlayer,
    joinVoiceChannel,
    AudioPlayerStatus,
} = require('@discordjs/voice');

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'radio',
    description: 'Play a radio music in your voice channel!',
    category: 'music',
    run: async (client, interaction, args, color) => {

        const radioEmbed = new MessageEmbed()
            .setAuthor("Started playing radio 📻", interaction.client.user.avatarURL({ dynamic: true }))
			.setColor(color)
			.setTimestamp()
        

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel)
            return interaction.followUp({ content: "Join a voice channel!" });

        const player = createAudioPlayer();

        let resource = createAudioResource('https://stream-mz.planetradio.co.uk/net2national.mp3');

        let connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        player.play(resource);
        connection.subscribe(player);
        interaction.followUp({ embeds: [radioEmbed] });
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy()
        });
    }
};