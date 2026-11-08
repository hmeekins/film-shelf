const express = require("express");
const { 
    getPopular,
    getSearch
} = require("../controllers/tmdbController");

const router = express.Router();

router.get("/popular", getPopular);
router.get("/search", getSearch);

module.exports = router;