const express = require("express")
const app = express()

const { connectDB } = require("./db/db.connect.js")
const Book = require("./models/books.models.js")

connectDB()
app.use(express.json())

const port = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("My Express App : BE4_Assignment1")
})

async function createBookData(bookData) {
    try {
        const newBook = new Book(bookData)
        return await newBook.save()
    } catch (error) {
        throw error    
    }
}

app.post("/books", async (req, res) => {
    try {
        const newBook = await createBookData(req.body)
        res.status(201).json({message: "Book added successfully", book: newBook})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to create a new book."})
    }
})

async function readAllBooks() {
    try {
        const books = await Book.find()
        return books        
    } catch (error) {
        throw error
    }
}

app.get("/books", async (req, res) => {
    try {
        const books = await readAllBooks()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function readBookByTitle(bookTitle) {
    try {
        const book = await Book.findOne({title: bookTitle})
        return book
    } catch (error) {
        throw error
    }
}

app.get("/books/:bookTitle", async (req, res) => {
    try {
        const book = await readBookByTitle(req.params.bookTitle)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book."})
    }
})

async function readBooksByAuthor(bookAuthor) {
    try {
        const books = await Book.find({author: bookAuthor})
        return books        
    } catch (error) {
        throw error
    }
}

app.get("/books/author/:bookAuthor", async (req, res) => {
    try {
        const books = await readBooksByAuthor(req.params.bookAuthor)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function readBooksByGenre(bookGenre) {
    try {
        const books = await Book.find({genre: bookGenre})
        return books        
    } catch (error) {
        throw error
    }
}

app.get("/books/genre/:genreName", async (req, res) => {
    try {
        const books = await readBooksByGenre(req.params.genreName)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function readBooksByYear(bookYear) {
    try {
        const books = await Book.find({publishedYear: bookYear})
        return books        
    } catch (error) {
        throw error
    }
}

app.get("/books/year/:bookYear", async (req, res) => {
    try {
        const books = await readBooksByYear(req.params.bookYear)
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books."})
    }
})

async function updateBookRating(bookId, dataToUpdate) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return updatedBook        
    } catch (error) {
        throw error
    }
}

app.post("/books/rating/:bookId", async (req, res) => {
    try {
        const updatedBook = await updateBookRating(req.params.bookId, req.body)
        if(updatedBook) {
            res.status(200).json({message: "Book rating updated successfully", book: updatedBook})
        }
        else {
            res.status(404).json({error: "Book does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update book rating."})
    }
})

async function updateBookRatingByTitle(bookTitle, dataToUpdate) {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            {title: bookTitle}, 
            dataToUpdate, 
            {new: true}
        )
        return updatedBook
    } catch (error) {
        throw error
    }
}

app.post("/books/rating/title/:bookTitle", async (req, res) => {
    try {
        const updatedBook = await updateBookRatingByTitle(req.params.bookTitle, req.body)
        if(updatedBook) {
            res.status(200).json({message: "Book rating updated successfully", book: updatedBook})
        }        
        else {
            res.status(404).json({error: "Book not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update book rating."})
    }
})

async function deleteBookData(bookId) {
    try {
        await Book.findByIdAndDelete(bookId)        
    } catch (error) {
        throw error
    }
}

app.delete("/books/:bookId", async (req, res) => {
    try {
        await deleteBookData(req.params.bookId)
        res.status(200).json({message: "Book deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete book."})
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})








