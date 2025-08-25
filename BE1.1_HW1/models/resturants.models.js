const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cuisine: [{
        type: String,
        enum: ['Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'French', 'Japanese', 'Mediterranean', 'Thai', 'Vegetarian', 'Vegan', 'Other']
    }],
    location: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    phone: String,
    website: String,
    openingYear: Number,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    specialDishes: [String],
    photoUrls: [String]
}, { timestamps: true})

const Resturant = mongoose.model("Resturant", resturantSchema)
module.exports = Resturant