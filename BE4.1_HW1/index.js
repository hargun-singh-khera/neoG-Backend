const express = require("express")
const app = express()

const { connectDB } = require("./db/db.connect.js")
const Resturant = require("./models/resturant.model.js")

connectDB()
app.use(express.json())

const port = process.env.PORT || 8000

async function readAllResturants() {
    try {
        const resturants = await Resturant.find()
        return resturants       
    } catch (error) {
        throw error
    }
}

app.get("/", async (req, res) => {
    try {
        const resturants = await readAllResturants()
        if(resturants.length > 0) {
            res.status(200).json(resturants)
        }
        else {
            res.status(404).json({error: "No resturants found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch resturants."})
    }
})


async function readResturantByName(resturantName) {
    try {
        const resturant = await Resturant.findOne({name: resturantName})
        return resturant
    } catch (error) {
        throw error
    }
}

app.get("/restaurants/:restaurantName", async (req, res) => {
    try {
        const resturant = await readResturantByName(req.params.restaurantName)
        if(resturant) {
            res.status(200).json(resturant)
        }
        else {
            res.status(404).json({error: "Resturant not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch resturant."})
    }
})


async function resturantByPhoneNumber(resturantNumber) {
    try {
        const resturant = await Resturant.findOne({phoneNumber: resturantNumber})
        return resturant
    } catch (error) {
        throw error
    }
}


app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
    try {
        const resturant = await resturantByPhoneNumber(req.params.phoneNumber)
        if(resturant) {
            res.status(200).json(resturant)
        }
        else {
            res.status(404).json({error: "Resturant not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch resturant."})
    }
})


async function readAllResturantsByCuisine(cuisine) {
    try {
        const resturant = await Resturant.find({cuisine}) 
        return resturant 
    } catch (error) {
        throw error
    }
}

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
    try {
        const restaurants = await readAllResturantsByCuisine(req.params.cuisineName)
        if(restaurants.length > 0) {
            res.status(200).json(restaurants)
        }
        else {
            res.status(404).json({error: "No resturants found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch resturants."})
    }
})


async function readResturantsByLocation(resturantLocation) {
    try {
        const restaurants = await Resturant.find({location: resturantLocation})
        return restaurants
    } catch (error) {
        throw error        
    }
}

app.get("/restaurants/location/:resturantLocation", async (req, res) => {
    try {
        const restaurants = await readResturantsByLocation(req.params.resturantLocation)
        if(restaurants.length > 0) {
            res.status(200).json(restaurants)
        }
        else {
            res.status(404).json({error: "No resturants found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch resturants."})
    }
})


// BE4.2_HW1
async function createResturant(newRestaurant) {
    try {
        const resturant = new Resturant(newRestaurant)
        return await resturant.save()        
    } catch (error) {
        console.log(error)
        throw error
    }
}

app.post("/restaurants", async (req, res) => {
    try {
        const newRestaurant = await createResturant(req.body)
        console.log(newRestaurant)
        res.status(201).json({message: "Restaurant added successfully", restaurant: newRestaurant})
    } catch (error) {
        res.status(500).json({error: "Failed to add restaurant."})
    }
})

// BE4.3_HW1
async function deleteResturant(resturantId) {
    try {
        return await Resturant.findByIdAndDelete(resturantId)        
    } catch (error) {
        throw error
    }
}

app.delete("/restaurants/:restaurantId", async (req, res) => {
    try {
        await deleteResturant(req.params.restaurantId)
        res.status(200).json({message: "Restaurant deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete restaurant."})
    }
})

// BE4.4_HW2

async function updateRestaurantCuisine(restaurantId, dataToUpdate) {
    try {
        const updatedRestaurant = await Resturant.findByIdAndUpdate(
            restaurantId, 
            dataToUpdate, 
            {new: true}
        )    
        return updatedRestaurant    
    } catch (error) {
        throw error
    }
}

app.post("/restaurants/cuisine/:restaurantId", async (req, res) => {
    try {
        const updatedRestaurant = await updateRestaurantCuisine(req.params.restaurantId, req.body)
        if(updatedRestaurant) {
            res.status(200).json({message: "Cuisine updated successfully", restuarant: updatedRestaurant})
        }
        else {
            res.status(404).json({error: "No restaurant found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update cuisine."})
    }
})

app.listen(port, () => {
    console.log("Server is running at port:", port)
})