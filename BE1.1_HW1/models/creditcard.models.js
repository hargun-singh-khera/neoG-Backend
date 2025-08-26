const mongoose = require("mongoose")

const creditCardSchema = new mongoose.Schema({
    cardNumber: String,
    cardHolderName: String,
    expiryDate: String,
})

const CreditCard = mongoose.model("CreditCard", creditCardSchema)
module.exports = CreditCard