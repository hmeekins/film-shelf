const express = require("express");
const { 
    getMovie,
    getPopular,
    getSearch
} = require("../controllers/tmdbController.js");

const router = express.Router();

router.get("/movie/:tmdbId", getMovie);
router.get("/popular", getPopular);
router.get("/search", getSearch);

module.exports = router;