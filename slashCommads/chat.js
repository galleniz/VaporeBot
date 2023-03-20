const Client = require("../Client").MizClient
const cleverBot = require("cleverbot-free")

const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "chat",
 data: new SlashCommandBuilder()
 .setName("chat")
 .setDescription('Talk with me!. it\'s not interesting?')
 .addStringOption((option) =>
						option
							.setName('message')
							.setDescription('It will be the question/dialogue that you will ask me')
						
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
    if ((msg.toLowerCase().includes("sabias") ||msg.toLowerCase().includes("sabías") || msg.includes("en") && (msg.includes("terminos") || msg.includes("términos"))) || (msg.toLowerCase().includes("did you know") || msg.includes("in") && msg.includes("terms") )){
      interaction.reply({content: "Sí ya sabía. :rage:"})
      return;
    }
    cleverBot(msg).then(msg=>{
      interaction.reply({content:msg});

    }).catch(a=>{

      interaction.reply({content:"Hubo un error en la API, prueba más tarde (o ahorita mismo).", ephemeral:true});
    })
  },
};