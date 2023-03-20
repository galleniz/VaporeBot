
const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "echo",
            aliases:["say"],
            description: "talk as vaporeon. (its crazy)",
            section: "general",
            usage: ["say Hola soy Vaporeon!"],
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
   async run (message,client,args){

        if (args.length > 0){
            var msg = args.join(" ")
            if (msg.toLowerCase().includes("sabias") ||msg.toLowerCase().includes("sabías") || msg.includes("en") && (msg.includes("terminos") || msg.includes("términos"))){
        message.reply("Sí ya sabía. :rage:")   
        return;

            }
        message.channel.send(args.join(" "));
        message.delete();
        }
   }
}
module.exports = new SetAvatarCmd()