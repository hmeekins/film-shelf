// Hayes Meekins

const express = require("express");
const router = express.Router();

const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../controllers/movieController");

const { body } = require("express-validator");

const validateMovie = [
    body("tmdbId").isInt({ min: 1 })
];

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", validateMovie, createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;