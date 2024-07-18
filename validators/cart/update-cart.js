const Joi = require("joi");

// Joi schema for validation
const UpdateCartSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required(),
    color: Joi.string().required()
  });

  module.exports = UpdateCartSchema