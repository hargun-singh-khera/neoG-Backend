const fs = require("fs")

try {
    fs.appendFileSync("log.txt", "New log entry: Data appended at 2:00 PM")
    console.log("Data appended successfully")
} catch (error) {
    console.error("Error: ", error)
}