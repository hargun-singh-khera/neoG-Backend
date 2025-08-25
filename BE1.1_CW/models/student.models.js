const mongoose = require("mongoose")

const studentSchema= new mongoose.Schema({
    studentId: String,
    studentRegistrationNumber: String,
    studentName: String,
    fatherGuardianName: String,
    class: String,
    emergencyContact: Number,
    studentProfileImageUrl: String
})

const Student = mongoose.model("Student", studentSchema)
module.exports = Student