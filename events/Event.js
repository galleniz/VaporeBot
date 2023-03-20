const Discord = require("discord.js");
const {Message, EmbedBuilder} =Discord;
const clientClass = require("../Client").MizClient

class Event {
    constructor(){
        this.main = require("../Main")
        /**
         * @type {clientClass}
         */
        this.client = this.main.client
    }
      /**
         * @param {clientClass} client
         */
    on(client){}
}
/**
 * @type {Event}
 */
this.Event = Event 