const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"]
    },
    dueDate: Date,
    completed: {
        type: Boolean,
        default: false
    },
    tags: [String],
}, { timestamps: true })

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo