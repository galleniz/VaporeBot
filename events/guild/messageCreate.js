const { PermissionsBitField, EmbedBuilder, Message, AttachmentBuilder} = require('discord.js');
const Event = require("../Event")
const {MizClient} = require("../../Client")
const prefix = "v!"
/**
 * @type {Map<String,Array<Number>>}
 */
let cachedLastMsg = new Map();
class ReadyEvent extends Event.Event {
  /**
   * @param {MizClient} client
   * @param {Message<true>} message
   */
 async on(client,message)  {
    client.lastmessage = message;
    if (message.author.bot)
  return;
 
    useCommand(message.content.startsWith(prefix)  ? prefix : `<@${client.user.id}> `)
    

    async function useCommand(type)
    {
      if (!message.content.startsWith(type.replace(" ","")))
          return;
    message.mentions.users.delete(client.user.id)

    if (message.content.match(client.user.id)) client.wasPing = message.content.match(client.user.id).length > 0;

    message.content = message.content.replace(/@(?:everyone|here)/g, '');
    
    const [cmd, ...args] = message.content.slice(type.length).split(/ +/).map(str => str);
    client.lastCommand = cmd.toLowerCase();
  
    const command = client.commands.get(cmd.toLowerCase());
  
    if (command){ 
      await command.tryRun(message,client);
       client.logger.log("Command used " + cmd)

    }
     else {
      if (type.includes(client.user.id)){
        const command = client.commands.get("aboutme");
  
        if (command) await command.tryRun(message,client);
      }
    }
   
  
    }  

}
}


module.exports = new ReadyEvent()


