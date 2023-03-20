
const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();
const cleverBot = require("cleverbot-free")

class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "chat",
            aliases:["c"],
            description: "Talk with vaporeon. (using cleverbot-free)",
            section: "general",
            usage: ["chat ¡Hola Vaporeon!"],
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
        // if (msg.toLowerCase().includes("sabias") ||msg.toLowerCase().includes("sabías") || msg.includes("en") && (msg.includes("terminos") || msg.includes("términos"))){
    if ((msg.toLowerCase().includes("sabias") ||msg.toLowerCase().includes("sabías") || msg.includes("en") && (msg.includes("terminos") || msg.includes("términos"))) || (msg.toLowerCase().includes("did you know") || msg.includes("in") && msg.includes("terms") )){

        message.reply("Yes i know. :rage:")   
        return;

        }
    message.react("🤖")
    cleverBot(args.join(" ")).then(a=>{
        message.reply(a);
    }).catch(e=>{
        message.reply("Hubo un error consultando en la API, prueba de nuevo más tarde (o ahorita no hay problema).")
    })
   }
}
}
module.exports = new SetAvatarCmd()