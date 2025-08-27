const { connectDB } = require("./db/db.connect.js")
const Resturant = require("./models/resturant.model.js")

connectDB()

const newRestaurant = {
  name: "Somi",
  cuisine: ["Greek"],
  location: "11 Main Road, Gem",
  rating: 4.3,
  reviews: [],
  website: "https://somi-example.com",
  phoneNumber: "+1234997390",
  openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: false,
  isDeliveryAvailable: true,
  menuUrl: "https://somi-example.com/menu",
  photos: ["https://example.com/somi-photo1.jpg", "https://example.com/somi-photo2.jpg"],
};

const newRestaurant2 = {
  name: "Yo China",
  cuisine: ["Chinese", "Italian"],
  location: "MG Road, Bangalore",
  rating: 3.9,
  reviews: [],
  website: "https://yo-example.com",
  phoneNumber: "+1288997392",
  openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://yo-example.com/menu",
  photos: ["https://example.com/yo-photo1.jpg", "https://example.com/yo-photo2.jpg", "https://example.com/yo-photo3.jpg"]
};
 
async function createResturant(newRestaurant) {
    try {
        const resturant = new Resturant(newRestaurant)
        resturant.save()        
    } catch (error) {
        throw error
    }
}

createResturant(newRestaurant)
createResturant(newRestaurant2)

async function readAllResturants() {
    try {
        const resturants = await Resturant.find()
        console.log(resturants)       
    } catch (error) {
        throw error
    }
}

readAllResturants()

async function readResturantByName(resturantName) {
    try {
        const resturant = await Resturant.findOne({name: resturantName})
        console.log(resturant)
    } catch (error) {
        throw error
    }
}

readResturantByName("New Resturant")

async function readAllResturantsWithOffers(isReservationNeeded) {
    try {
        const resturants = await Resturant.find({reservationsNeeded: isReservationNeeded})
        console.log(resturants)        
    } catch (error) {
        throw error
    }
}

readAllResturantsWithOffers(true)

async function resturantByPhoneNumber(resturantNumber) {
    try {
        const resturant = await Resturant.findOne({phoneNumber: resturantNumber})
        console.log(resturant)
    } catch (error) {
        throw error
    }
}

resturantByPhoneNumber("+1288997392")

async function readAllResturantsByCuisine(cuisine) {
    try {
        const resturant = await Resturant.find({cuisine}) 
        console.log(resturant) 
    } catch (error) {
        throw error
    }
}

readAllResturantsByCuisine("Italian")