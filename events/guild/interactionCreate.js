/**
 * 
 * if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'button') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });
 */
const { PermissionsBitField, EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, BaseInteraction  } = require('discord.js');
const Event = require("../Event")
const {MizClient} = require("../../Client")
const localCacheWaiting = new Map();
class ReadyEvent extends Event.Event {
  /**
   * @param {MizClient} client
   * @param {BaseInteraction} interaction
   */
 async on(client,interaction)  {
  if (interaction.isButton()) {
    const member = interaction.member;
    let button =  client.customButtons.get(interaction.customId);
    if (button)
        button.run(client,interaction)
  }
   console.log("A new interaction: " + interaction.isCommand())

  if (interaction.isCommand()) {
    console.log(interaction.commandName)

    const command = client.slash.get(interaction.commandName);
    try {
      command.run(client, interaction);
    } catch (e) {
        console.log(e)
    }
  }

}
}


module.exports = new ReadyEvent()


