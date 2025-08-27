const { connectDB } = require("./db/db.connect.js")
const Resturant = require("./models/resturant.model.js")

connectDB()

const newRestaurant = {
  name: "Cha Cha",
  cuisine: ["Spanish"],
  location: "123 Main Street, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://example.com",
  phoneNumber: "+1234567890",
  openHours: "Mon-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: true,
  isDeliveryAvailable: true,
  menuUrl: "https://example.com/menu",
  photos: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"],
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
