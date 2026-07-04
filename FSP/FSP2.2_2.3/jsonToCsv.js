const fs = require("fs")
const path = require("path")
const { Parser } = require("json2csv")

// path to json file
const jsonFilePath = path.join(__dirname, "data.json")

// read the json file

try {
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8")
    const data = JSON.parse(jsonData)
    
    // create  a new csv parser
    const json2CsvParser = new Parser()
    const csv = json2CsvParser.parse(data)

    // write the csv data to file
    const csvFilePath = path.join(__dirname, "convertedData.csv")
    fs.writeFileSync(csvFilePath, csv)
    console.log("Conversion successful")
} catch (error) {
    console.error("Error reading or converting to csv", error)
}