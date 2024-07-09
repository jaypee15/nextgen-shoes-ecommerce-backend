const express = require("express");

const protect = require("../middlewares/protect");
const {
    addFavourite,
    getFavourites,
    removeFavourite,
} = require("../controllers/favourite");

const router = express.Router();

// Protect rpoutes
router.use(protect);

// favourite routes
router.post("/", addFavourite);
router.get("/", getFavourites);
router.delete("/:productId", removeFavourite);

module.exports = router;
