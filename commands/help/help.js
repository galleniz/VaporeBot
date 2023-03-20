const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class PingCmd extends require("../../Command").Command
{
    constructor()
    {
      
        super({
            name: "help",
            aliases:["h"],
            description: "Are you lost?, use me for any question for all commands.",
            section: "help",
            nsfw: false,
            usage: ["help -m module", "help -c command"],
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
    run (message,client,args){
        console.log(args)
        var defEmbed = new EmbedBuilder()
        .setTitle('Help Command')
        .setColor("#d99b9a")
        .setDescription("To see commands of section put $help -section (section) the commands for it, or put $help -all to see all commands")
        .setTimestamp()
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
        client.config.modules["help"]
        let modules = []
        for (let category of ["help","general"])
        {
            if (!client.config.modules[category]) client.config.modules[category] = {desc: "Not yet.", display: category.toUpperCase()}
            modules.push({name: client.config.modules[category].display , value: client.config.modules[category].desc, inline: true })
        }
        defEmbed.setFields(modules)
        /**
         * 
         */
        switch(args[0]){
            case "-section":
            case "-s":
            case "-sec":
            case "-m":
            case "-module":
    
                let module = args[1]
                let commands = [];
                let commandsa = [];
                client.commands.forEach(command =>{
                    if (command.section === module && !commandsa.includes(command.name)){
                    commands.push({name: command.name, value: command.description, inline: true})
                    commandsa.push(command.name)
                }
                })
                defEmbed = new EmbedBuilder()
                .setTitle(client.config.modules[module].display)
                .setColor("#d99b9a")
                .setDescription(client.config.modules[module].desc)
                .setTimestamp()
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
                defEmbed.setFields(commands)

                break;
            case "-command":
            case "-c":
                let cmdName = args[1];
                let command = client.commands.get(cmdName);
                let usage = command.usage;
                if (!usage) 
                    usage = [cmdName]
                defEmbed = new EmbedBuilder()
                .setTitle(command.name)
                .setDescription(command.description)
                .setFields({name: "Usage", value: `\`${usage.join("\n")}\``})
            break
            case "-all":
            case "-a":
            break;
       
        }
        message.channel.send({ embeds: [defEmbed] })
        
    }
}
module.exports = new PingCmd()