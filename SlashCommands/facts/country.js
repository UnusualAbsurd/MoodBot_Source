const { MessageEmbed, CommandInteraction } = require("discord.js");
const pop = require("popcat-wrapper");

module.exports = {
    name: "country",
    description: "Get info on a country!",
    options: [
        {
            name: 'country',
            type: 'STRING',
            description: 'The country you want to search',
            required: true
        }
    ],
    category: 'fact',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args, color) => {
        const text = interaction.options.getString('country');
        console.log(text);

        try {
            const c = await pop.country(text)
            console.log(c);
            const embed = new MessageEmbed()
                .setTitle(c.name)
                .setColor(color)
                .setThumbnail(c.flag)
                .addField("Name", c.name, true)
                .addField("Capital", c.capital, true)
                .addField("Domain", c.domain, true)
                .addField("Region", c.region, true)
                .addField("Population", c.population, true)
                .addField("Area", c.area, true)
                .addField("Currency", `${c.currency.name} (${c.currency.short})\nSymbol: ${c.currency.symbol}`)
            interaction.followUp({ embeds: [embed] })

        } catch (error) {
            console.log(error)
            return interaction.followUp({ content: "Couldn't find that country information." })
        }
    }
}