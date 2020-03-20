const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const RoleTheme = require('./RoleTheme')

const RoleSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    theme_id: {
        type: Schema.Types.ObjectId,
        ref: 'rolethems'
    },
    role_avator_id: {
        type: Number
    },
    type:{
        type: String,
        default:"Prime"
        },
    date: {
        type: Date, 
        default: Date.now
    }
})

const Role = mongoose.model('Role', RoleSchema)
module.exports = Role