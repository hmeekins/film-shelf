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

    genres: {
        type: [String],
        required: true,
        validate: {
            validator: genres => genres.length > 0,
        }
    },

    description: {
        type: String,
        default: ""
    },

    tmdbId: {
        type: Number,
        required: true,
        unique: true
    },

    posterPath: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);