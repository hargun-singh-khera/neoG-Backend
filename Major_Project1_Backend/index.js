const express = require("express")
const app = express()
const jwt = require("jsonwebtoken");

require("dotenv").config()
const cors = require("cors")
const Product = require("./models/product.model.js")
const Category = require("./models/category.model.js")
const Wishlist = require("./models/wishlist.model.js")
const Cart = require("./models/cart.model.js")

const { connectDB } = require("./db/db.connect.js")
const User = require("./models/user.model.js")
const Address = require("./models/address.model.js")
const Orders = require("./models/orders.model.js");
const { verifyJWT } = require("./middleware/index.js");

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

// signup
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required " })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ message: "User already exists " })
        }
        const user = new User({ name, email, password })
        await user.save()
        return res.status(201).json({ message: "User registered successfully", user })
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" })
        console.log("Error while registering user", error.message)
    }
})

// login
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required " })
        }
        const user = await User.findOne({ email })
        // console.log("user", user);
        if (!user) {
            return res.status(400).json({ message: "User not found " })
        }
        if (password === user.password) {
            const token = jwt.sign({ userId: user._id, name: user.name, email }, process.env.JWT_SECRET, { expiresIn: "1d" })
            // console.log("token", token);
            return res.status(200).json({ message: "User logged in successfully", token })
        } else {
            return res.status(401).json({ message: "Invalid credentials " })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to login ", error })
        console.log("Error while logging in user", error.message)
    }
})

