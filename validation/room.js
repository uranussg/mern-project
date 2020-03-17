const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRoomInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';

  if (!Validator.isLength(data.title, { min: 2, max: 140 })) {
    errors.title = 'Title must be between 2 and 140 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}