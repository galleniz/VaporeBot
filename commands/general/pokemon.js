const fetch = require('node-fetch');

function getPokemonData(pokemonName) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(res => res.json())
    .then(data => {
      return {
        name: data.name,
        type: data.types.map(t => t.type.name),
        abilities: data.abilities.map(a => a.ability.name),
        image: data.sprites.front_default
      };
    });
}
const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const MizClient = require("../../Client").MizClient
require("dotenv").config();


class SetAvatarCmd extends require("../../Command").Command
{
    constructor()
    {
     
        super({
            name: "pokemon",
            aliases:["pk"],
            description: "Searchs a pokemon from pokeapi.co",
            section: "general",
            usage: ["pokemon vaporeon","pk gardevoir"],
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
    try {
        const pokemonData = await getPokemonData(args.join(" ").toLowerCase());
    
        console.log(pokemonData)
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(pokemonData.name)
        .setDescription(`Type(s): ${pokemonData.type.join(', ')}\n Abilities: ${pokemonData.abilities.join(', ')}`)
        .setImage(pokemonData.image);

        message.reply({embeds: [embed]});
    } catch {
            const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Error.")
            .setDescription(`Heh, no existe ningún pokemon llamado ${args.join(" ")}`)
            .setImage(client.user.avatarURL());
    
        message.reply({embeds: [embed]});
    }
 
   }
}
module.exports = new SetAvatarCmd()