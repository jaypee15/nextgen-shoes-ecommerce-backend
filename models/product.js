const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Provide a product name"] },
    description: {
      type: String,
      required: [true, "provide a product description"],
    },
    price: { type: Number, required: [true, "provide a product price"] },
    discountRate: {
      type: Number,
      validate: {
        validator: function (v) {
          return v <= 100;
        },
        message: "Discount rate must be less than or equal to 100",
      },
    },

    quantity: {
      type: Number,
      required: [true, "provide a quantity"],
      validate: {
        validator: Number.isInteger,
      },
      message: "Quantity must be a whole number",
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    colors: [String],
    sizes: [String],
    images: {
      type: [String],
      required: [true, "provide atleast one image"],
    },

    deliveryInfo: { type: String },
    returnInfo: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
