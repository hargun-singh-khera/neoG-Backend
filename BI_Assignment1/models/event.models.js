const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    eventType: {
        type: String,
        enum: ["Online", "Offline"],
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    topic: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sessionTimings: {
        type: String,
        required: true,
    },
    speakers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Speaker",
        required: true,
    }],
    venue: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dressCode: String,
    ageRestriction: Boolean,
    tags: [{
        type: String,
        required: true,
    }]
})

const Event = mongoose.model("Event", eventSchema)
module.exports = Event