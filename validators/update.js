const Joi = require("joi");

const updateUserSchema = Joi.object({
  email: Joi.string().email().message("Please provide a valid email address"),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{11,15}$/)
    .message(
      "Phone number must be between 11 and 15 digits and contain only numbers"
    ),
  firstName: Joi.string()
    .max(10)
    .message("First name must not exceed 10 characters"),
  lastName: Joi.string()
    .max(10)
    .message("Last name must not exceed 10 characters"),
});

module.exports = updateUserSchema;
