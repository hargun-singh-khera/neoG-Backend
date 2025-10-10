const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    pincode: {
        type: String,
        maxlength: 6,
        minlength: 6,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    isDefault: {
        type: Boolean,
        default: false,
    }
})

const Address = mongoose.model("Address", addressSchema)
module.exports = Address