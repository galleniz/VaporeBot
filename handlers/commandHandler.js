const fs = require("fs");
const {Command} = require("../Command")

module.exports = (client) => {
  client.logger.log("---------------------- COMMANDS LOADING ----------------------");
  fs.readdirSync("./commands/").forEach((dir) => {
    if (!dir.endsWith(".js") && !dir.endsWith(".jpg"))
      fs.readdirSync(`./commands/${dir}`).forEach((file) => {
        if (file.endsWith(".js")) 
          regCommand(dir, `../commands/${dir}/${file}`, file.replace(".js",""));
      });
  });
  client.logger.log("---------------------- COMMANDS LOADED -----------------------");
  function regCommand(category = "misc", path = "", name = "") {
    path = path.replace(".js", "");
    /**
     * @type {Command}
     */
    const cmd = require(path);

    if (!client.commands.has(name)) {
      client.logger.notice(`Command: ${cmd.name} (${path}.js) in the category ${category} loaded. Status: [OK/✔]`);
      client.commands.set(cmd.name, cmd);
      for (let aliase of cmd.aliases)
        {
          client.commands.set(aliase,cmd);
        }
      if (!client.categories)
        client.categories = []
      if (!client.categories.includes(cmd.section))
      client.categories.push(cmd.section);
      cmd.client =client;
    } else {
      client.logger.error(`Command: ${name} (${path}.js) in the category ${category}; the name is already or doesn't exists. Status: [ERROR/❌]`);
    }
  }
};
