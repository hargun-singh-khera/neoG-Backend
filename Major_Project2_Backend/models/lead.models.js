const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Lead name is required"],
    },
    source: {
        type: String,
        enum: ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'],
        required: [true, "Lead source is required"],
    },
    salesAgent: {
        type: mongoose.Types.ObjectId,
        ref: "SalesAgent",
        required: [true, "Sales agent is required"],
    },
    status: {
        type: String,
        required: true,
        enum: ["New", "Contacted", "Qualified", "Proposal sent", "Closed"],
        default: "New",
    },
    tags: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Tags",
        }],
    },
    timeToClose: {
        type: Number,
        required: [true, "Time to close is required"],
        min: [1, "Time to close must be a positive number"]
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        required: [true, "Priority is required"],
        default: "Medium",
    },
    closedAt: {
        type: Date,
    }
}, { timestamps: true })

module.exports = mongoose.model("Lead", leadSchema)