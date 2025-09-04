const mongoose = require("mongoose")

const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: true,
    }
})

const Speaker = mongoose.model("Speaker", speakerSchema)
module.exports = Speaker