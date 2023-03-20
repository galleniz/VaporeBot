const {Client, GatewayIntentBits, Embed, EmbedBuilder, GuildMember} = require("discord.js");
require("dotenv").config();

const BaseCommand = require("./Command").Command;
const BaseEvent = require("./events/Event").Event;
const RedditClient = require("./RedditClient")
const GoogleClient = require("./Google")
const GuildDB = require("./GuildDB")
const handlers = [ "commandHandler","eventHandler", "schemaHandler","buttonsHandler", "slashHandler"]


const DataBaseClass =  require("./Mongo");
/**
 * @author MrNiz
 * @type {Client}
 */
class MizClient extends Client
{

    constructor(){
        super({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildEmojisAndStickers,
            // GatewayIntentBits.Guild
        ],
        })
        
        /**
         * @type {Logger}
         */
        this.logger = new Logger();

        /**
         * @type {GoogleClient}
         */
        this.google = new GoogleClient()
        this.google.logger = this.logger;
        /**
         * @type {RedditClient}
         */
        this.reddit = new RedditClient()
        this.reddit.logger = this.logger;

        /**
         * @type {Date}
         */
        this.upttimed = new Date();
        /**
         * @type {Map<String,Object>}
         */
        this.events = new Map()
        /**
         * @type {DataBaseClass}
         */
        this.mongoDB = new DataBaseClass();
        this.mongoDB.logger = this.logger;
        this.mongoDB.login(process.env.DB)

        /**
         * A Map of contains of some commands.
         * 
         * @type {Map<String,BaseCommand>}
         */
        this.commands = new Map();
        /**
         * A map with custom buttons
         * 
         * @type {Map<String,Object>}
         */
        this.customButtons = new Map();

        /**
         * The events of the client.
         * 
         * @type {Map<String,BaseEvent>}
         */
        this.events = new Map();
        /**
         * @type {Map<String,any>}
         */
        this.slash = new Map();

        /**
         * @type {String}
         */
        this.prefix = process.env.PREFIX;

        // now this is the Main loader.
        
        /**
         * @type {Map<String,any>}
         */
        this._localHandler = new Map()
        /**
         * a simple adder for days xd.
         * 
         * @type {Date<void>}
         * @param {Number} secs
         * @param {Number} minutes
         * @param {Number} hours
         * @param {Number} days
         * @param {Number} months
         * 
         * @returns {Date}
         */
        this.equalDay = function(secs = 0, minutes = 0, hours = 0, days = 0, months = 0) {
            let toAdd = (secs * 1000) + (minutes * 60000) + (hours * 3600000) + (days * 86400000) + (months * 30.44 * 86400000);
            let date = new Date();
            date.setTime(Math.floor(date.getTime() + toAdd));
            return date;
          }
          
        /**
         * because yes.
         */
		handlers.forEach((file) => {
            console.log(file.replace(".js",""))
            let handler =  (require(`./handlers/${file}`))
            handler(this,this.mongoDB)
			this._localHandler.set(file.replace(".js",""), handler);
		});
       
        /**
         * @type {Map<String,Object>}
         */
        this.usersDat = new Map();
        /**
         * @type {Promise<void>}
         */
        this.saveScheme = this.save;

        /**
         * Current configs in the bot
         * @type {Object}
         */
        this.config = require("./config.json")
        /**
         * URL With the link of the source code
         * @type {String}
         */
        this.github = this.config.github;

        /**
         * @type {Array<String>}
         */
        this.categories  = ["misc"]
        /**
         * @type {Map<String,Object>}
         */
        this.set = new Map();
        this.dataBase().then(()=>{

            this.login(process.env.DSTOKEN)
        })
}
 
    /**
     * @param {String} str
     */
    toCapital(str)
    {
        let oldStr = str;
        str = "";
        for (let letter of oldStr)
        {
            if (str === "")
                letter = letter.toUpperCase();
            str += letter;
        }
        return str;
    }
    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
 randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    async dataBase(){
        this.logger.notice("checking saves... (in the data base)")
        this.usersDat = await this.mongoDB.getScheme("users");
    }
  
      /**
     * 
     * @type {Promise<void>}
     */
    async save(){
        await this.mongoDB.saveScheme("users", this.usersDat)
    }
}

const Logger = require("./Logger")
/**
 * @type {MizClient | Client}
 * @author MrNiz
 */
module.exports.MizClient = MizClient