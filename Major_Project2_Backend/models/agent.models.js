const mongoose = require("mongoose")

const salesAgentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Sales agent name is required"],
    },
    email: {
        type: String,
        required: [true, "Sales agent email is required"],
        unique: true,
    }
}, { timestamps: true })


module.exports = mongoose.model("SalesAgent", salesAgentSchema)