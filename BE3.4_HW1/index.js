const express = require("express")
const app = express()
app.use(express.json())

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
    res.send("Hello, From Express Server.")
})

app.post("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id)
    const updatedBookData = req.body
    const bookToUpdate = books.find(book => book.id === bookId)
    if(!bookToUpdate) {
        res.status(404).json({error: "Book not found."})
    }
    else {
        if(!updatedBookData.title || !updatedBookData.author || !updatedBookData.year) {
            res.status(400).json({error: "Title, author and year are required."})
        }
        else {
            Object.assign(bookToUpdate, updatedBookData)
            res.status(200).json({message: "Book data updated successfullty.", book: bookToUpdate})
        }
    }
})

app.get("/books", (req, res) => {
    res.send(books)
})

app.post("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id)
    const updatedTodoData = req.body
    const todoToUpdate = todos.find(todo => todo.id === todoId)
    if(!todoToUpdate) {
        res.status(404).json({error: "Todo does not exist."})
    }
    else {
        if(!updatedTodoData.title || !updatedTodoData.day) {
            res.send(400).json({error: "Title and day are required."})
        }
        else {
            Object.assign(todoToUpdate, updatedTodoData)
            res.status(200).json({message: "Todo data updated successfully.", todo: todoToUpdate})
        }
    }
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})