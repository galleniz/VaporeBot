const Client = require("../Client").MizClient

const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "search",
 data: new SlashCommandBuilder()
 .setName("search")
 .setDescription('Search in google.')
 .addStringOption((option) =>
						option
							.setName('query')
							.setDescription('What is your "query" of today?')
						
							.setRequired(true),
					)
 
 
 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  run: async (client, interaction) => {
    const msg = interaction.options.getString('query');

          client.google.searchGoogle(msg)
          .then(results => {
            console.log(results);
            let res = []
            for (const result of results){
                res.push({name: "[" + result.title + "]" + "(" + result.link + ")", link: result.link, value: result.snippet })
            }
            const embed = new EmbedBuilder().setAuthor({name: "Google search", iconURL: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"})
            .setDescription("Powered by Google")
            .setFields(res);
            interaction.reply({embeds: [embed]})
          })
  },
};