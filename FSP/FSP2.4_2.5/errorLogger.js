const fs = require("fs")
const path = require("path")

function logError (message) {
    const errorFilePath = path.resolve('./logs/error.log')
    fs.appendFile(errorFilePath, `${new Date().toISOString()}: ${message}\n`, (error) => {
        if (error) {
            console.error("Failed to log error", error)
        }
    })
}

module.exports = logError