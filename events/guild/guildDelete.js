
const { PermissionsBitField, Guild,GuildChannel,EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, BaseInteraction,GuildMember  } = require('discord.js');
const Event = require("../Event")
const {MizClient} = require("../../Client")
const localCacheWaiting = new Map();
class ReadyEvent extends Event.Event {
  /**
   * @param {MizClient} client
   * @param {Guild} guild
   */
 async on(client,guild)  {
    
  client.logger.log(  `${client.user} has kicked/banned/leave from ${guild.name}`)
  }
}


module.exports = new ReadyEvent()
