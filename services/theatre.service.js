const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');
const { STATUS } = require('../utils/constants');


const addTheatre = async (data) => {
    try {
        const response = await Theatre.create(data);
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY };
        }
        console.log(error);
        throw err;
    }
}


const removeTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id);
        if (!response) {
            throw {
                err: "No record of a theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const fetchTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const fetchAllTheatres = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if (data && data.city) {
            query.city = data.city;
        }
        if (data && data.pincode) {
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            query.name = data.name;
        }
        if (data && data.movieId) {
            query.movies = { $all: data.movieId };
        }
        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip * perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const modifyTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true, runValidators: true
        });
        if (!response) {
            throw {
                err: "No theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS.UNPROCESSABLE_ENTITY }
        }
        throw error;
    }
}


const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        let theatre;
        if (insert) {
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $addToSet: { movies: { $each: movieIds } } },
                { new: true }
            );
        } else {
            theatre = await Theatre.findByIdAndUpdate(
                { _id: theatreId },
                { $pull: { movies: { $in: movieIds } } },
                { new: true }
            );
        }
        return theatre.populate('movies');
    } catch (error) {
        if (error.name == 'TypeError') {
            throw {
                code: STATUS.NOT_FOUND,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}


const getMoviesInATheatre = async (id) => {
    try {
        const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 }).populate('movies');
        if (!theatre) {
            throw {
                err: 'No theatre with the given id found',
                code: STATUS.NOT_FOUND
            }
        }
        return theatre;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        let response = await Theatre.findById(theatreId);
        if (!response) {
            throw {
                err: "No such theatre found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    addTheatre,
    removeTheatre,
    fetchTheatre,
    fetchAllTheatres,
    modifyTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre,
    checkMovieInATheatre
}
