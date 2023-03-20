const mongoClient = require("./Mongo")
class GuildDB
{

    constructor()
    {
        /**
         * @type {Map<String, { users: Map<String, Object>, custom_items: Array<Object>, roles: Array<Object>, boxes:Array<Object>, premium: Bool, prefix: String, }>}
         */
        this.guildDB = new Map();
        /**
         * @type { mongoClient}
         */
        this._db = null;

    }
    async login()
    {
        console.log("login in...")
        this.guildDB = await this._db.getScheme("guildScheme");
        console.log(this.guildDB)
    }
    async save()
    {
        await this._db.saveScheme("guildScheme", this.guildDB);
    }
    /**
     * 
     * @param {String} userid 
     * @param {String} guildid 
     * @returns {{money: Number, level: {xp: Number, moneyMultiplier: Number}, inventory :Array<{id: Number, amount:Number}>, data: {daily: Number, weekly: Number, monthly: Number, bonus: Number, work: Number}}
     */
    obtainAUserFromGuild(userid, guildid)
    {
        console.log(guildid)
        let guild = this.guildDB.get(guildid) || {users: new Map(), custom_items: [], roles: [], boxes: [], premium: false, prefix: "$"};
        console.log(guild)
        if (!guild.users.get)
        guild.users = new Map()
        this.guildDB.set(guildid, guild)
        
        
        let user = guild.users.get(userid) || {money: 0, level: {xp: 0, moneyMultiplier: 0}, inventory:[], data: {daily: 0, weekly: 0, monthly: 0, bonus: 0, work: 0}}
        guild.users.set(userid, user)
        return user;

       


    }
    /**
    * 
    * @param {any} data 
    * @param {{guild: String, member: String}} params 
    */
    setUser(data, params)
    {
        let guild = this.guildDB.get(params.guild) || {users:new Map(), custom_items: [], roles: [], boxes: [], premium: false, prefix: "$"};
        this.guildDB.set(params.guild, guild)
        guild.users.set(params.member, data)
    }
    
    /**
     * 
     * @param {GuildMember} member
     * @param {Number} amount 
     * @param {String} variableDepender 
     * @param {Number} days 
     * 
     * @returns {{money: Number, level: {xp: Number, moneyMultiplier: Number}, inventory :Array<{id: Number, amount:Number}>, data: {daily: Number, weekly: Number, monthly: Number, bonus: Number, work: Number}} || {error:String, tmr: Number}} 
     */
    async addMoney(member, amount = 0, variableDepender = "daily", days = 1, hours = 0)
    {
        let fechaActual = this.equalDay(0,0,hours, days);

        let user = this.obtainAUserFromGuild(member.id, member.guild.id)
        let variable = user.data[variableDepender] 

        this.setUser(user, {member: member.id, guild: member.guild.id})

         if (Date.now() > variable) {
            user.data[variableDepender] = fechaActual.getTime();
            user.money += amount;
            return user;
         }
        
        return {error: "Wait", tmr: variable};
        
       
    }
}
module.exports = GuildDB;