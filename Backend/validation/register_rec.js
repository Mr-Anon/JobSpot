const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
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
  if (Validator.isEmpty(data.contactNumber)) {
    errors.contactNumber = "Contact Number field is required";
  } else if (isNaN(data.contactNumber)) {
    errors.contactNumber = 'Contact number must be a number'
  }
  if (typeof (data.contactNumber) === "number") {
    data.contactNumber = data.contactNumber.toString();
  }
  if (!Validator.isLength(data.contactNumber, { min: 10, max: 10 })) {
    errors.contactNumber = "Contact Number must be 10 digits";
  } else if (!Number.isInteger(Number(data.contactNumber))) {
    errors.contactNumber = "Contact number must be a integer"
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (data.bio.split(" ").length > 250) {
    errors.bio = "Bio must be less then 250 words";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};