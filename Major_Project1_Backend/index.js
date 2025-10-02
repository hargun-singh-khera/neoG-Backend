const express = require("express")
const app = express()

require("dotenv").config()
const cors = require("cors")
const Product = require("./models/product.model.js")
const Category = require("./models/category.model.js")
const Wishlist = require("./models/wishlist.model.js")
const Cart = require("./models/cart.model.js")

const { connectDB } = require("./db/db.connect.js")
const User = require("./models/user.model.js")

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
        const wishlistedProducts = (await Wishlist.find()).map(product => product.productId.toString())
        const cartProducts = (await Cart.find()).map(product => product.productId.toString())
        const products = (await Product.find()).map(product => ({...product._doc, discountedPrice: Math.round(product.price * (100-product.discount)/100), isWishlisted: wishlistedProducts.includes(product.id.toString()), isAddedToCart: cartProducts.includes(product.id.toString())}))
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

async function addProduct(productData) {
    try {
        console.log("productData:", productData)
        const newProductItem = new Product(productData)
        console.log("newProductItem:", newProductItem)
        return await newProductItem.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/products", async (req, res) => {
    try {
        const newProduct = await addProduct(req.body)
        console.log("newProduct:", newProduct)
        res.status(201).json({message: "Product added successfully", newProduct})
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({error: "Failed to add product."})
    }
})

async function fetchProductsByCategory(category) {
    try {
        const products = await Product.find({category: category})   
        return products     
    } catch (error) {
        throw error
    }
}

app.get("/api/products/category/:category", async (req, res) => {
    try {
        const products = await fetchProductsByCategory(req.params.category)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch products by category."})
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
        const wishlistedProducts = (await Wishlist.find()).map(product => product.productId.toString())   
        const cartProducts = (await Cart.find()).map(product => product.productId.toString())     
        let product = await fetchProductById(req.params.productId)
        product = {...product._doc, discountedPrice: Math.round(product.price * (100-product.discount)/100), isWishlisted: wishlistedProducts.includes(product.id.toString()), isAddedToCart: cartProducts.includes(product.id.toString())}
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch product by Id."})
    }
})

async function addCategory(categoryData) {
    try {
        const newCategory = new Category(categoryData)
        return await newCategory.save()    
    } catch (error) {
        throw error
    }
}

app.post("/api/categories", async (req, res) => {
    try {
        const newCategory = await addCategory(req.body)
        res.status(201).json({message: "Category added successfully.", newCategory})
    } catch (error) {
        res.status(500).json({error: "Failed to add category."})
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

async function addProductToCart(cartData) {
    try {
        const newCartItem = new Cart(cartData)
        return await newCartItem.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/cart/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params
        // const existingCartItem = await Cart.findOne({userId, productId})
        // if(existingCartItem) {
        //     throw new Error("Product already exists in cart.")
        // }
        const newCartItem = await (await addProductToCart({userId, productId, quantity: req.body?.quantity})).populate("productId")
        res.status(201).json({message: "Product added to cart successfully.", newCartItem})
    } catch (error) {
        res.status(500).json({error: "Failed to add product to cart."})
    }
})

async function fetchCartProductsByUser(userId) {
    try {
        const cartItems = await Cart.find({userId}).populate("productId")
        console.log("cartItems", cartItems)
        return cartItems   
    } catch (error) {
        throw error        
    }
}

app.get("/api/cart/:userId", async (req, res) => {
    try {
        const cartItems = await fetchCartProductsByUser(req.params.userId)
        res.status(200).json(cartItems)
    } catch (error) {
        // console.log(error)
        res.status(500).json({error: "Failed to fetch cart items by userId."})
    }
})


async function removeCartItem(userId, productId) {
    try {
        return await Cart.deleteOne({userId, productId})        
    } catch (error) {
        throw error
    }
}

app.delete("/api/cart/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params
        await removeCartItem(userId, productId)
        res.status(200).json({message: "Cart item removed successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to remove cart item."})
    }
})


async function addProductToWishlist(userId, productId) {
    try {
        const existingWishlistItem = await Wishlist.findOne({userId, productId})
        if(existingWishlistItem) {
            throw new Error("Product already exists in wishlist.")
        }
        const newWishListItem = new Wishlist({productId, userId})
        return await newWishListItem.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/wishlists/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params 
        const newWishListItem = await addProductToWishlist(userId, productId)
        res.status(201).json({message: "Product added to wishlist successfully.", newWishListItem})
    } catch (error) {
        res.status(500).json({error: "Failed to add product to wishlist."})
    }
})

async function removeWishlistItem (userId, productId) {
    try {
        return await Wishlist.deleteOne({userId, productId})      
    } catch (error) {
        throw error
    }
}

app.delete("/api/wishlists/:userId/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params
        await removeWishlistItem(userId, productId)
        res.status(200).json({message: "Wishlist item removed successfully."})
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({error: "Failed to remove wishlist item."})
    }
})

async function fetchWishlistProductsByUser(userId) {
    try {
        const wishlistItems = await Wishlist.find({userId}).populate("productId")
        return wishlistItems        
    } catch (error) {
        throw error
    }
}

app.get("/api/wishlists/:userId", async (req, res) => {
    try {
        const wishlistItems = await fetchWishlistProductsByUser(req.params.userId)
        res.status(200).json(wishlistItems)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch wishlist items by userId."})
    }
})

async function addUser(userData) {
    try {
        const user = new User(userData)
        return await user.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/users", async (req, res) => {
    try {
        const user = await addUser(req.body)
        res.status(201).json({message: "User added successfully", user})
    } catch (error) {
        res.status(500).json({error: "Failed to add user."})
    }
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})

