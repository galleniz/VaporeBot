const Discord = require("discord.js");
const {Message, EmbedBuilder, PermissionFlagsBits, PermissionOverwriteManager, PermissionsBitField} = require("discord.js");
const {MizClient} = require("./Client")
require("dotenv").config();


class Command {
    /**
     * A simple command basic class.
     * 
     * @param {Object} options 
     */
    constructor(options){
        
        if (!options) throw "This command not have a options type."
        this.name = options.name
        this.aliases = options.aliases
        this.description = options.description
        this.section = options.section

        this.reqNsfw = options.nsfw;
        this.reqNiz = options.niz
        this.perms = options.perms || [PermissionsBitField.Flags.SendMessages] ;
        this.usage = options.usage || [this.name + " [args]"];
        /**
         * @type {MizClient}
         */
        this.client;
    }
    /**
     * Finds a permission with a BigInt
     * 
     * @param {PermissionFlagsBits} perm
     */
    searchPerm(perm){
        for (const permName in PermissionsBitField.Flags) {
            if (PermissionsBitField.Flags[permName] === perm) {
                return (permName);
            }
            }
    }
     /**
     *  This evits some errors.
     * 
     * @param {Message<true>} message
     * @param {MizClient} client
     */
    tryRun(message){
        let youDontHave = []
        let iDonthave = [];

      
        for (let perm of this.perms){
            if (!message.channel.permissionsFor(message.member).has(perm))     
                youDontHave.push(this.searchPerm(perm))
            
            if (!message.channel.permissionsFor(message.member.guild.members.me).has(perm))     
                iDonthave.push(this.searchPerm(perm))

        }
        if (youDontHave.length > 0 || iDonthave > 0)
            return this.error("Hey," + ( iDonthave.length > 0 ? ", I don't " : "") + (youDontHave.length > 0 ? "You don't" : "") + "have permissions to execute this command", ( iDonthave.length > 0 ? "I need: \n -" + iDonthave.join(" \n -")+ "\n" : "")  + ( youDontHave.length > 0 ? "You need: \n- " + youDontHave.join(", ") : "") , message.channel, this.client,message )
        if ((this.reqNiz && (message.author.id !== process.env.OWNERID && message.author.id !== "696491260071903233")))
            return this.error("You can't execute/run this command because you are not the owner of this bot.", "Check the command with -help -c " + this.name, message.channel, this.client,message)
        if (this.reqNsfw && !message.channel.nsfw)
            return this.error("You can't execute/run this command because the channel is not nsfw.", "Change the channel to execute this command or check the command with -help -c " + this.name, message.channel, this.client,message)
        
        this.run(message,this.client, message.content.split(" ").slice(1))
    }
    error(error, solution, channel, client, message){
        console.error(error);
    

        var exampleEmbed = new EmbedBuilder()
        .setTitle('Command **' +this.name + "** error")
        .setColor("#d99b9a")
        .setDescription("```diff\n- " + error+ "\n+ " + solution + "\n```")
        .setTimestamp()
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
    
        channel.send({ embeds: [exampleEmbed] })
    }

    /**
     *  run function.
     * 
     * @param {Message} message
     * @param {MizClient} client
     * @param {Array<String>} args
     * 
     */
    run(message,client,args){
        throw "No command run."
    }
}
/**
 * @type {Command}
 */
this.Command = Command 