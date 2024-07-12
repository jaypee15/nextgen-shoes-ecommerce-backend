const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
