const { connectDB } = require("./db/db.connect.js")
const Hotel = require("./models/hotel.models.js")

connectDB()

const newHotel = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
};

const newHotel2 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
};

async function createHotel(newHotel) {
    try {
        const hotel = Hotel(newHotel)
        hotel.save()        
    } catch (error) {
        throw error
    }
}

createHotel(newHotel)
createHotel(newHotel2)

async function readAllHotel() {
    try {
        const hotels = await Hotel.find()
        console.log(hotels)        
    } catch (error) {
        throw error
    }
}

readAllHotel()

async function readHotelByName(hotelName) {
    try {
        const hotel = await Hotel.findOne({name: hotelName})
        console.log(hotel)
    } catch (error) {
        throw error
    }
}
readHotelByName("Lake View")

async function readAllHotelsWithParking(isParkingAvailable) {
    try {
        const hotels = await Hotel.find({isParkingAvailable})
        console.log(hotels)        
    } catch (error) {
        throw error
    }
}
readAllHotelsWithParking(true)

async function readAllHotelsWithResturant(isRestaurantAvailable) {
    try {
        const hotels = await Hotel.find({isRestaurantAvailable})
        console.log(hotels)        
    } catch (error) {
        throw error
    }
}
readAllHotelsWithResturant(true)

async function readAllHotelsByCategory(category) {
    try {
        const hotels = await Hotel.find({category})
        console.log(hotels)        
    } catch (error) {
        throw error
    }
}
readAllHotelsByCategory("Mid-Range")

async function readAllHotelsByPriceRange(priceRange) {
    try {
        const hotels = await Hotel.find({priceRange})
        console.log(hotels)        
    } catch (error) {
        throw error
    }
}
readAllHotelsByPriceRange("$$$$ (61+)")

async function readAllHotelsByRating(rating) {
    try {
        const hotels = await Hotel.find({rating})
        console.log(hotels)
    } catch (error) {
        throw error
    }
}
readAllHotelsByRating(4.0)

async function readHotelByNumber(phoneNumber) {
    try {
        const hotel = await Hotel.findOne({phoneNumber})
        console.log(hotel)
    } catch (error) {
        throw error
    }
}
readHotelByNumber("+1299655890")

