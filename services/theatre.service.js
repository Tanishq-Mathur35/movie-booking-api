const Theatre = require("../models/theatre.model")


const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data)
        return response
    }
    catch (error) {
        if (error.name === "ValidationError") {
            let err = {}
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })

            return { err: err, code: 422 }
        }
        console.log(error)
        throw error
    }
}


const deleteTheatre = async (id) => {
    try {
        const response = await Theatre.findByIdAndDelete(id)
        if (!response) {
            return {
                err: "No theatre found for the corresponding id provided",
                code: 404
            }
        }

        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id)
        if (!response) {
            return {
                err: "No theatre found for the corresponding id provided",
                code: 404
            }
        }
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const getAllTheatre = async (data) => {
    try {
        let query = {}
        let pagination = {}

        if (data && data.city) {
            query.city = data.city
        }
        if (data && data.pincode) {
            query.pincode = data.pincode
        }
        if (data && data.name) {
            query.name = data.name
        }

        if (data && data.movieId) {
            query.movies = { $all: data.movieId }
        }

        if (data && data.limit) {
            pagination.limit = data.limit
        }

        if (data && data.skip) {
            let perPage = (data.limit) ? data.limit : 3
            pagination.skip = data.skip * perPage
        }
        const response = await Theatre.find(query, {}, pagination)
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, { new: true, runValidators: true })
        if (!response) {
            return {
                err: "No theatre found for the corresponding id provided",
                code: 404
            }
        }
        return response
    }
    catch (error) {
        if (error.name === "ValidationError") {
            let err = {}
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })
            return { err: err, code: 422 }
        }
        console.log(error)
        throw error
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
                code: 404,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }
}


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre,
    updateTheatre,
    updateMoviesInTheatres
}
