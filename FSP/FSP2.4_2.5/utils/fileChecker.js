require("dotenv").config()
const fs = require("fs")
const logError = require("../errorLogger.js")

const path = process.env.FILE_PATH

function checkAndCreateFile(filePath) {
    if (!filePath) {
        console.log("File path is not defined")
        return
    }
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            fs.writeFile(filePath, "Sample Text", (writeError) => {
                if (writeError) {
                    logError(`Error creating file: ${writeError}`)
                    return
                }
                console.log("File created")
            })
        } else {
            console.log("File already exists")
        }
    })
}

checkAndCreateFile(path)