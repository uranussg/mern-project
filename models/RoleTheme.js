const mongoose = require("mongoose")
const Schema = mongoose.Schema 
// const Role = require('./User')

const RoleThemeSchema = new Schema({

    theme: {
        type: String,
        required: true
    },
    type:{
        type: String,
        default:'RoleGame'
        },
    date: {
        type: Date, 
        default: Date.now
    }
})

const RoleTheme = mongoose.model('RoleTheme', RoleThemeSchema)
module.exports = RoleTheme