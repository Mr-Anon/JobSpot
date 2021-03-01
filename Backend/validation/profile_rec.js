const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (isNaN(data.contactNumber)) {
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

  if (data.bio.split(" ").length > 250) {
    errors.bio = "Bio must be less then 250 words";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};