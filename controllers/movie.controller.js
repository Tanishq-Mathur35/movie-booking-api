const Movie = require("../models/movie.model")
const movieService = require("../services/movie.service")


const errorResponseBody = {
    err: "",
    data: {},
    message: "Something went wrong, cannot process the request",
    success: false
}

const successResponseBody = {
    error: {},
    data: {},
    message: "Successfully processed the request",
    success: true
}


/**
 * @description  Create a new movie in the database
 * @returns  201 - Movie created successfully
 */
const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)

        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: "Movie created successfully"
        })
    }
    catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            error: error.message,
            data: {},
            message: "Something went wrong"
        })
    }
}


/**
 * @description Delete a movie from the database by ID
 * @returns 200 - Movie deleted successfully
 */
const deleteMovie = async (req, res) => {
    try {
        const response = await Movie.deleteOne({
            _id: req.params.id
        })

        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: "Movie deleted successfully"
        })
    }
    catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            error: error.message,
            data: {},
            message: "Something went wrong"
        })
    }
}


/**
 * @description  Get a movie from the database by ID
 * @returns 200 - Movie fetched successfully
 */
const getMovie = async (req, res) => {
    try {
        const response = await movieService.getMovieById(req.params.id)

        if (response.err) {
            errorResponseBody.err = response.err
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response

        return res.status(200).json({ successResponseBody })
    }
    catch (error) {
        console.log(error)

        return res.status(500).json({ errorResponseBody })
    }
}


module.exports = {
    createMovie,
    deleteMovie,
    getMovie
}
