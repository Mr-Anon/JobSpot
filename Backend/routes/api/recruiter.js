const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");// Load input validation
const validateRegisterInput = require("../../validation/register_rec");
const validateAddJobInput = require("../../validation/add_job");
const validateEditJob = require("../../validation/edit_job");
const validateLoginInput = require("../../validation/login");// Load User model
const validateProfileInput = require("../../validation/profile_rec")
const User = require("../../models/Recruiter");
const User2 = require("../../models/Applicant");
const job = require("../../models/Jobs");
const Jobs = require("../../models/Jobs");
const Application = require("../../models/Applications")


// @route POST api/recruiter/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User2.findOne({ email: req.body.email }).then(user2 => {
    if (user2) {
      return res.status(400).json({ email: "appEmail already exists" });
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio,
            contactNumber: req.body.contactNumber

          });

          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

});


// @route POST api/users/addJob
// @desc Login user and return JWT token
// @access Public
router.post("/addjob", (req, res) => {
  const { errors, isValid } = validateAddJobInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newJob = new job({
    jobName: req.body.jobName,
    skillReq: req.body.skillReq,
    recId: req.body.recId,
    recName: req.body.recName,
    salary: req.body.salary,
    type: req.body.type,
    duration: req.body.duration,
    deadline: req.body.deadline,
    numOfPositions: req.body.numOfPositions,
    maxApp: req.body.maxApp,
    rating: req.body.rating,
    status: req.body.status,
    color: req.body.color,
    numberOfApp: req.body.numberOfApp,
    noOfRating: req.body.noOfRating,
    totalRating: req.body.totalRating,
    noOfAccepted: req.body.noOfAccepted

  });



  newJob
    .save()
    .then(job => res.json(job))
    .catch(err => console.log(err));


});

// to get jobs
//route @api/applicant/getjobs
router.post("/getjobs", (req, res) => {
  const recid = req.body.recId;
  job.find({ recId: recid }).then(jobs => {
    //   let returnedJobs = [];

    // for (let i = 0; i < jobs.length; i++) {
    //   returnedJobs.push(jobs[i].transform());
    // }
    res.json(jobs);
  });
});

// to get jobs
//route @api/applicant/getjobs
router.post("/getprofile", (req, res) => {
  const recid = req.body.recId;
  User.find({ _id: recid }).then(user => {

    res.json(user);
  });
});

// to get jobs
//route @api/applicant/getjobs
router.post("/updateprofile", (req, res) => {
  console.log("hi")
  const { errors, isValid } = validateProfileInput(req.body);
  console.log("hi")
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const id = req.body.recId;
  User.find({ _id: id }).then(
    user => {
      if (user) {
        ;
      }
      console.log(user)
      console.log(req.body)


      User.updateOne({ _id: id }, { $set: { name: req.body.name, bio: req.body.bio, contactNumber: req.body.contactNumber } })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/deletejob", (req, res) => {
  const id = req.body.jobId;
  jobs.find({ _id: id }).then(job => {

    console.log(job)
    Jobs.deleteMany({ _id: id })
      .then(() => res.json('Job delete'))
  });
});

router.post("/deleteapplication", (req, res) => {
  const id = req.body.jobId;

  Application.find({ jobId: id }).then(job => {

    console.log(job)
    Application.deleteMany({ jobId: id })
      .then(() => res.json('Application delete'))
  });
});

router.post("/editjob", (req, res) => {
  // const { errors, isValid } = validateEditJob(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const id = req.body.jobId;
  jobs.find({ _id: id }).then(job => {

    console.log(job)
    Jobs.updateOne({ _id: id }, { $set: { deadline: req.body.deadline, maxApp: req.body.maxApp, numOfPositions: req.body.numOfPositions } })
    .then(() => res.json('Jobs updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
});

module.exports = router;