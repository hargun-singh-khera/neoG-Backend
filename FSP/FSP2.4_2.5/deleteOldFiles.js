require("dotenv").config()
const fs = require("fs")
const path = require("path")

const directoryPath = path.resolve(process.env.DIRECTORY_PATH)
const thresholdDays = parseInt(process.env.THRESHOLD_DAYS)
const thresholdDate = new Date(Date.now() - thresholdDays * 24 * 60 * 60 * 1000)

fs.readdir(directoryPath, (error, files) => {
    if (error) {
        return console.error("Error detecting directory", error)
    }
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file)
        fs.stat(filePath, (error, stats) => {
            if (error) {
                return console.error("Error getting file stats", error)
            }
            if (stats.mtime < thresholdDate) {
                fs.unlink(filePath, (error) => {
                    if (error) {
                        console.error("Error while deleting file", error)
                    } else {
                        console.log("Deleted old files successfully", filePath)
                    }
                })
            }
        })
    })
})