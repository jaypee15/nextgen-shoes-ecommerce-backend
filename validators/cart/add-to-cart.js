const Joi = require("joi");

// Joi schema for validation
const addToCartSchema = Joi.object({
  productId: Joi.string().required(),
  qty: Joi.number().integer().min(1).required(),
  color: Joi.string(),
  size: Joi.number().integer(),
});

module.exports = addToCartSchema;
