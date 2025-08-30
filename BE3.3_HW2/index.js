const express = require("express")
const app = express()

require("dotenv").config()
const port = process.env.PORT || 8000

const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 },
  { id: 3, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994 }
];

const items = [
    { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8},
    { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 },
    { id: 3, itemName: 'Plate', color: 'Off-White', quantity: 6 }
];


app.get("/", (req, res) => {
    res.send("Hello, Express server.")
})

app.delete("/movies/:id", (req, res) => {
    const movieId = req.params.id
    const movieIndex = movies.findIndex(movie => movie.id === parseInt(movieId))
    if(movieIndex === -1) {
        res.status(404).json({error: "Movie not found."})
    }
    else {
        res.status(200).json({message: "Movie deleted successfully."})
    }
})

app.get("/movies", (req, res) => {
    res.send(movies)
})

app.delete("/items/:id", (req, res) => {
    const itemId = req.params.id
    const itemIndex = items.findIndex(item => item.id === parseInt(itemId))
    if(itemIndex === -1) {
        res.status(404).json({error: "Item not found."})
    }
    else {
        items.splice(itemIndex, 1)
        res.status(200).json({message: "Item deleted successfully."})
    }
})

app.get("/items", (req, res) => {
    res.send(items)
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})