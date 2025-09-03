const express = require("express")
const app = express()

const { connectDB } = require("./db/db.connect.js")
const Hotel = require("./models/hotel.models.js")

connectDB()
app.use(express.json())
const port = process.env.PORT || 8000

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function readAllHotel() {
    try {
        const hotels = await Hotel.find()
        return hotels        
    } catch (error) {
        throw error
    }
}

app.get("/hotels", async (req, res) => {
    try {
        const hotels = await readAllHotel()
        if(hotels.length > 0) {
            res.status(200).json(hotels)
        }
        else {
            res.status(404).json({error: "No hotels found,"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})

async function readHotelByName(hotelName) {
    try {
        const hotel = await Hotel.findOne({name: hotelName})
        return hotel
    } catch (error) {
        throw error
    }
}

app.get("/hotels/:hotelName", async (req, res) => {
    try {
        const hotel = await readHotelByName(req.params.hotelName)
        if(hotel) {
            res.status(200).json(hotel)
        }
        else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel."})
    }
})

async function readHotelByNumber(phoneNumber) {
    try {
        const hotel = await Hotel.findOne({phoneNumber})
        return hotel
    } catch (error) {
        throw error
    }
}


app.get("/hotels/directory/:phoneNumber", async (req, res) => {
    try {
        const hotel = await readHotelByNumber(req.params.phoneNumber)
        if(hotel) {
            res.status(200).json(hotel)
        }
        else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotel."})
    }
})

async function readAllHotelsByRating(rating) {
    try {
        const hotels = await Hotel.find({rating})
        return hotels
    } catch (error) {
        throw error
    }
}

app.get("/hotels/rating/:hotelRating", async (req, res) => {
    try {
        const hotels = await readAllHotelsByRating(req.params.hotelRating)
        if(hotels.length > 0) {
            res.status(200).json(hotels)
        }
        else {
            res.status(404).json({error: "No hotels found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})

async function readAllHotelsByCategory(category) {
    try {
        const hotels = await Hotel.find({category})
        return hotels        
    } catch (error) {
        throw error
    }
}

app.get("/hotels/category/:hotelCategory", async (req, res) => {
    try {
        const hotels = await readAllHotelsByCategory(req.params.hotelCategory)
        if(hotels.length > 0) {
            res.status(200).json(hotels)
        }
        else {
            res.status(404).json({error: "No hotels found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})


// BE4.2_HW2

async function createHotel(newHotel) {
    try {
        const hotel = new Hotel(newHotel)
        return await hotel.save()        
    } catch (error) {
        throw error
    }
}

app.post("/hotels", async (req, res) => {
    try {
        const newHotel = await createHotel(req.body)
        res.status(201).json({message: "Hotel added successfully", hotel: newHotel}) 
    } catch (error) {
        res.status(500).json({error: "Failed to add hotel."})
    }
})

// BE4.3_HW2
async function deleteHotel(hotelId) {
    try {
        await Hotel.findByIdAndDelete(hotelId)
    } catch (error) {
        throw error
    }
}

app.delete("/hotels/:hotelId", async (req, res) => {
    try {
        await deleteHotel(req.params.hotelId)
        res.status(200).json({message: "Hotel deleted successfully."})
    } catch (error) {
        res.status(500).json({error: "Failed to delete hotel."})
    }
})


// BE4.4_HW2
async function updateHotel(hotelId, dataToUpdate) {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            hotelId,
            dataToUpdate,
            {new: true}
        )
        return updatedHotel        
    } catch (error) {
        throw error
    }
}

app.post("/hotels/rating/:hotelId", async (req, res) => {
    try {
        const updatedHotel = await updateHotel(req.params.hotelId, req.body)
        if(updatedHotel) {
            res.status(200).json({message: "Hotel rating updatd successfully", hotel: updatedHotel})
        }
        else {
            res.status(404).json({error: "Hotel not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update hotel rating."})
    }
})
 
app.listen(port, () => {
    console.log("Server is running at port:", port)
})