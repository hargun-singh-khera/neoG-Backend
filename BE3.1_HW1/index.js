const express = require("express")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Hello, Express JS.")
})

app.get("/products", (req, res) => {
    res.send("Browser our products here.")
})

app.get("/services", (req, res) => {
    res.send("Explore our sevices.")
})

app.get("/faq", (req, res) => {
    res.send("Frequently Asked Questions.")
})

app.get("/gallery", (req, res) => {
    res.send("View our gallery.")
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
}) 