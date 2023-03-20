const Event = require("../Event")
const {MizClient} = require("../../Client")
const {EmbedBuilder} = require("discord.js")
class ReadyEvent extends Event.Event {
  /**
   * @param {MizClient} client
   */
  on(client){
    client.logger.log(`El bot: ${client.user.username} esta en linea`);
    // client.user.setAFK(true)
        /**
       * @type {Date}
       */
        this.upttimed = new Date();
    // busca en onde fregados anda el bot / mizapis server
    const mainguild = client.guilds.cache.get("973021942892359711");
  const channel = mainguild.channels.cache.get("1086789801493151866");
    var embed =new EmbedBuilder()
    .setTitle("The bot is online")
    .setColor("Random")
    .setDescription(`Conectada desde <t:${Math.floor(client.upttimed / 1000)}:R>.\nEl bot ${client.user.username} está ahora en linea.\n\n\nMizAPI: \`v0.5b\`\nDiscord.JS: \`v14\``)
  if (channel) 
    
    channel.send({embeds: [embed]});


client.logger.addEvent(function (log){
  if (channel)
  channel.send("```\n"+log+"\n```");
})
  
  }
}


module.exports = new ReadyEvent()