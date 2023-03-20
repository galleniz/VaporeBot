const fs = require("fs");
const { file } = require("googleapis/build/src/apis/file");
const {MizClient} = require("../Client")

/**
 * 
 * @param {MizClient} client 
 */
module.exports = (client) => {
  client.logger.log("---------------------- EVENTS LOG ----------------------");

  fs.readdirSync("./events/").forEach((dir) => {
    if (!dir.endsWith(".js"))
    fs.readdirSync(`./events/${dir}`).forEach((file) => {
      if (file.endsWith(".js")) {
        const eventClass = require("../events/Event").Event
        try {
          /**
           * @type {eventClass}
           */
          let evn = require(`../events/${dir}/${file}`);
          evn.event = evn.event;
          evn.client = client;
          client.events.set(file.replace(".js",""),evn);
          client.on(file.replace(".js",""), (a,b,c,d) => evn.on(client,a,b,c,d));
          client.logger.notice(`Event: ${file.replace(".js","")} (${file}) as ${evn.event} loaded. Status: [OK/✔]`);
        } catch (error) {
          client.logger.error(`Event: ${file}; Have a error. Status: [ERROR/❌] (${error})`);
        }
      }
    });
  });

  client.logger.log("---------------------- EVENTS LOADED -------------------");
};
