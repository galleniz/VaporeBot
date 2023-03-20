const Client = require("../Client").MizClient
const {BaseInteraction, EmbedBuilder} = require("discord.js")
module.exports = {
    /**
     * 
     * @param {Client} client 
     * @param {BaseInteraction} interaction
     */
     run: async (client, interaction) => {
        let rolId = client.guildMap.get(interaction.member.guild.id).memberrol ;
   
        const role = await interaction.member.guild.roles.cache.find(role => role.id === rolId);
        if (!role)
        interaction.reply({content: "i can't find the role <@&" + rolId + ">",ephemeral:true})

        await interaction.member.roles.add(role);
        const embed = new EmbedBuilder().setTitle("adding rol")
        .setDescription("Added the rol<@&" + rolId + "> for <@"+interaction.member.id +">");
        interaction.reply({embeds: [embed45r6t],ephemeral:true})
    }
}