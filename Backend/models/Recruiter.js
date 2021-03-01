const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RecruiterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type:String
  },
  contactNumber: {
    type: Number,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
  }  
});

module.exports = Recruiter = mongoose.model("recruiters",RecruiterSchema);