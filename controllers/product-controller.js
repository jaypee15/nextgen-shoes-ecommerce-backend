const QueryMethod = require("../utils/query");
const catchAsync = require("../utils/catch-async");
const Econsole = require("../utils/econsole-log");
const Product = require("../models/product")
const { createOne, getOne, updateOne, deleteOne } = require("./generic-controller");
const { cloudDelete } = require("../utils/cloudinary")



exports.retrieveProduct = getOne(Product)
exports.addANewProduct=createOne(Product)
exports.retrieveAllProducts = catchAsync(async (req, res) => {
  const myconsole = new Econsole("product-controller.js", "retrieveAllProducts", "")
  myconsole.log("entry")
  const features = new QueryMethod(Product.find(), req.query)
    .sort()
    .limit()
    .paginate()
    .filter();
  const docs = await features.query;
  myconsole.log("exits")
  res.status(200).json({ status: "success", results: docs.length, data: docs, });
});
exports.updateProduct = updateOne(Product)
exports.removeProduct = deleteOne(Product)
exports.removeProductImages = catchAsync(async (req, res, next) => {
  const myconsole = new Econsole("product-controller.js", "removeProductImages", "")
  myconsole.log("entry")
  const product = await Product.findById(req.params.id);
  try {
    if (product.images) {
      product.images.forEach(async (imageFileURL, index) => {
        try {
          myconsole.log("imageFileURL", imageFileURL)
          await cloudDelete(imageFileURL);
        } catch (error) {
          myconsole.error(error);
        }
      });
    }
  } catch (error) {
    myconsole.error(error)
  }
  myconsole.log("exits")
  next()
});
