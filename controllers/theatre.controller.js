const theatreService = require("../services/theatre.service")
const { successResponseBody, errorResponseBody } = require("../utils/responseBody")


/**
 * @description  Create a new theatre in the database
 * @returns  201 - Theatre created successfully
 */
const createTheatre = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body)
        if (response.err) {
            errorResponseBody.err = response.err
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        successResponseBody.message = "Theatre created successfully"
        return res.status(201).json(successResponseBody)
    }
    catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


/**
 * @description  Delete a theatre from the database by ID
 * @returns 200 - Theatre deleted successfully
 */
const destroy = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id)
        if (response.err) {
            errorResponseBody.err = response.err
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        successResponseBody.message = "Theatre deleted successfully"
        return res.status(200).json(successResponseBody)
    }
    catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


/**
 * @description  Get a theatre from the database by ID
 * @returns 200 - Theatre fetched successfully
 */
const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.getTheatre(req.params.id)
        if (response.err) {
            errorResponseBody.err = response.err
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        successResponseBody.message = "Theatre fetched successfully"
        return res.status(200).json(successResponseBody)
    }
    catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


/**
 * @description  Get all theatres from the database
 * @returns 200 - Theatres fetched successfully
 */
const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.getAllTheatre()
        successResponseBody.data = response
        successResponseBody.message = "All the Theatres fetched successfully"
        return res.status(200).json(successResponseBody)
    }
    catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


module.exports = {
    createTheatre,
    destroy,
    getTheatre,
    getTheatres
}
