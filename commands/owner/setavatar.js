const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
        /**
         *       this.name = options.name
        this.aliases = options.aliases
        this.description = options.description
        this.section = options.section

        this.Discord = Discord
        this.reqNsfw = options.nsfw;
        this.reqNiz = options.niz
         */
        super({
            name: "setavatar",
            aliases:["sa"],
            description: "sets bot avatar",
            section: "help",
            evals: ["setavatar (put a image when send)"],
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
    // if ()
    let attachement = message.attachments.first();
    if (attachement)
        if (!attachement.contentType.startsWith("image"))
        return this.error("Can't set the avatar because it's a " + attachement.contentType.split("/")[0], "Use $help -c setavatar or/and verify you attachement is a image.", message.channel, client, message)
   try {
 
        await client.user.setAvatar(attachement.url);
        var exampleEmbed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setColor("d99b9a")
        .setDescription("Avatar cambiado!")
        .setTimestamp()
        .setImage(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
        message.channel.send({ embeds: [exampleEmbed] });
    } catch(e){
      this.error(e, "Use $help -c setavatar or/and verify you attachement is a image.", message.channel, client, message)
    }
          
    }
}
module.exports = new SetAvatarCmd()