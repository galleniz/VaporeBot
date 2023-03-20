const Mongo = require("mongoose")
let logger = require("./Logger")
class MongoClient
{

    constructor (){
        /**
         * @type {Boolean}
         */
        this.error = false;
        /**
         * @type {logger}
         */
        this.logger;
        /**
         *  @type {Mongo}
         */
        this.mongo = Mongo;
            /**
         * Schemas modules of MongoDB.
         * 
         * @type {Map<String,any>}
         */
        this.schemas = new Map();
                                                 
    }
    /**
     * @returns {String}
     */
    async getValidWarnID(client)
    {
        if (!this.config)
            this.config = await this.getScheme("botConfig")
        this.config = {warnId: (!this.config.warnId ? 1:  this.config.warnId  + 1)} 
        await this.saveScheme("botConfig", this.config )
    
        return "" + this.config.warnId;
    

    }
    /**
     * A simple loggin/connect function
     * 
     * @param {String} token 
     */
    async login (token){
        await this.mongo.connect(token,{useNewUrlParser: true, useUnifiedTopology: true}).catch(()=>this.error = true);
    }
      /**
     * Get scheme by name or id
     * 
     * @param {String | Snowflake} name 
     * 
     * @returns {Map} a simple map
     * 
     * @type {Promise<Void>}
     */
      async getScheme(name)
      {
        if (this.error){
             this.logger.error("MONGOCLIENT Errror: An error with the DB.")
            return new Map();
        }
         this.logger.log("MONGOCLIENT: Getting data of scheme",name,"...");
        const shceme = this.schemas.get(`${name}Scheme`)
        if (!shceme) 
            return  this.logger.error("MONGOCLIENT Error: Couldn't find the scheme", `${name}Scheme`, "to write or get it.")
        let data = await shceme.findOne({daName: "a"})

        if (!data)
            await (new shceme({daMap: (new Map()), daName:"a"})).save();
        else{
            if (data.daMap)
                return data.daMap
            else
                return (new Map());

        }
    

        return (new Map());
    }
    /**
     * Save scheme by name or id
     * 
     * @param {String | Snowflake} name 
     * @param {Any} data
     */
    async saveScheme(name, data)
    {
        if (this.error){
             this.logger.error("MONGOCLIENT Errror: An error with the DB.")
            return false;
        }
         this.logger.log("MONGOCLIENT: setting data of scheme ",name,"...");

        const shceme = this.schemas.get(name + "Scheme")
        if (!shceme) {
             this.logger.error("MONGOCLIENT Error: Couldn't find the scheme", name, "to write or set it.")
            return false;
        }

        await shceme.findOneAndUpdate({daMap: data, daName:"a"})
         this.logger.log("MONGOCLIENT: Saved! value: ",name)
        return true;
    }
}
module.exports = MongoClient