// Hayes Meekins

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true,
        min: 1
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
