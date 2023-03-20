const Discord = require("discord.js");
          
const MizClient = require("../../Client").MizClient
require("dotenv").config();
const {Message, EmbedBuilder, ActionRowBuilder,ButtonBuilder, ButtonStyle} =Discord;


class PingCmd extends require("../../Command").Command
{
    constructor()
    {
    
        super({
            name: "aboutme",
            aliases:[],
            description: "A simple command describe me!",
            section: "help",
            usage: ["aboutme"],
            nsfw: false,
            niz: false,
        })
        
    }
    /**
     *  run function.
     * 
     * @param {Message<true>} message
     * @param {MizClient} client
     * 
     */
    run (message,client){
        var exampleEmbed = new EmbedBuilder()
        .setTitle('ping...')
        .setColor("#d99b9a")
        .setDescription("Wait me >.<")
        .setTimestamp()
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
    
        message.channel.send({ embeds: [exampleEmbed] }).then(sentMessage => {
          var exampleEmbed = new EmbedBuilder()
          .setTitle('About ' + client.user.username)
          .setColor("Random")
          .setDescription("Hello, I'm Vaporeon my prefix is ​​`"+ client.prefix + "`, a bot developed by MrNiz.")
          .setTimestamp()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) }).addFields(
            { name: 'Client latency ', value: `${sentMessage.createdTimestamp - message.createdTimestamp}ms`, inline: true},
            { name: "Client to API latency", value: `${Math.round(client.ws.ping)}ms`, inline: true},
            { name: "Prefix", value: `\`${client.prefix}\``, inline: true}
          )
          const pinchiayudatengosida = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel('Invite Me')
              .setStyle(ButtonStyle.Link)
              .setURL(`https://discord.com/api/oauth2/authorize?client_id=1086783818704371752&permissions=2734418689088&scope=applications.commands%20bot`),
              new ButtonBuilder()
              .setLabel('Support Server')
              .setStyle(ButtonStyle.Link)
              
              .setURL(`https://discord.gg/bs4VaGU2JU`),
          );
          sentMessage.edit({ embeds: [exampleEmbed] , components: [pinchiayudatengosida]});
        });
    }
}
module.exports = new PingCmd()