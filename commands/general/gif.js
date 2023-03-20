
const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "gif",
            aliases:[],
            description: "A random gif from tenor.",
            section: "general",
            usage: ["vaporeon"],
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
   async run (message,client,args){
   const post=  await client.google.randomGif("vaporeon")

   const embed = new EmbedBuilder()
   .setTitle(`<:vaporeon:1086841280342007829> Vaporeon!`)
   .setImage(post)
message.reply({embeds: [embed]});
   }
}
module.exports = new SetAvatarCmd()