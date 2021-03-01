const Validator = require("validator");


module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  
  data.numOfPositions = !isEmpty(data.numOfPositions) ? data.numOfPositions : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
  data.maxApp = !isEmpty(data.maxApp) ? data.maxApp : "";
  // Name checks
  

  if (Validator.isEmpty(data.numOfPositions)) {
    errors.numOfPositions = "No. of Positions field is required";
  }
  if (Validator.isEmpty(data.deadline)) {
    errors.deadline = "deadline field is required";
  }
  else if (new Date(data.deadline).getTime() < new Date(Date.now()).getTime()) {
    errors.deadline = "deadline should be set in future";
  }
  if (Validator.isEmpty(data.maxApp)) {
    errors.maxApp = "Max. Applications is required"
  }
  else if (data.numOfPositions > data.maxApp) {
    errors.maxApp = "Max. Applications must be more then No.of Positions"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};