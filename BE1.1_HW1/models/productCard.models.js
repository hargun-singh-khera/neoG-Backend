const mongoose = require("mongoose")

const productCardSchema = new mongoose.Schema({
    productImage: String,
    productTitle: String,
    ratings: Number,
    reviews: Number,
    avgRating: Number,
    description: [String],
    price: Number,
    discount: Number,
    itemCount: Number,
    isFreeDelivery: Boolean,
})

const ProductCard = mongoose.model("ProductCard", productCardSchema)
module.exports = ProductCard