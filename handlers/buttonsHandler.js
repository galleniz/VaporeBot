const fs = require("fs");
const {Command} = require("../Command")

module.exports = (client) => {
  client.logger.log("---------------------- BUTTONS LOADING ----------------------");
  fs.readdirSync("./customButtons/").forEach((dir) => {
    
    regCommand(`../customButtons/${dir}`, dir.replace(".js",""));
    
  });
  client.logger.log("---------------------- BUTTONS LOADED -----------------------");
  function regCommand(path = "", name = "") {
    path = path.replace(".js", "");
 
    const cmd = require(path);

    if (!client.customButtons.has(name)) {
      client.logger.notice(`Button: ${name} (${path}.js)  loaded. Status: [OK/✔]`);
      client.customButtons.set(name, cmd);
    } else {
      client.logger.error(`Button: ${name}; the name is already or doesn't exists. Status: [ERROR/❌]`);
    }
  }
};
