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
            name: "eval",
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
    if (message.content.toLowerCase().includes("token")){
        return message.channel.send("What are you trying to _do_?... >-<");
    }
    
    const input =( (message.content.replaceAll("```javascript","").replaceAll("```","")).split(" ").slice(1)).join(" ")
    console.log(input)
    var output = "Error";
    let _a = ""

    // Redirect console output to the stream
    const originalConsolel = console.log;
    const originalConsolee = console.error;
    const originalConsolei = console.info;
    let silent = input.includes("--silent");
    input.replaceAll("--silent")
    let error = ""
   
    console.info = console.error =  console.log = (...args) => {
        _a += args + "\n";
    };
    try {
        // Evaluate the input
        eval(input);
    } catch (e) {
        error = e;
        console.log = originalConsolel;
        console.error = originalConsolee;
        console.info = originalConsolei;
        console.log(e);
    } finally {
        // Restore the original console.log
        output = _a;

        console.log = originalConsolel;
        console.error = originalConsolee;
        console.info = originalConsolei;
    }
    if (error !== "")
    output = error;

    if (output === "")
    output = "Nothing in the output."
    var exampleEmbed = new EmbedBuilder()
    .setTitle(client.user.username)
    .setColor("d99b9a")
    .setFields([
        {name: "input", value: "```javascript\n" + input + "\n```"},
        {name: "output", value: "```" + output + "```"},
    ])
    .setTimestamp()
    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
    message.channel.send({ embeds: [exampleEmbed] });

          
    }
}
module.exports = new SetAvatarCmd()