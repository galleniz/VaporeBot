const Discord = require("discord.js");
const {Message, EmbedBuilder, AttachmentBuilder} =require("discord.js");
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
      
        super({
            name: "recentlogs",
            aliases:[],
            description: "evals a javascript",
            section: "help",
            usage: ["evals code"],
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
    const fs = require("fs")
    
    fs.writeFile('logs_w.txt', client.logger.logs.join("\n"), (err) => {
        if (err) throw err;
        const archivo = new AttachmentBuilder('logs_w.txt');
        message.author.send({files: [archivo]});
      });

    }
}
module.exports = new SetAvatarCmd()