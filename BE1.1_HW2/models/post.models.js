const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postId: String,
    postImageUrl: String,
    postDescription: String,
    likesCount: Number,
    commentsCount: Number,
    sharesCount: Number,
    postedBy: String,
    postedAt: Date,
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post