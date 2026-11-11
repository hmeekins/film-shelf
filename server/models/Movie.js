// Hayes Meekins

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,
        default: null
    },
    reviewSum: {
        type: Number,
        default: 0,
        min: 0
    },
    reviewAmount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
