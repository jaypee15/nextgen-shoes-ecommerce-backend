const QueryMethod = require("../utils/query");
const catchAsync = require("../utils/catch-async");
const Econsole = require("../utils/econsole-log");
const Product = require("../models/product")
const Review = require("../models/review")
const { getOne, updateOne, deleteOne } = require("./generic-controller");

exports.getReview = getOne(Review)
exports.getAllReviews = catchAsync(async (req, res) => {
  const myconsole = new Econsole("review-controller.js", "getAllReviews", "")
  myconsole.log("entry")
  const reviewsQuery = new QueryMethod(Review.find({productId:req.params.productId}), req.query) 
    .sort()
    .limit()
    .paginate()
    .filter();
  const reviews = await reviewsQuery.query;
  myconsole.log("exits")
  res.status(200).json({ status: "success", results: reviews.length, data: reviews, });
});

exports.editAReview = updateOne(Review)
exports.deleteAReview = deleteOne(Product)

exports.reviewProduct = catchAsync(async (req, res) => {
  const myconsole = new Econsole("review-controller.js", "reviewProduct", "")
  try {
    const productId = req.params.id;
    const userId = req.user.userId
    myconsole.log("productId=",productId," userId=",userId)
    req.body.userId = userId
    req.body.productId = productId;
    const review = new Review(req.body);

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

     // Save the review separately
    const savedReview = await review.save();

    // Associate the review with the product
    product.reviews.push(savedReview._id);
    await product.save();
    product = await Product.findById(productId).populate('reviews');
    myconsole.log("exits")
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});