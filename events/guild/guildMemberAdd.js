
const { PermissionsBitField, EmbedBuilder, Message, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, BaseInteraction,GuildMember  } = require('discord.js');
const Event = require("../Event")
const {MizClient} = require("../../Client")
const localCacheWaiting = new Map();
class ReadyEvent extends Event.Event {
  /**
   * @param {MizClient} client
   * @param {GuildMember} member
   */
 async on(client,member)  {
    
  
}
}


module.exports = new ReadyEvent()


