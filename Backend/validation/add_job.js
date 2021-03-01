const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.jobName = !isEmpty(data.jobName) ? data.jobName : "";
  data.skillReq = !isEmpty(data.skillReq) ? data.skillReq : "";
  data.salary = !isEmpty(data.salary) ? data.salary : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.numOfPositions = !isEmpty(data.numOfPositions) ? data.numOfPositions : "";
  data.deadline = !isEmpty(data.deadline) ? data.deadline : "";
  data.maxApp = !isEmpty(data.maxApp) ? data.maxApp : "";
  // Name checks
  if (Validator.isEmpty(data.jobName)) {
    errors.jobName = "JobName field is required";
  }
  if (Validator.isEmpty(data.skillReq)) {
    errors.skillReq = "Skill's Required field is required";
  }
  if (Validator.isEmpty(data.salary)) {
    errors.salary = "Salary field is required";
  } else if(isNaN(data.salary)){
    errors.salary = "Salary field must be a number";
  } else if(data.salary < 0){
    errors.salary = "Salary field must be a positive number";

  }
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  } else if( data.duration < 0 || data.duration > 6){
    errors.duration = "Duration must be between 0 to 6";
  } else if(isNaN(data.duration)){
    errors.duration = "Duration field must be a number";
  } else if(!Number.isInteger(Number(data.duration))){
    errors.duration = "Duration must be a integer"
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = "Type field is required";
  }

  if (Validator.isEmpty(data.numOfPositions)) {
    errors.numOfPositions = "No. of Positions field is required";
  }else if(!Number.isInteger(Number(data.numOfPositions))){
    errors.numOfPositions = "No. of Positions must be a integer"
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
  else if (Number(data.numOfPositions) > Number(data.maxApp)) {
    errors.maxApp = "Max. Applications must be more then No.of Positions"
  } else if(!Number.isInteger(Number(data.maxApp))){
    errors.maxApp = "Max. Applications must be a integer"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};