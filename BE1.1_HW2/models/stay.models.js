const mongoose = require("mongoose")

const staySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    location: String,
    pricePerNight: Number,
    capacity: Number,
    isPetFriendly: {
        type: Boolean,
        default: false,
    },
    hasWifi: {
        type: Boolean,
        default: false,
    },
    hasParking: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true })

const Stay = mongoose.model("Stay", staySchema)
module.exports = Stay