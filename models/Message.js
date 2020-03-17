const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const User = require('./User')
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

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message