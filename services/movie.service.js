const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');


const addMovie = async (data) => {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        } else {
            throw error;
        }
    }
}


const removeMovie = async (id) => {
    try {
        const response = await Movie.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: "No movie record found for the id provided",
                code: STATUS.NOT_FOUND
            }
        }
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const fetchMovieById = async (id) => {
    const movie = await Movie.findById(id);
    if (!movie) {
        throw {
            err: "No movie found for the corresponding id provided",
            code: STATUS.NOT_FOUND
        }
    };
    return movie;
}


const modifyMovie = async (id, data) => {
    try {
        const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return movie;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        } else {
            throw error;
        }
    }
}


const getAllMovies = async (filter) => {
    let query = {};
    if (filter.name) {
        query.name = filter.name;
    }
    let movies = await Movie.find(query);
    if (!movies) {
        throw {
            err: 'Not able to find the queries movies',
            code: STATUS.NOT_FOUND
        }
    }
    return movies;
}


module.exports = {
    addMovie,
    removeMovie,
    fetchMovieById,
    modifyMovie,
    getAllMovies
}
