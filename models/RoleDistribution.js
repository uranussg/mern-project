const mongoose = require("mongoose")
const Schema = mongoose.Schema 
// const Role = require('./User')

const RoleDistributionSchema = new Schema({

    distribution: {
        type: Object,
        required: true
    },
    room_id: {
        type:Schema.Types.ObjectId,
        ref: 'rooms'
    },
    date: {
        type: Date, 
        default: Date.now
    },
    theme:{
        type: String
    }
})

const RoleDistribution = mongoose.model('RoleDistribution', RoleDistributionSchema)
module.exports = RoleDistribution