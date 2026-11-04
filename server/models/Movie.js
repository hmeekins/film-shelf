// Hayes Meekins

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    releaseYear: {
        type: Number,
        required: true,
        min: 1888
    },

    genre: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    tmdbId: {
        type: Number,
        unique: true,
        sparse: true
    },

    posterPath: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);