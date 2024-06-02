// Import Mongoose
const mongoose = require("mongoose");

// Define the employee schema
const batchCodeSchema = new mongoose.Schema({
  batchCode: String,
  batchDescription: String,
  departmentAddress: String,
  trainingMode: String,
  venueOfTraining: String,
  courseName: String,
  technologyName: String,
  revenueOfBatch: String,
  courseDuration: {
    value: Number,
    format: String // Store the format of course duration (e.g., days, months, weeks)
  },
  startDate: Date,
  endDate: Date,
  participantsNo: Number,
  remarks: String

});




// Create a Mongoose model from the schema
const Batch = mongoose.model("batchCodeData", batchCodeSchema);



// Define the employee schema
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
 
  batchCode: String,

  rollNumber: String,
  certificateNumber: String,
  designation: String,
  employeeId: String,
  

  phoneNumber: Number,
  email: String,
  remarks: String,
});

// Create a Mongoose model from the schema
const Employee = mongoose.model("Employee", employeeSchema);


// Export the model
module.exports = {Batch,Employee};
