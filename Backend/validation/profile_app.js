const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
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
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};