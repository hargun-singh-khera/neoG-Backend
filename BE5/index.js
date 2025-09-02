const { connectDB } = require("./db/db.connect.js")
const Post = require("./models/post.models")
const User = require("./models/user.models")

connectDB()

const userData = {
    name: "John",
    email: "john@gmail.com"
}

const addUser = async () => {
    try {
        const newUser = new User(userData)
        await newUser.save()
    } catch (error) {
        console.log("Error: ", error)
    }
}

addUser()

const postData = {
    title: "Greeting",
    content: "Have a good day",
    author: "68b676527fc80e6fb63ce573"
}

const addPost = async () => {
    try {
        const newPost = new Post(postData)
        await newPost.save()
    } catch (error) {
        console.log("Error: ", error)
    }
}

addPost()

const getAllPosts = async () => {
    try {
        const allPosts = await Post.find().populate("author")
        console.log(allPosts)
    } catch (error) {
        console.log("Error:", error)
    }
}

getAllPosts()