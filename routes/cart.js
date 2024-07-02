const express = require("express");

const protect = require("../middlewares/protect");
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cart");

const router = express.Router();

// Protect rpoutes
router.use(protect);

// cart routes
router.post("/", addToCart);
router.get("/", getCart);
router.patch("/:productId", updateCart);
router.delete("/:productId", removeFromCart);

module.exports = router;
