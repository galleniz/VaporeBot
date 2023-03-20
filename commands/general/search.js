const Discord = require("discord.js");
require("dotenv").config()
const MizClient = require("../../Client").MizClient
const {Message, EmbedBuilder, ActionRowBuilder,ButtonBuilder, ButtonStyle} =Discord;


class PingCmd extends require("../../Command").Command
{
    constructor()
    {
        super({
            name: "search",
            aliases:[],
            description: "Search in google ***WARNING: THIS IS LIMITED FOR A PETITIONS, IF DOESN'T WORK REPORT TO THE SUPPORT SERVER PLEASE***",
            section: "internet",
            usage: ["google MrNiz is cool?", "google What is PI?"],
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

        client.google.searchGoogle(message.content.split(" ").slice(1).join(" "))
          .then(results => {
            console.log(results);
            let res = []
            for (const result of results){
                res.push({name: "[" + result.title + "]" + "(" + result.link + ")", link: result.link, value: result.snippet })
            }
            const embed = new EmbedBuilder().setAuthor({name: "Google search", iconURL: "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"})
            .setDescription("Powered by Google")
            .setFields(res);
            message.reply({embeds: [embed]})
          })
    }
}
module.exports = new PingCmd()