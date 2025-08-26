const mongoose = require("mongoose")

const smartphoneSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    operatingSystem: String,
    displaySize: String,
    storage: String,
    ram: String,
    cameraSpecs: Object,
    batteryCapacity: String,
    connectivity: [String],
    price: Number,
    colorsAvailable: [String],
    features: [String],
}, { timestamps: true })

const Smartphone = mongoose.model("Smartphone", smartphoneSchema)
module.exports = Smartphone