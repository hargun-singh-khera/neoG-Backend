const mongoose = require("mongoose")

const productCardSchema = new mongoose.Schema({
    productImage: String,
    productName: String,
    productCategory: String,
    productInfo: String,
    colors: [String],
    sizes: [String],
    price: Number,
    isNewArrival: Boolean,
})

const ProductCard = mongoose.model("productCard", productCardSchema)
module.exports = ProductCard