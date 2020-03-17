const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRommInput(data) {
  data.title = validText(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }
}