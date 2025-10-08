const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    size: {
        type: String,
        enum: ["XS","S", "M", "L", "XL", "XXL"],
        required: true,
    }
})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart