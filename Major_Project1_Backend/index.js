const express = require("express")
const app = express()
require("dotenv").config()
const Product = require("./models/product.model.js")
const Category = require("./models/category.model.js")

const { connectDB } = require("./db/db.connect.js")

const port = process.env.PORT || 8000

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}

connectDB()
app.use(express.json())
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("Major Project1 Backend")
})

async function fetchProducts() {
    try {   
        const products = await Product.find()
        return products        
    } catch (error) {
        throw error
    }
}

app.get("/api/products", async (req, res) => {
    try {
        const products = await fetchProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch products."})
    }
})

async function fetchProductById(productId) {
    try {
        const product = await Product.findById(productId)
        return product        
    } catch (error) {
        throw error
    }
}

app.get("/api/products/:productId", async (req, res) => {
    try {
        const product = await fetchProductById(req.params.productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch product by Id."})
    }
})

async function fetchCategories() {
    try {
        const categories = await Category.find()
        return categories        
    } catch (error) {
        throw error
    }
}

app.get("/api/categories", async (req, res) => {
    try {
        const categories = await fetchCategories()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch categories."})
    }
})

async function fetchCategoriesById(categoryId) {
    try {
        const category = await Category.findById(categoryId)
        return category        
    } catch (error) {
        throw error
    }
}

app.get("/api/categories/:categoryId", async (req, res) => {
    try {
        const category = await fetchCategoriesById(req.params.categoryId)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category by Id."})
    }
})

app.get("/api/orders", (req, res) => {

})

app.get("/api/cart", (req, res) => {
    
})

app.get("/api/wishlists", (req, res) => {

})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})

