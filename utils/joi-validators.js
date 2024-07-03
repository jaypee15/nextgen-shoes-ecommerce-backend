const Joi = require('joi')
const catchAsync=require("../utils/catch-async")
const Econsole = require("../utils/econsole-log")

exports.validateProduct = catchAsync(async (req, res, next) => {
    /*
    id, name, description, price, discount_price, colors, sizes, images, delivery_info, return_info
    */
    const myconsole = new Econsole("joi-validators.js", "validateProduct", "")
    myconsole.log("entry")
    //myconsole.log(req)
    const { name, description, price, discount_price, colors, sizes, images, delivery_info, return_info } = req.body;
    console.log(name, description, price, discount_price, colors, sizes, images, delivery_info, return_info)
    const obj = { name, description, price, discount_price, colors, sizes, images, delivery_info, return_info }
    var expectedProductProperties = Joi.object({
        name: Joi.string().required().messages({
            "string.base": "name should be a type of text",
            "string.empty": "name is required",
            "string.min": "Password must be at least 8 characters",
            "any.required": "User must have a password",
          }),
        description: Joi.string().required(),
        price: Joi.number().required(),
        discount_price: Joi.number(),
        colors: Joi.array().items(Joi.string()).min(1).required(),
        sizes: Joi.array().items(Joi.number()).min(1).required(),
        images: Joi.array().items(Joi.string().uri().required()).min(1).required(),
        delivery_info: Joi.string().required(),
        return_info: Joi.string().required(),
    })
    const { error } = expectedProductProperties.validate(obj)
    if (error) { 
        myconsole.log(error.message);
        res.json({ errorMessage: error.message });
        return error.message; 
    } else { 
        myconsole.log("exits"), 
        next() 
    }
});
