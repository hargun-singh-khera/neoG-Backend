const { connectDB } = require("./db/db.connect.js")
// const fs = require("fs")
const Car = require("./models/car.models.js")

connectDB()

// const jsonCarData = fs.readFileSync("cars.json", "utf-8")
// const carsData = JSON.parse(jsonCarData)

function seedCarData() {
    try {
        for(const carData of carsData) {
            const newCar = new Car({
                brand: carData.brand,
                model: carData.model,
                year: carData.year,
                bodyStyle: carData.bodyStyle,
                fuelType: carData.fuelType,
                transmission: carData.transmission,
                engine: carData.engine,
                mileage: carData.mileage,
                color: carData.color,
                price: carData.price,
                condition: carData.condition,
                description: carData.description,
                photos: carData.photos,
                inMarket: carData.inMarket
            })
            newCar.save()
        }        
    } catch (error) {
        console.log("Error seeding car data", error)
    }
}

// seedCarData()

const carData = {
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg"
  ]
};

const carData2 = {
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg"
  ]
};



async function createCar(carData) {
    try {
        const newCar = new Car(carData)
        await newCar.save()
    } catch (error) {
        console.log("Error adding the data", error)
    }
}

createCar(carData)
createCar(carData2)

async function readAllCars() {
    try {
        const cars = await Car.find()
        console.log(cars)
    } catch (error) {
        throw error
    }
}

readAllCars()

async function readCarsByBrand(carBrand) {
    try {
        const cars = await Car.find({brand: carBrand})
        console.log(cars)        
    } catch (error) {
        throw error
    }
}

readCarsByBrand("Ford")

async function readCarsByColor(carColor) {
    try {
        const cars = await Car.find({color: carColor})
        console.log(cars)        
    } catch (error) {
        throw error
    }
}

readCarsByColor("Black")

async function updateCarPrice(carModel, dataToUpdate) {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            {model: carModel},
            dataToUpdate,
            {new: true}
        )
        console.log(updatedCar)
    } catch (error) {
        throw error
    }
}
updateCarPrice("Corolla", {price: 2300000})

async function updateCarCondition(carModel, dataToUpdate) {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            {model: carModel},
            dataToUpdate,
            {new: true}
        )
        console.log(updatedCar)        
    } catch (error) {
        throw error
    }
}

updateCarCondition("Model S", {condition: "Used"})

async function deleteCar(carId) {
    try {
        const deletedCar = await Car.findByIdAndDelete(carId)
        console.log("Deleted car: ", deletedCar)        
    } catch (error) {
        throw error
    }
}

deleteCar("68aff7dc3441ddc260ecd063")

async function deleteCarByBodyStyle(carBodyStyle) {
    try {
        const deletedCar = await Car.findOneAndDelete({bodyStyle: carBodyStyle})
        console.log("Deleted car by its body style: ", deletedCar)        
    } catch (error) {
        throw error
    }
}

deleteCarByBodyStyle("Coupe")