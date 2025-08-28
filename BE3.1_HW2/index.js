const express = require("express")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("Hello from express server.")
})

app.get("/signin", (req, res) => {
    res.send("This is the Sign in page.")
})

app.get("/booking", (req, res) => {
    res.send("Book your tickets here.")
})

app.get("/clothing/kids", (req, res) => {
    res.send("This is the kids wear page.")
})

app.get("/blog", (req, res) => {
    res.send("This is the blog page.")
})

app.listen(port, () => {
    console.log("Server running at port:", port)
})