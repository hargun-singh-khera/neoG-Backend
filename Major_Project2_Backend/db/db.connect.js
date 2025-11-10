const mongoose = require("mongoose")
require("dotenv").config()

const mongoURI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(mongoURI)
        console.log("MongoDB connected", connectionInstance.connection.host)
    } catch (error) {
        console.log("Error while connecting to database", error)
    }
}

module.exports = { connectDB }