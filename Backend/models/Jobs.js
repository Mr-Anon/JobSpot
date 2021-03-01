const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobsSchema = new Schema({
 
  jobName: {
    type: String,
    required: true
  },
  skillReq: {
    type: String,
    required: true
  },
  recId: {
    type: String,
    required: true
  },
  recName:{
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  // appliApp: [{
  //   appEmail:String,
  //   status: String
  // }],
  salary:{
    type: Number,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  duration:{
    type: Number,
    required: true
  },
  numOfPositions:{
    type:Number,
    required:true
  },
  deadline:{
    type: Date,
    required: true
  },
  maxApp:{
    type: Number,
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
  status:{
    type: String
  },
  numberOfApp:{
    type: Number
  },
  color:{
    String: String
  },
  noOfAccepted:{
    type: Number,
    default: 0
  } 

});
JobsSchema.method('transform', function() {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = jobs = mongoose.model("jobs",JobsSchema);