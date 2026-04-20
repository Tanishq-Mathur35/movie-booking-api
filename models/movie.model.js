const mongoose = require('mongoose');


// Schema for storing movie details
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    casts: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED",
    },
    poster: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);


// Create model from schema
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
