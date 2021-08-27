const { Client, Collection, Intents, Message, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS],
});

const express = require('express')
const app = express()
const { Webhook, MessageBuilder } = require('discord-webhook-node')
const hook = new Webhook('')
const {AutoPoster} = require('topgg-autoposter')

module.exports = client;

const ap = AutoPoster('', client);

ap.on('posted', () => {
    console.log('Top.GG Posted Stats Secured.')
})

const Topgg = require('@top-gg/sdk')

const webhook = new Topgg.Webhook('Jaden06102007')

    app.post('/dblwebhook', webhook.listener(async(vote) => {
         hook.send(`<@${vote.user}> , **has voted for ${client.user.username}!**💗`)
    }))

    app.listen(4069, function() {
        console.log('Listening to port ' + 4069)
    })


const cfg = require('./config.json')

const mongoose = require('mongoose')
mongoose.connect(cfg.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(async() => {
    console.log(`Connected eto DATABASE`)
}).catch((err) => console.log(err));





// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Mod Logging
const db = require('./models/modlogs')
client.modlogs = async function({ member, action, Color, reason }, interaction) {
    const data = await db.findOne({guild: interaction.guild.id});
    if(!data) return;

    const channel = interaction.guild.channels.cache.get(data.hook);
    if(!channel) return;

    const logEmbed = new MessageEmbed()
    .setAuthor(`${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL({dynamic: true}))
    .setColor(Color)
    .addField(`\`Member 🚶‍♂️\``, `${member.user.tag} (\`${member.user.id}\`)`)
    .addField(`\`Action 📑\``, `${action}`)
    .addField(`\`Reason 📰\``, `${reason}`)
    .setTimestamp()

    channel.send({embeds: [logEmbed]})


}


// Initializing the project
require("./handler")(client);

client.login(client.config.token);
