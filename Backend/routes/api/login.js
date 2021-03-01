const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");// Load input validation
const validateLoginInput = require("../../validation/login");// Load User model
const User = require("../../models/Applicant");
const User2 = require("../../models/Recruiter");


router.post("/", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } const email = req.body.email;
  const password = req.body.password;// Find user by email
  await User.findOne({ email })
    .then(user => {
      // Check if user exists
      console.log(user);
      if (!user)
      {
        User2.findOne({ email }).then(user => {
          // Check if user exists
          if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
          }// Check password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                type: "rec",
                contactNumber: user.contactNumber,
                bio: user.bio,
                rating: user.rating
              };// Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    type: "rec",
                    token: "Bearer " + token
                  });
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
          });
        });
      }
      else {
        console.log("hello ayush fuck boi")
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            console.log("matched");
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
              type: "app",
              skills: user.skills,
              instituteName: user.instituteName,
              startYear: user.startYear,
              endYear: user.endYear,
              rating: user.rating
            };// Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926 // 1 year in seconds
              },
              (err, token) => {
                console.log("return mein");
                return res.status(200).json({
                  success: true,
                  type: 'app',
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      }
    })
 
});



module.exports = router;


module.exports = router;