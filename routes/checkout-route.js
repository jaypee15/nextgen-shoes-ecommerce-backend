const express = require('express');
const protect = require("../middlewares/protect");
const {
  processCart,
  processOrder,
}=require("../controllers/checkout-controller")
const {
  verifyPayment
}=require("../utils/payment")
const router = express.Router();

router.post('/', protect,processCart);
router.get("/:userId",protect,verifyPayment,processOrder);

module.exports = router;