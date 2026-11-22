// Hayes Meekins

const Review = require("../models/Review");
const Movie = require("../models/Movie");
const { validationResult } = require("express-validator");

async function getReviews(req, res, next) {
    try {
        const reviews = await Review.find().populate("movie", "tmdbId");
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
}

async function getReviewById(req, res, next) {
    try {
        const review = await Review.findById(req.params.id)
            .populate("movie", "tmdbId");

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}

async function getReviewData(req, res, next) {
    try {
        const tmdbId = Number(req.params.tmdbId);

        if (!Number.isSafeInteger(tmdbId) || tmdbId <= 0) {
            return res.status(400).json({ message: "Invalid TMDB movie ID" });
        }

        const movie = await Movie.findOne({ tmdbId });

        if (!movie) {
            return res.status(200).json({
                movieId: null,
                reviewSum: 0,
                reviewAmount: 0,
                averageRating: null,
                reviews: []
            });
        }

        const reviews = await Review.find({ movie: movie._id })
            .sort({ createdAt: -1 });

        const averageRating = movie.reviewAmount > 0
            ? movie.reviewSum / movie.reviewAmount
            : null;

        res.status(200).json({
            movieId: movie._id,
            reviewSum: movie.reviewSum,
            reviewAmount: movie.reviewAmount,
            averageRating,
            reviews
        });
    } catch (error) {
        next(error);
    }
}

async function createReview(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const movie = await Movie.findById(req.body.movie);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const review = await Review.create(req.body);

        await Movie.findByIdAndUpdate(movie._id, {
            $inc: { reviewSum: review.rating, reviewAmount: 1 }
        });

        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
}

async function updateReview(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        const ratingDifference = req.body.rating - review.rating;

        review.rating = req.body.rating;
        review.comment = req.body.comment;
        await review.save();

        if (ratingDifference !== 0) {
            await Movie.findByIdAndUpdate(review.movie, {
                $inc: { reviewSum: ratingDifference }
            });
        }

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
}

async function deleteReview(req, res, next) {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await Movie.findByIdAndUpdate(review.movie, {
            $inc: { reviewSum: -review.rating, reviewAmount: -1 }
        });

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getReviews,
    getReviewById,
    getReviewData,
    createReview,
    updateReview,
    deleteReview
};
