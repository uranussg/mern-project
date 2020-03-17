const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const User = require('./User')

const RoomSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    users: {
        type: Object,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room