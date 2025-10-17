const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
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
    },
    price: {
        type: Number,
        required: true,
    },
    // status: {
    //     type: String,
    //     enum: ["pending", "completed"],
    //     default: "pending",
    // },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    }
}, { timestamps: true })

const Orders = mongoose.model("Orders", ordersSchema)
module.exports = Orders