const mongoose = require("mongoose")
require("dotenv").config()

const mongoURI = process.env.MONGODB_URI || 8000

const connectDB = async () => {
    try {
        await mongoose
            .connect(mongoURI)
            .then(() => console.log("MongoDB connected"))
            .catch((err) => console.log("Error connecting to MongoDB", err))
    } catch (error) {
        console.log("Error:", error.message)
    }
}

module.exports = { connectDB }