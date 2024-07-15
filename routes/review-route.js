
const express = require("express");
const {
  getReview,
  getAllReviews,
  editAReview,
  deleteAReview,
} = require("../controllers/review-controller");

const {validateReview}= require("../utils/joi-validators")
const protect = require("../middlewares/protect");


const router = express.Router();

router.get("/",getAllReviews);
router.route("/:id").
get(getReview).
patch(protect,validateReview,editAReview).
delete(protect,deleteAReview);//:id = product
module.exports = router;
