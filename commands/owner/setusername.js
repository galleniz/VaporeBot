const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "setusername",
            aliases:["su"],
            description: "sets bot username",
            section: "help",
            usage: ["su Bali"],
            nsfw: false,
            niz: true,
        })
        
    }
    /**
     *  run function.
     * 
     * @param {Message<true>} message
     * @param {MizClient} client
     * 
     */
   async run (message,client){
    let username = message.content.split(" ").slice(1).join(" ");
    if (!username || username === "") username = "Bali";
        await client.user.setUsername(username);
        message.author.send("Hello!")
        var exampleEmbed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setColor("d99b9a")
        .setDescription("Name changed!\n***" + username + "***")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
        message.channel.send({ embeds: [exampleEmbed] });
   
          
    }
}
module.exports = new SetAvatarCmd()