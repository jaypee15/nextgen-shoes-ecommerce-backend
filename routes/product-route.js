
const express = require("express");
const {createProduct,getAllProductsForSeller,
  sellerOwnsProduct,getProduct,updateProduct,
  deleteProduct,deleteProductImages} = require("../controllers/product-controller");
const {validateProduct}= require("../utils/joi-validators")
const {uploadImagesToTempLocation,uploadImagesToCloudinary}= require("../utils/file-upload")
const {protectSeller,sameSeller}=require("../controllers/seller-controller")




const router = express.Router();

router.post("/create-product/:id",protectSeller,sameSeller,uploadImagesToTempLocation,
uploadImagesToCloudinary,validateProduct,createProduct);//:id = seller
router.get("/products-seller/:id",protectSeller, sameSeller,getAllProductsForSeller);//:id = seller
router.route("/:id").
get(protectSeller, sellerOwnsProduct,getProduct).
patch(protectSeller, sellerOwnsProduct,uploadImagesToTempLocation,uploadImagesToCloudinary,validateProduct,updateProduct).
delete(protectSeller, sellerOwnsProduct, deleteProductImages,deleteProduct);//:id = product
module.exports = router;
