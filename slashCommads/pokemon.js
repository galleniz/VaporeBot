const Client = require("../Client").MizClient
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

const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "pokemon",
 data: new SlashCommandBuilder()
 .setName("pokemon")
 .setDescription('Replies with a pokemon.')
 .addStringOption((option) =>
						option
							.setName('pokemon_name')
							.setDescription('Qué pokemon quieres?')
						
							.setRequired(true),
					)
 
 
 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  run: async (client, interaction) => {
    let date = interaction.createdTimestamp;
    const pokemonName = interaction.options.getString('pokemon_name');
    try {
      const pokemonData = await getPokemonData(pokemonName.toLowerCase());
    
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(pokemonData.name)
        .setDescription(`Type(s): ${pokemonData.type.join(', ')}\n Abilities: ${pokemonData.abilities.join(', ')}`)
        .setImage(pokemonData.image);

        await interaction.reply({embeds: [embed],ephemeral:false})

    } catch {
            const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Error.")
            .setDescription(`Heh, no existe ningún pokemon llamado ${pokemonName}`)
            .setImage(client.user.avatarURL());
    
            await interaction.reply({embeds: [embed],ephemeral:true})

    }

  },
};