// user details
app.get("/api/auth/me", verifyJWT, async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user detail" })
        // console.log("Error while getting user details", error.message)
    }
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
        // console.log("productData:", productData)
        const newProductItem = new Product(productData)
        // console.log("newProductItem:", newProductItem)
        return await newProductItem.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/products", async (req, res) => {
    try {
        const newProduct = await addProduct(req.body)
        // console.log("newProduct:", newProduct)
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
        product = {...product._doc, discountedPrice: Math.floor(product.price * (100-product.discount)/100), isWishlisted: wishlistedProducts.includes(product.id.toString()), isAddedToCart: cartProducts.includes(product.id.toString())}
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

app.post("/api/cart/:userId/:productId", verifyJWT, async (req, res) => {
    try {
        const { userId, productId } = req.params
        const { size } = req.body || {}
        // console.log("size", size)
        const existingCartItem = await Cart.findOne({userId, productId, size})
        if(existingCartItem) {
            throw new Error("Product already exists in cart.")
        }
        const newCartItem = await (await addProductToCart({userId, productId, quantity: req.body?.quantity, size})).populate("productId")
        res.status(201).json({message: "Product added to cart successfully.", newCartItem})
    } catch (error) {
        console.log("error", error.message)
        res.status(500).json({error: "Failed to add product to cart."})
    }
})

async function fetchCartProductsByUser(userId) {
    try {
        const cartItems = await Cart.find({userId}).populate("productId")
        // console.log("cartItems", cartItems)

        return cartItems   
    } catch (error) {
        throw error        
    }
}


// async function updateCartProduct (userId, productId, quantity, size) {
//     try {
//         const cartProduct = await Cart.findOne({ userId, productId, size })
//         if(!cartProduct) {
//             throw new Error("Product not found in cart.")
//         }
//         const updatedCartProduct = await Cart.updateOne({ userId, productId, quantity, size })
//     } catch (error) {
//         throw error
//     }
// }

// app.post("/api/cart/update/:userId/:productId", async (req, res) => {
//     try {
//         const { userId, productId } = req.params
//         const { quantity, size } = req.body
//         const updatedCartProduct = await updateCartProduct(
//             { userId, productId }, 
//             { $set: {quantity, size} }
//         )
//         res.status(200).json({ message: "Cart Product updated successfully.", updatedCartProduct})
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update cart product."})
//     }
// })

app.get("/api/cart/:userId", verifyJWT, async (req, res) => {
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

app.delete("/api/cart/:userId/:productId", verifyJWT, async (req, res) => {
    try {
        const { userId, productId } = req.params
        await removeCartItem(userId, productId)
        res.status(200).json({message: "Cart item removed successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to remove cart item."})
    }
})

async function emptyCart() {
    try {
        await Cart.deleteMany({})
    } catch (error) {
        throw error
    }
}

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

app.post("/api/wishlists/:userId/:productId", verifyJWT, async (req, res) => {
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

app.delete("/api/wishlists/:userId/:productId", verifyJWT, async (req, res) => {
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

app.get("/api/wishlists/:userId", verifyJWT, async (req, res) => {
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

async function addAddress(userId, addressData) {
    try {
        const address = new Address({ ...addressData, userId })
        return await address.save()
    } catch (error) {
        throw error
    }
}

app.post("/api/address", verifyJWT, async (req, res) => {
    try {
        const address = await addAddress(req.user.userId, req.body)
        res.status(201).json({message: "Address added successfully", address})
    } catch (error) {
        res.status(500).json({ message: "Failed to add address.", error })        
    }
})

async function fetchAddresses(userId) {
    try {
        const addresses = await Address.find({ userId })
        return addresses        
    } catch (error) {
        throw error
    }
}

app.get("/api/address", verifyJWT, async (req, res) => {
    try {
        const addresses = await fetchAddresses(req.user.userId)
        res.status(200).json({ message: "Addresses fetched successfully", addresses})
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch addresses."})
    }
})

async function fetchAddressById(addressId) {
    try {
        const addresses = await Address.findById(addressId)
        return addresses        
    } catch (error) {
        throw error
    }
}

app.get("/api/address/:addressId", verifyJWT, async (req, res) => {
    try {
        const address = await fetchAddressById(req.params.addressId)
        res.status(200).json({ message: "Address fetched successfully", address})
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch address."})
    }
})

async function updateAddress(addressId, addressData) {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(addressId, addressData, { new: true })
        return updatedAddress       
    } catch (error) {
        throw error
    }
}

app.post("/api/update/address/:addressId", verifyJWT, async (req, res) => {
    try {
        const updatedAddress = await updateAddress(req.params.addressId, req.body)
        res.status(200).json({ message: "Address updated successfully", updatedAddress})
    } catch (error) {
        res.status(500).json({ message: "Failed to update address"})        
    }
})

async function deleteAddress(addressId) {
    try {
        const address = await Address.findByIdAndDelete(addressId)
        return address
    } catch (error) {
        throw error
    }
}

app.delete("/api/address/:addressId", verifyJWT, async(req, res) => {
    try {
        const deletedAddress = await deleteAddress(req.params.addressId)
        res.status(200).json({ message: "Address deleted successfully", deletedAddress})
    } catch (error) {
        res.status(500).json({ message: "Failed to delete address."})        
    }
})

async function fetchOrders(userId) {
    try {
        const orders = await Orders.find({ userId }).populate("product.productId").populate("addressId")
        return orders        
    } catch (error) {
        throw error
    }
}

app.get("/api/orders", verifyJWT, async (req, res) => {
    try {
        const orders = await fetchOrders(req.user.userId)
        res.status(200).json({ message: "Orders fetched successfully", orders })
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders"})
    }
})

async function placeOrder(orderData, addressId, userId) {
    // console.log("orderData", orderData, "addressId", addressId, "userId", userId);
    // console.log("Placing order", {...orderData, addressId, userId});
    try {
        const order = new Orders({...orderData, addressId, userId})
        const savedOrder = await order.save()
        await savedOrder.populate("product.productId")
        await savedOrder.populate("addressId")
        return savedOrder 
    } catch (error) {
        throw error
    }
}

app.post("/api/order/:addressId", verifyJWT, async (req, res) => {
    try {
        const order = await placeOrder(req.body, req.params.addressId, req.user.userId)
        await emptyCart()
        res.status(201).json({ message: "Order placed succesfully", order })
    } catch (error) {
        console.log("Order place error", error)
        res.status(500).json({ message: "Failed to place order."})
    }
})

app.listen(port, () => {
    console.log("Server is running on port " + port)
})

