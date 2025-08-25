const mongoose = require("mongoose")

const employeeCardSchema = new mongoose.Schema({
    name: String,
    designation: String,
    profileUrl: String,
    empId: String,
    dateOfBirth: Date,
    mail: String,
    phone: String,
    address: String
})

const EmployeeCard = mongoose.model("employeeCard", employeeCardSchema)
module.exports = EmployeeCard