const {EmbedBuilder} = require("discord.js")
module.exports = {
    
    async getImage(link, message, replaceAvatar){
        if (!link) link = ""
        const user = message.mentions.users.first() || message.author
        var link_fake = null
        if (message.attachments.first() ) 
            link_fake = message.attachments.first().url 
        link = link_fake || user.displayAvatarURL({size: 2048, dynamic: true});
        console.log(link)
      
        return link;
    },
    async logDisplayError(client, type ,message ,errorMsg, channel, value ) {
        var error = new EmbedBuilder()
            .setTitle('Error')
              .setColor("d99b9a")
        switch(type)
        {
            case "MissingPerms","mp":
            
                error.addFields(
                    { name: 'Permisos faltantes', value:  'Tu no tienes otorgado en tu usuario estos permisos: '},
                    { name: "Descripción", value: "```diff\n- "+ value+"\n```"}
                ).setDescription(errorMsg)
                .setTimestamp()
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
            break;
            case "errorcmd","cmd":
                error.addFields(
                    { name: "Descripción", value: "El comando ***" + value + "*** no está definido en la lista de los comandos."}
                ).setDescription(errorMsg)
                .setTimestamp()
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 2048 }) });
            break

        }
        return channel.send({ embeds: [error] });

    },
  };
  