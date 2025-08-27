const { initializeDB } = require("./db/db.connect.js")
const Movie = require("./models/movie.models.js")

initializeDB()

const newMovie = {
    title: "New Movie",
    releaseYear: 2023,
    genre: ["Drama"],
    director: "Aditya Roy Chopra",
    actors: ["Actor1", "Actor2"],
    language: "Hindi",
    country: "India",
    rating: 6.1,
    plot: "A young man and woman fall in love on a Australia trip.",
    awards: "IFA Filmfare Awards",
    posterUrl: "https://example.com/new-poster1.jpg",
    trailerUrl: "https://example.com/new-trailer1.mp4"
}

async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie)
        await movie.save()
    } catch (error) {
        throw error
    }
}

// createMovie(newMovie)

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.findOne({title: movieTitle})
        console.log(movie)   
    } catch (error) {
        throw error
    }
}

// readMovieByTitle("Dilwale Dulhania Le Jayenge")

// find all the movies in the database
async function findAllMovies() {
    try {
        const movies = await Movie.find()
        console.log(movies)       
    } catch (error) {
        throw error
    }
}

// findAllMovies()

// find movie by director
async function findMovieByDirector(directorName) {
    try {
        const movie = await Movie.find({director: directorName})
        console.log(movie)
    } catch (error) {
        throw error
    }
}

findMovieByDirector("Kabir Khan")