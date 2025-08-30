const express = require("express")
const app = express()

require("dotenv").config()
const port = process.env.PORT || 8000

const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }
];

const todos = [
  { id: 1, title: 'Water the plants', day: 'Saturday' },
  { id: 2, title: 'Go for a walk', day: 'Sunday' }
];

app.get("/", (req, res) => {
    res.send("Hello, from Express Server.")
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const bookIndex = books.findIndex(book => book.id === parseInt(bookId))
    if(bookIndex === -1) {
        res.status(404).json({error: "Book not found."})
    }
    else {
        books.splice(bookIndex, 1)
        res.status(200).json({message: "Book deleted successfully."})
    }
})

app.get("/books", (req, res) => {
    res.send(books)
})


app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(todoId))
    if(todoIndex === -1) {
        res.status(404).json({error: "Todo does not exist."})
    } 
    else {
        todos.splice(todoIndex, 1)
        res.status(200).json({message: "Todo deleted successfully."})
    }
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})