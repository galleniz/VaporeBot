const log  = console.log;
const error  = console.error;
const notice  = console.info;
const events = []
const logs = []
class Logger {
    addEvent(f){
        events.push(f)
        
    }
    /**
     * The logger
     * 
     * @param {any} message 
     * @param  {...any[]} optionalParams 
     */
    log (message, ...optionalParams)
    {
       
        logs.push(`[${format()}] ${message} ${optionalParams.join(", ")}`)
        log(`[${format()}] ${message} ${optionalParams.join(", ")}`)
        this.logs = logs;
    }
     /**
     * The logger
     * 
     * @param {any} message 
     * @param  {...any[]} optionalParams 
     */
     error (message, ...optionalParams)
     {
        events.forEach(event => event(message + " " + optionalParams.join(", ") ))
        logs.push(`[${format()} - ❌] ${message} ${optionalParams.join(", ")}`)

        error(`[${format()} - ❌] ${message} ${optionalParams.join(", ")}`)
        this.logs = logs;

     }
    /**
     * The logger
     * 
     * @param {any} message 
     * @param  {...any[]} optionalParams 
     */
    notice (message, ...optionalParams)
    {
        logs.push(`[${format()} - ✅] ${message} ${optionalParams.join(", ")}`)

        notice(`[${format()} - ✅] ${message} ${optionalParams.join(", ")}`)
        this.logs = logs;

    }
    printIn =log
}
function format()
{
    const date = new Date();

const formattedDate =`${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
return formattedDate;
}
module.exports = Logger;