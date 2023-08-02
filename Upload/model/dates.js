const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    format:"yyyy/mm/dd",
    required: true,
  },
  dateOfJoining: {
    type: Date,
    format:"yyyy/mm/dd",
    required: true,
  },
  favouriteColour: {
    type: String,
    required: true,
  },
  favouriteFood: {
    type: String,
    required: true,
  },
  placeOfInterest: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    require: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

// DB_URL = mongodb+srv://aditya:aditya@workoutapp.aec6ean.mongodb.net/?retryWrites=true&w=majority
// PORT = 4000
