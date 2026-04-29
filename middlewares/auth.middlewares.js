const { errorResponseBody } = require("../utils/responseBody")


const validateSignupRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorResponseBody.err = "The name of the user is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    if (!req.body.email) {
        errorResponseBody.err = "The email of the user is not present in the request"
        return res.status(400).json(errorResponseBody)
    }
    if (!req.body.password) {
        errorResponseBody.err = "The password of the user is not present in the request"
        return res.status(400).json(errorResponseBody)
    }

    next()

}


module.exports = {
    validateSignupRequest
}
