const mongoose = require("mongoose")

const fruitInfoSchema = new mongoose.Schema({
    fruitImageUrl: String,
    fruitName: String,
    fruitDescription: String,
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fat: Number
})

const FruitInfo = mongoose.model("fruitInfo", fruitInfoSchema)
module.exports = FruitInfo