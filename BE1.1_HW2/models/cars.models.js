const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    make: {
        type: String,
        requred: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: Number,
    mileage: Number,
    fuelType: {
        type: String,
        enum: ["Gasoline", "Diesel", "Electric", "Hybrid"]
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
    },
    bodyStyle: {
        type: String,
        enum: ["Sedan", "SUV", "hatchback"]
    },
    color: String,
    isCertifiedPreOwned: {
        type: Boolean,
        default: false,
    },
    isFourWheelDrive: {
        type: Boolean,
        default: false,
    },
    isLuxury: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Car = mongoose.model("Car", carSchema)
module.exports = Car