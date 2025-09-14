const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        default: 0,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: true,
    },
    category: {
        type: String,
        enum: ["men", "women", "kids"],
        required: true,
    },
    size: [{
        type: String,
        enum: ["XS","S", "M", "L", "XL", "XXL"],
        required: true,
    }],
    description: [{
        type: String,
        required: true,
    }],
    imageUrl: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        enum: ["Summer", "Winter"],
        required: true,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    stockItems: {
        type: Number,
        default: 0,
    },
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product