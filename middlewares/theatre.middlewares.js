const { errorResponseBody } = require("../utils/responseBody")


const validateTheatreCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorResponseBody.err = "The name of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }

    if (!req.body.city) {
        errorResponseBody.err = "The city of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }

    if (!req.body.pincode) {
        errorResponseBody.err = "The pincode of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }

    if (!req.body.address) {
        errorResponseBody.err = "The address of the theatre is not present in the request"
        return res.status(400).json(errorResponseBody)
    }

    next()

}


const validateUpdateMovies = async (req, res, next) => {
    if (req.body.insert == undefined) {
        errorResponseBody.message = "The insert field is not present in the request body"
        return res.status(400).json(errorResponseBody)
    }

    if (!req.body.movieIds) {
        errorResponseBody.message = "The movieIds field is not present in the request body"
        return res.status(400).json(errorResponseBody)
    }

    if (!req.body.movieIds instanceof Array) {
        errorResponseBody.message = "The movieIds field is not an array"
        return res.status(400).json(errorResponseBody)
    }

    if (req.body.movieIds.length == 0) {
        errorResponseBody.message = "The movieIds field is empty"
        return res.status(400).json(errorResponseBody)
    }

    next()

}


module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMovies
}
