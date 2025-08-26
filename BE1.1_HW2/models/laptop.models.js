const mongoose = require("mongoose")

const laptopSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    processor: String,
    ramSizeGB: Number,
    storageSizeGB: Number,
    screenSizeInches: Number,
    isTouchScreen: {
        type: Boolean,
        default: false,
    },
    hasSSD: {
        type: Boolean,
        default: false,
    },
    isSaleActive: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const Laptop = mongoose.model("Laptop", laptopSchema)
module.exports = Laptop