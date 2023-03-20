
const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "vaporeon",
            aliases:["vp"],
            description: "A random post of r/Vaporeon",
            section: "general",
            usage: ["vaporeon"],
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
   const post=  await client.reddit.getRandomPost("vaporeon",50,true)

   const embed = new EmbedBuilder()
   .setAuthor({name: post.author.name, iconURL: (post.author.icon)})
   .setTitle(`<:vaporeon:1086841280342007829> Vaporeon!`)
   .setDescription(`From [r/${post.subreddit.name}](${post.subreddit.link})\n**${post.title}**\n${post.text}\n\n`)
   .setImage(post.image)
message.reply({embeds: [embed]});
   }
}
module.exports = new SetAvatarCmd()