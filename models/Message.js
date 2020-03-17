const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const User = requier('./User')
const Room = require('./Room')

const MessageSchema = new Schema({
    Body: {
        type: String, 
        required: true
    },
    user: {
        type: User, 
        required: true
    },
    room: {
        type: Room, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const User = mongoose.model('Message', MessageSchema)
module.exports = Message