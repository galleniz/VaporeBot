const Client = require("../Client").MizClient
const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "ping",
 data: new SlashCommandBuilder()
 .setName("ping")
 .setDescription('Replies with Pong (and the ping of the bot) !')
 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  run: async (client, interaction) => {
    let date = interaction.createdTimestamp;
    var exampleEmbed = new EmbedBuilder()
    .setTitle('Obteniendo ping...')
    .setColor("#d99b9a")
    .setDescription("Wait me >-<")
    .setTimestamp()
    .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 2048 }) });

  	await interaction.reply({embeds: [exampleEmbed]}).then(eh=>{
        var exampleEmbed = new EmbedBuilder()
        .setTitle('Ping of VaporeonBot')
        .setColor("Random")
        .setDescription(" :pong: Pong!")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true, size: 2048 }) }).addFields(
          { name: 'Client latency ', value: `${new Date().getTime() - date}ms`, inline: true},
          { name: "Client to API latency", value: `${Math.round(client.ws.ping)}ms`, inline: true},
        )
  
     interaction.editReply({ embeds: [exampleEmbed]});

    })

  },
};