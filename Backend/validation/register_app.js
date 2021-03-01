const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.instituteName = !isEmpty(data.instituteName) ? data.instituteName : "";
  data.startYear = !isEmpty(data.startYear) ? data.startYear : "";
  data.endYear = !isEmpty(data.endYear) ? data.endYear : "";
  // data.education = !isEmpty(data.education) ? data.education : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (!data.skills[0]) {
    errors.skills = "Skills field is required";
  }
  if (!data.instituteName[0]) {
    errors.education = "Institute Name field is required";
  }
  if (!data.startYear[0]) {
    errors.education = "Start Year field is required";
  }
  // else if(isNaN(data.startYear)){
  //   errors.education = "Start Year field must be a Number";
  // }

  // if(isNaN(data.endYear) && data.endYear !== null){
  //   errors.education = "End Year field must be a Number";
  // }
 

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 300 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};