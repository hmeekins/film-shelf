// Hayes Meekins

const express = require("express");
const router = express.Router();

const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require("../controllers/movieController");

const { body } = require("express-validator");

const validateMovie = [
    body("title").isString().trim().notEmpty().isLength({ max: 200 }),
    body("releaseYear").isInt({ min: 1888 }),
    body("genre").isString().trim().notEmpty(),
    body("description").optional().isString(),
    body("tmdbId").optional().isInt({ min: 1 }),
    body("posterPath").optional().isString()
];

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", validateMovie, createMovie);
router.put("/:id", validateMovie, updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;