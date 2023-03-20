const Client = require("../Client").MizClient

const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "echo",
 data: new SlashCommandBuilder()
 .setName("echo")
 .setDescription('Repeat what you want.')
 .addStringOption((option) =>
						option
							.setName('message')
							.setDescription('What do you want me to say?')
						
							.setRequired(true),
					)
 
 
 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  run: async (client, interaction) => {
    const msg = interaction.options.getString('message');
    if (msg.toLowerCase().includes("sabias") ||msg.toLowerCase().includes("sabías") || msg.includes("en") && (msg.includes("terminos") || msg.includes("términos"))){
      interaction.reply({content: "Yeah i know. :rage:"})
      return;
    }
    interaction.reply({content:msg});
  },
};