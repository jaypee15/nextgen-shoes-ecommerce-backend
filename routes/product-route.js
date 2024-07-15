
const express = require("express");
const {
  addANewProduct,
  retrieveAllProducts,
  retrieveProduct,
  updateProduct,
  removeProduct,
  removeProductImages,
  searchProducts
} = require("../controllers/product-controller");
const {
  reviewProduct
} = require("../controllers/review-controller");
const {validateProduct}= require("../utils/joi-validators")
const {uploadImagesToTempLocation,uploadImagesToCloudinary}= require("../utils/file-upload")
const protect = require("../middlewares/protect");


const router = express.Router();

router.post("/",protect,uploadImagesToTempLocation,uploadImagesToCloudinary,validateProduct,addANewProduct);
router.get("/",retrieveAllProducts).
get("/search",searchProducts);
router.route("/:id").
get(retrieveProduct).
patch(protect,uploadImagesToTempLocation,uploadImagesToCloudinary,validateProduct,updateProduct).
delete(protect, removeProductImages,removeProduct).
post(protect,reviewProduct);//:id = product
module.exports = router;
