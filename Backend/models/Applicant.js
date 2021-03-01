const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantsSchema = new Schema({
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
  joinDate: {
    type: Date,
    default: Date.now
  },
  // education: [{
  //   instituteName:{ type: String , required: true},
  //   startYear: { 
  //     type: Number,
  //     required: true},
  //   endYear: {type: Number, required: false}
  // }],
  instituteName: {
     type: [String],
      required: true 
    },
  startYear: {
    type: [Number],
    required: true
  },
  endYear: { 
    type: [Number], 
    required: false 
  },
  img:
  {
    data: Buffer,
    contentType: String
  },
  skills: {
    type: [String],
    required: true
  },
  rating:{
    type: Number
  },
  noOfRating:{
    type: Number
  },
  totalRating:{
    type: Number
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Applicant = mongoose.model("applicant", ApplicantsSchema);
