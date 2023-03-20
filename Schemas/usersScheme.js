const { Schema, model } = require("mongoose")
require("dotenv").config();

const setScheme = new Schema(
    {
        daMap: {
            type: "Map",
            required: true
        },
        daName: {
            type: "String",
            required: true
        }
    }
    )

module.exports = model("usersVaporeon",setScheme)