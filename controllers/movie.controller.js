const Movie = require("../models/movie.model")
const movieService = require("../services/movie.service")
const { successResponseBody, errorResponseBody } = require("../utils/responseBody")



/**
 * @description  Create a new movie in the database
 * @returns  201 - Movie created successfully
 */
const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body)
        if (response.err) {
            errorResponseBody.err = response.err
            errorResponseBody.message = "Validation failed on few parameters of the request body"

            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        successResponseBody.message = "Movie created successfully"
        return res.status(201).json(successResponseBody)
    }
    catch (error) {
        console.log(error)

        return res.status(500).json(errorResponseBody)
    }
}


/**
 * @description Delete a movie from the database by ID
 * @returns 200 - Movie deleted successfully
 */
const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id)

        successResponseBody.data = response
        successResponseBody.message = "Movie deleted successfully"
        return res.status(200).json(successResponseBody)
    }
    catch (error) {
        console.log(error)

        return res.status(500).json(errorResponseBody)
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
        return res.status(200).json(successResponseBody)
    }
    catch (error) {
        console.log(error)

        return res.status(500).json(errorResponseBody)
    }
}


/**
 * @description  Update a movie in the database by ID
 * @returns 200 - Movie updated successfully
 */
const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovie(req.params.id, req.body)

        if (response.err) {
            errorResponseBody.err = response.err
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        return res.status(200).json(successResponseBody)
    }
    catch (err) {
        console.log(err)
        errorResponseBody.err = err
        return res.status(500).json(errorResponseBody)
    }
}


module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie
}
