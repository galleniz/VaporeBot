process.on("uncaughtException", onError)
process.on("unhandledRejection",onError)
require("./Main").listen()

function onError(_error)
{
    console.log(_error)
}