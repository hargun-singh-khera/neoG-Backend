const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    }
    
}, { timestamps: true })