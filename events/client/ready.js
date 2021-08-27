const client = require("../../index");

client.on("ready", () => {
    console.log(`${client.user.tag} is up and ready to go!`)
  
    client.user.setActivity(`/help | ${client.guilds.cache.size} Servers`, {type: 'WATCHING'})

    setInterval(() => {
        client.user.setActivity(`/help | ${client.guilds.cache.size} Servers`, {type: 'WATCHING'})
    }, 30 * 1000);

});
