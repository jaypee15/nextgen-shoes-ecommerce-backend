
const express = require("express");
const {
  protect
} = require("../controllers/generic-controller");
const {
  addANewProduct,
  retrieveAllProducts,
  retrieveProduct,
  updateProduct,
  removeProduct,
  removeProductImages
} = require("../controllers/product-controller");
const {validateProduct}= require("../utils/joi-validators")
const {uploadImagesToTempLocation,uploadImagesToCloudinary}= require("../utils/file-upload")
const User = require("../models/user");
const Product = require("../models/product");






const router = express.Router();

router.post("/",protect,uploadImagesToTempLocation,uploadImagesToCloudinary,validateProduct,addANewProduct);
router.get("/",retrieveAllProducts);
router.route("/:id").
get(retrieveProduct).
patch(protect(User),uploadImagesToTempLocation,uploadImagesToCloudinary,validateProduct,updateProduct).
delete(protect(User), removeProductImages,removeProduct);//:id = product
module.exports = router;
