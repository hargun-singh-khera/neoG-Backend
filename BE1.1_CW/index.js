const { initializeDB } = require("./db/db.connect.js")
const fs = require("fs")
const Movie = require("./models/movie.models.js")
const Profile = require("./models/twitter.models.js")

initializeDB()

const jsonMovieData = fs.readFileSync("movies.json", "utf-8")
const moviesData = JSON.parse(jsonMovieData)

const jsonProfileData = fs.readFileSync("profile.json", "utf-8")
const profilesData = JSON.parse(jsonProfileData)

function seedMovieData () {
    try {
        for(const movieData of moviesData) {
            const newMovie = new Movie({
                title: movieData.title,
                releaseYear: movieData.releaseYear,
                genre: movieData.genre,
                director: movieData.director,
                actors: movieData.actors,
                language: movieData.language,
                country: movieData.country,
                rating: movieData.rating,
                plot: movieData.plot,
                awards: movieData.awards,
                posterUrl: movieData.posterUrl,
                trailerUrl: movieData.trailerUrl
            })
            newMovie.save()
        }
    } catch (error) {
        console.log("Error seeding movie data", error)
    }
}


function seedProfileData() {
    try {
        for(const profileData of profilesData) {
            const newProfile = new Profile({
                fullName: profileData.fullName,
                username: profileData.username,
                bio: profileData.bio,
                profilePicUrl: profileData.profilePicUrl,
                followingCount: profileData.followingCount,
                followerCount: profileData.followerCount,
                companyName: profileData.companyName,
                location: profileData.location,
                portfolioUrl: profileData.portfolioUrl,
            })
            newProfile.save()
        }
    } catch (error) {
        console.log("Error seeding profile data", error)
    }
}


seedMovieData()
seedProfileData()


