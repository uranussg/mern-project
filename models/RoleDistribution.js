const mongoose = require("mongoose")
const Schema = mongoose.Schema 
// const Role = require('./User')

const RoleDistributionSchema = new Schema({

    distribution: {
        type: Object,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    }
})

const RoleDistribution = mongoose.model('RoleDistribution', RoleDistributionSchema)
module.exports = RoleDistribution