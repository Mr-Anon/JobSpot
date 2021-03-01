const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const passport = require("passport");
const users_appli = require("./routes/api/applicant");
const users_recru = require("./routes/api/recruiter");
const login = require("./routes/api/login");
const application = require("./routes/api/application")



const app =express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
      extended: false
  })
);

app.use(bodyParser.json());



app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());


const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/applicant", users_appli);
app.use("/api/recruiter", users_recru);
app.use("/api/login", login);
app.use("/api/application",application);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));


