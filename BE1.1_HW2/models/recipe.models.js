const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    recipeId: String,
    recipeImageUrl: String,
    recipeName: String,
    description: String,
    servings: Number,
    preparingTime: Number,
    cookingTime: Number,
    ingredients: [String],
    directons: [String]
})

const Recipe = mongoose.model("Recipe", recipeSchema)
module.exports = Recipe