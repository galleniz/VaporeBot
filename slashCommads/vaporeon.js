const Client = require("../Client").MizClient

const {BaseInteraction, SlashCommandBuilder,EmbedBuilder} = require("discord.js")
module.exports = {
  name: "vaporeon",
 data: new SlashCommandBuilder()
 .setName("vaporeon")
 .setDescription('Searchs a vaporeon gif/post from reddit.')
 .addStringOption((option) =>
						option
							.setName('gif')
							.setDescription('Shows a gif?')
							.addChoices({ name: 'false', value: "false" }, { name: 'true', value: "true" })
							.setRequired(false),
					)
 
 
 ,
 

  /**
   * 
   * @param {Client} client 
   * @param {BaseInteraction} interaction 
   */
  run: async (client, interaction) => {
    const msg = interaction.options.getString('gif') || "false";
    if (msg.toLowerCase() === "false"){

    const post=  await client.reddit.getRandomPost("vaporeon",50,true)

    const embed = new EmbedBuilder()
    .setAuthor({name: post.author.name, iconURL: (post.author.icon)})
    .setTitle(`<:vaporeon:1086841280342007829> Vaporeon!`)
    .setDescription(`From [r/${post.subreddit.name}](${post.subreddit.link})\n**${post.title}**\n${post.text}\n\n`)
    .setImage(post.image)
 await interaction.reply({embeds: [embed]});
  } else {
    const post=  await client.google.randomGif("vaporeon")

    const embed = new EmbedBuilder()
    .setTitle(`<:vaporeon:1086841280342007829> Vaporeon!`)
    .setImage(post)
    await interaction.reply({embeds: [embed]});
  }
  },
};