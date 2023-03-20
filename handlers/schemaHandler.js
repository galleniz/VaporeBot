const fs = require("fs");
const {MizClient } = require("../Client")
const Mongo = require("../Mongo")
/**
 * 
 * @param {MizClient} client 
 * @param {Mongo} mongoDB 
 */
module.exports = (client, mongoDB) => {
  
  client.logger.log("---------------------- SCHEMAS LOADING ----------------------");
  fs.readdirSync("./Schemas/").forEach((file) => {
      regCommand(`../Schemas/${file}`,file);
  });
  client.logger.log("---------------------- SCHEMAS LOADED -----------------------");
  /**
   * 
   * @param {Sring} path 
   * @param {String} name 
   */
  function regCommand(path = "", name) {
    path  = path.replace(".js", "");
    name = name.replace(".js","")

    /**
     * @type {Object}
     */
    const schema = require(path);

    if (!mongoDB.schemas.has(name)) {
      client.logger.log(`Schema: ${name} (${path}.js) loaded. Status: [OK/✔]`);
      mongoDB.schemas.set(name, schema);
    } else {
      client.logger.error(`schema: ${path}.js; the name is already or doesn't exists. Status: [ERROR/❌]`);
    }
  }

};
