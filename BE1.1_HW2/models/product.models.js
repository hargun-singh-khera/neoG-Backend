const mongoose = require("mongoose")

const productCardSchema = new mongoose.Schema({
    productId: String,
    productImageUrl: String,
    productName: String,
    ratingsCount: Number,
    reviewsCount: Number,
    avgRating: Number,
    price: Number,
    discount: Number,
    offers: [String],
    vairant: [String],
    isWifiConnectivity: Boolean,
})

const ProductCard = mongoose.model("ProductCard", productCardSchema)
module.exports = ProductCard