const { connectDB } = require("./db/db.connect.js")
const fs = require("fs")
const Book = require("./models/books.models.js")

connectDB()

const jsonBookData = fs.readFileSync("books.json", "utf-8")
const booksData = JSON.parse(jsonBookData)

function seedBookData() {
    try {
        for(const bookData of booksData) {
            const newBook = new Book({
                title: bookData.title,
                author: bookData.author,
                publishedYear: bookData.publishedYear,
                genre: bookData.genre,
                language: bookData.language,
                country: bookData.country,
                rating: bookData.rating,
                summary: bookData.summary,
                coverImageUrl: bookData.coverImageUrl,
            })
            newBook.save()
        }
    } catch (error) {
        console.log("Error seeding book data", error)
    }
}

seedBookData()