const mongoose = require("mongoose")

require("dotenv").config()
const mongoUri = process.env.MONGODB_URI

const connectDB = async() => {
    await mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to Database")
    })
    .catch((err) => {
        console.log("Error connecting to database", err)
    })
}

module.exports = { connectDB }