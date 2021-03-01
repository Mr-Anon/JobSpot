const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const cors = require('cors')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");// Load input validation
const validateRegisterInput = require("../../validation/register_app");
const validateLoginInput = require("../../validation/login");// Load User model
const User = require("../../models/Applicant");
const User2 = require("../../models/Recruiter");
const Jobs = require("../../models/Jobs")
const validateAppProfileInput = require("../../validation/profile_app")
const nodemailer = require('nodemailer');

router.post('/uploadImg/:email', (req, res) => {    if (!req.files) {
  return res.status(500).send({ msg: "file is not found" })
}
  // accessing the file
const myFile = req.files.image;    //  mv() method places the file inside public directory
myFile.mv(`${__dirname}/../../public/pp/${req.params.email}.jpeg`, function (err) {
  if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
  }
  // returing the response with file path and name
  return res.send({name: myFile.name, path: `/${myFile.name}`});
});
})
router.post('/downloadImg/:email', (req, res) => {    if (!req.files) {
  return res.status(500).send({ msg: "file is not found" })
}
  // accessing the file
const myFile = req.files.image;    //  mv() method places the file inside public directory
myFile.mv(`${__dirname}/../../public/pp/${req.params.email}.jpeg`, function (err) {
  if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
  }
  // returing the response with file path and name
  return res.send({name: myFile.name, path: `/${myFile.name}`});
});
})

router.post('/uploadResume/:email', (req, res) => {    if (!req.files) {
  return res.status(500).send({ msg: "file is not found" })
}
  // accessing the file
const myFile = req.files.resume;    //  mv() method places the file inside public directory
myFile.mv(`${__dirname}/../../public/resume/${req.params.email}.pdf`, function (err) {
  if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
  }
  // returing the response with file path and name
  return res.send({name: myFile.name, path: `/${myFile.name}`});
});
})

router.post('/downloadResume/:email', (req, res) => {    if (!req.files) {
  return res.status(500).send({ msg: "file is not found" })
}
  // accessing the file
const myFile = req.files.resume;    //  mv() method places the file inside public directory
myFile.mv(`${__dirname}/../../public/resume/${req.params.email}.pdf`, function (err) {
  if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
  }
  // returing the response with file path and name
  return res.send({name: myFile.name, path: `/${myFile.name}`});
});
})

// @route POST api/applicant/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body)
  User2.findOne({ email: req.body.email }).then(user2 => {
    if (user2) {
      console.log("hello")
      return res.status(400).json({ email: " RecEmail already exists" });
    }
    else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            skills: req.body.skills,
            instituteName: req.body.instituteName,
            startYear: req.body.startYear,
            endYear: req.body.endYear,
            rating: req.body.rating,
            noOfRating: req.body.noOfRating,
            totalRating: req.body.totalRating
            // education: req.body.education


          });

          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user =>{ res.json(user)
                  

                 
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

});


// to get jobs
//route @api/applicant/getjobs
router.post("/getjobs", (req, res) => {
  Jobs.find({
    deadline: { "$gte": Date.now() }
  }).then(jobs => {
    res.json(jobs);
  });
});

// to get jobs
//route @api/applicant/getjobs
router.post("/getjob", (req, res) => {
  const jobId = req.body.jobId
  Jobs.find({_id:jobId}).then(jobs => {
    res.json(jobs);
  });
});

router.post("/getprofile", (req, res) => {
  const appid = req.body.appId;
  User.find({ _id: appid }).then(user => {
    //   let returnedJobs = [];

    // for (let i = 0; i < jobs.length; i++) {
    //   returnedJobs.push(jobs[i].transform());
    // }
    res.json(user);
  });
});
router.post("/sendmail", (req, res) => {
  const appName = req.body.appName;
  const jobName = req.body.jobName;
  const recName = req.body.recName;
  const appemail = req.body.appemail;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jobspot.dass@gmail.com',
      pass: 'jobspot0000'
    }
  });
  
  var mailOptions = {
    from: 'jobspot.dass@gmail.com',
    to: appemail,
    subject: 'Congrats '+String(appName),
    text: 'You are accepted in ' +String(jobName) +' by '+String(recName)
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
 
});

router.post("/getjobwithid", (req, res) => {
  const id = req.body.jobId;
  Jobs.find({ _id: id }).then(job => {
    //   let returnedJobs = [];

    // for (let i = 0; i < jobs.length; i++) {
    //   returnedJobs.push(jobs[i].transform());
    // }
    res.json(job);
  });
});

router.post("/updateprofile", (req, res) => {
  console.log("hi")
  const { errors, isValid } = validateAppProfileInput(req.body);
  console.log("hi")
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const id = req.body.appId;
  User.find({ _id: id }).then(
    user => {
      if (user) {
        ;
      }
      console.log(user)
      console.log(req.body)


      User.updateOne({ _id: id }, { $set: { name: req.body.name, skills: req.body.skills ,instituteName: req.body.instituteName,startYear:req.body.startYear,endYear:req.body.endYear} })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/updatejobrating", (req, res) => {

  const id = req.body.jobId;
  Jobs.find({ _id: id }).then(
    job => {
      console.log(job)

      Jobs.updateOne({ _id: id }, { $set: { noOfRating: req.body.noOfRating, rating: req.body.rating, totalRating: req.body.totalRating } })
        .then(() => res.json('Rating updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/updateapprating", (req, res) => {

  const id = req.body.appId;
  User.find({ _id: id }).then(
    job => {
      console.log(job)

      User.updateOne({ _id: id }, { $set: { noOfRating: req.body.noOfRating, rating: req.body.rating, totalRating: req.body.totalRating } })
        .then(() => res.json('Rating updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;