const express = require("express")
const app = express()
app.use(express.json())

require("dotenv").config()
const port = process.env.PORT || 8000

const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2022 },
  { id: 2, make: "Honda", model: "Civic", year: 2021 },
  { id: 3, make: "Ford", model: "Mustang", year: 2022 },
  { id: 4, make: "Chevrolet", model: "Corvette", year: 2023 },
  { id: 5, make: "Tesla", model: "Model 3", year: 2021 },
  { id: 6, make: "Nissan", model: "Altima", year: 2022 },
  { id: 7, make: "BMW", model: "X5", year: 2023 },
  { id: 8, make: "Mercedes-Benz", model: "C-Class", year: 2021 },
  { id: 9, make: "Audi", model: "A4", year: 2022 },
  { id: 10, make: "Lexus", model: "RX", year: 2023 },
  { id: 11, make: "Hyundai", model: "Tucson", year: 2021 },
  { id: 12, make: "Kia", model: "Seltos", year: 2022 },
  { id: 13, make: "Mazda", model: "CX-5", year: 2023 },
  { id: 14, make: "Subaru", model: "Outback", year: 2021 },
  { id: 15, make: "Volkswagen", model: "Golf", year: 2022 },
];


app.get("/", (req, res) => {
    res.send("Hello Express!")
})

app.post("/cars", (req, res) => {
    const newCar = req.body
    console.log(newCar)
    if(!newCar.make || !newCar.model || !newCar.year) {
        res.status(400).json({error: "Make, model and year are required"})
    }
    else {
        cars.push(newCar)
        res.status(201).json({message: "Car added successfully", car: newCar })
    }
})

app.get("/cars", (req, res) => {
    res.send(cars)
})

// BE3.3_CW
app.delete("/cars/:id", (req, res) => {
    const carId = req.params.id
    const carIndex = cars.findIndex(car => car.id === parseInt(carId))
    if(carIndex === -1) {
        res.status(404).json({error: "Car not found"})
    }
    else {
        cars.splice(carIndex, 1)
        res.status(200).json({message: "Car deleted successfully."})
    }
})

// BE3.4_CW
app.post("/cars/:id", (req, res) => {
    const carId = parseInt(req.params.id)
    const updatedCarData = req.body
    const carToUpdate = cars.find(car => car.id === carId)
    if(!carToUpdate) {
        res.status(404).json({error: "Car not found."})
    }
    else {
        if(!updatedCarData.make || !updatedCarData.model || !updatedCarData.year) {
            res.status(400).json({error: "Make, model and year are required."})
        }
        else {
            Object.assign(carToUpdate, updatedCarData)
            res.status(200).json({message: "Car data updated successfully.", car: carToUpdate})
        }
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})