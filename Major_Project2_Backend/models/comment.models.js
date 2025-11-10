
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    lead: {
        type: mongoose.Types.ObjectId,
        ref: "Lead",
        required: [true, "Lead reference is required"],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "Agent",
        required: [true, "Author is required"],
    },
    commentText: {
        type: String,
        required: [true, "Comment is required"],
    }
}, { timestamps: true})

module.exports = mongoose.model("Comment", commentSchema)