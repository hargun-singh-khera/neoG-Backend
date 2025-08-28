const express = require("express")
const app = express()
require("dotenv").config()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello Express!")
})

app.get("/about", (req, res) => {
    res.send("This is the about page.")
})

app.get("/contact", (req, res) => {
    res.send("Contact us at contact@example.com")
})


app.listen(port, () => {
    console.log("Server is running on port:", port)
})
