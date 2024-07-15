const express = require("express");

const protect = require("../middlewares/protect");
const {
    addRecommendation, 
    getRecommendations 
} = require("../controllers/recommendation");

const router = express.Router();

// Protect rpoutes
router.use(protect);

// recommend routes
router.post("/", addRecommendation);
router.get("/", getRecommendations);


module.exports = router;
