const mongoose = require("mongoose")

const playerProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    age: Number,
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    country: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    gamesPlayed: Number,
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"]
    },
    preferredGame: String,
}, { timestamps: true })

const PlayerProfile = mongoose.model("PlayerProfile", playerProfileSchema)
module.exports = PlayerProfile