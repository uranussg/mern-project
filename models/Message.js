const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const User = require('./User')
const Room = require('./Room')

const MessageSchema = new Schema({
    content: {
        type: String, 
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    room_id: {
        type: Schema.Types.ObjectId, 
        ref: 'rooms'
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message