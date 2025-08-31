const express = require("express")
const app = express()

const { initializeDB } = require("./db/db.connect.js")
const Movie = require("./models/movie.models.js")

initializeDB()
app.use(express.json())
const port = process.env.PORT || 8000



// BE4.1_CW

// find a movie with a particular title
async function readMovieByTitle(movieTitle) {
    try {
        const movie = await Movie.findOne({title: movieTitle})
        return movie
    } catch (error) {
        throw error
    }
}

app.get("/movies/:title", async (req, res) => {
    try {
        const movie = await readMovieByTitle(req.params.title)
        if(movie) {
            res.status(200).json(movie)
        }
        else {
            res.status(404).json({error: "Movie not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movie."})
    }
})

// find all the movies in the database
async function findAllMovies() {
    try {
        const movies = await Movie.find()
        return movies       
    } catch (error) {
        throw error
    }
}

app.get("/movies", async (req, res) => {
    try {
        const movies = await findAllMovies()
        if(movies.length > 0) {
            res.status(200).json(movies)
        }
        else {
            res.status(404).json({error: "No movies found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movies."})
    }
})

// find movie by director
async function findMovieByDirector(directorName) {
    try {
        const movies = await Movie.find({director: directorName})
        return movies
    } catch (error) {
        throw error
    }
}

app.get("/movies/director/:directorName", async (req, res) => {
    try {
        const movies = await findMovieByDirector(req.params.directorName)
        if(movies.length > 0) {
            res.status(200).json(movies)
        }
        else {
            res.status(404).json({error: "No movies found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movies."})
    }
})

async function readMovieByGenre(genreName) {
    try {
        const movieByGenre = await Movie.find({genre: genreName})
        return movieByGenre
    } catch (error) {
        console.log(error)
    }
}

app.get("/movies/genres/:genreName", async (req, res) => {
    try {
        const movies = await readMovieByGenre(req.params.genreName)
        if(movies.length > 0) {
            res.status(200).json(movies)
        }
        else {
            res.status(404).json({error: "No movies found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch movies."})
    }
})


// BE4.2_CW
async function createMovie(newMovie) {
    try {
        const movie = new Movie(newMovie)
        return await movie.save()
    } catch (error) {
        throw error
    }
}

app.post("/movies", async (req, res) => {
    try {
        const newMovie = await createMovie(req.body)
        res.status(201).json({message: "Movie added successfully", movie: newMovie})
    } catch (error) {
        res.status(500).json({error: "Failed to add movie."})
    }
})

// BE4.3_CW
async function deleteMovie(movieId) {
    try {
        return await Movie.findByIdAndDelete(movieId)       
    } catch (error) {
        throw error
    }
}

app.delete("/movies/:movieId", async (req, res) => {
    try {
        await deleteMovie(req.params.movieId)
        res.status(200).json({message: "Movie deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete movie."})
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})