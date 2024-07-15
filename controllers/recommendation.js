const Recommendation = require("../models/recommendation");
const Product = require("../models/product");

// Add a recommendation
const addRecommendation = async (req, res) => {
  try {
    const { productId, recommendedProductId } = req.body;

    // Check if both products exist
    const product = await Product.findById(productId);
    const recommendedProduct = await Product.findById(recommendedProductId);

    if (!product || !recommendedProduct) {
      return res.status(404).json({ message: "Product(s) not found" });
    }

    // Create and save the recommendation
    const recommendation = new Recommendation({
      productId,
      recommendedProductId,
    });
    await recommendation.save();

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommendations for a given product
const getRecommendations = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find recommendations for the product
    const recommendations = await Recommendation.find({ productId }).populate(
      "recommendedProductId"
    );

    if (!recommendations) {
      return res.status(404).json({ message: "Recommendations not found" });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addRecommendation, getRecommendations };
