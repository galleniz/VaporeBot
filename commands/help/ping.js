const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class PingCmd extends require("../../Command").Command
{
    constructor()
    {
        super({
            name: "ping",
            aliases:["latency"],
            description: "The cur latency of me.",
            section: "help",
            usage: ["ping"],
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
        .setTitle('pinging...')
        .setColor("Random")
        .setDescription("Wait me >.<")
        .setTimestamp()
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
    
        message.channel.send({ embeds: [exampleEmbed] }).then(sentMessage => {
          exampleEmbed
          .setTitle('Ping del bot')
          .setColor("Random")
          .setDescription(" :pong: Pong!")
          .setTimestamp()
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
          .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) }).addFields(
            { name: 'Client latency ', value: `${sentMessage.createdTimestamp - message.createdTimestamp}ms`, inline: true},
            { name: "Client to API latency", value: `${Math.round(client.ws.ping)}ms`, inline: true},
          )
    
          sentMessage.edit({ embeds: [exampleEmbed
          ] });
        });
    }
}
module.exports = new PingCmd()