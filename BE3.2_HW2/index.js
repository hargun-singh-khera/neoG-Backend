const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()
const port = process.env.PORT || 8000

const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }
];

const items = [
  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},
  { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 }
];


app.get("/", (req, res) => {
    res.send("Express server.")
})

app.post("/movies", (req, res) => {
    const newMovie = req.body
    if(!newMovie.title || !newMovie.director || !newMovie.year) {
        res.status(400).json({error: "Title, director and year are required."})
    }
    else {
        movies.push(newMovie)
        res.status(201).json({message: "Movie added successfully", movie: newMovie})
    }
})

app.get("/movies", (req, res) => {
    res.send(movies)
})

app.post("/items", (req, res) => {
    const newItem = req.body
    if(!newItem.itemName || !newItem.color || !newItem.quantity) {
        res.send(400).json({error: "Item name, color and quantity are required."})
    }
    else {
        items.push(newItem)
        res.status(201).json({message: "Item added successfully.", item: newItem})
    }
})

app.get("/items", (req, res) => {
    res.send(items)
})


app.listen(port, () => {
    console.log("Server is running at port:", port)
}) 