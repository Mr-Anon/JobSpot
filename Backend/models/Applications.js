const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    jobId:
    {
        type: String
    },
    recId:
    {
        type: String
    },
    appId:
    {
        type: String
    },
    sop:
    {
        type: String
    },
    status:
    {
        type: String,
        default: 'Applied'
    },
    dateOfApplication:
    {
        type: Date,
        default: Date.now()
    },
    joinDate:
    {
        type: Date
    },
    name: {
        type: String
    },
    skills: {
        type: [String]
    },
    instituteName: {
        type: [String],
    },
    startYear: {
        type: [Number],
    },
    endYear: {
        type: [Number],

    },
    rating: {
        type: Number,
    },
    nextStatus:{
        type: String,
    },
    jobName:{
        type: String,
    },
    type:{
        type: String,
    },
    recRate:{
        type: Boolean,
        default: false
    },
    appRate:{
        type: Boolean,
        default: false
    },
    appemail:{
        type:String,
    }

});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;