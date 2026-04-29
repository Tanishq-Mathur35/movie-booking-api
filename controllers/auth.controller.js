const userService = require("../services/user.service")
const { successResponseBody, errorResponseBody } = require("../utils/responseBody")


const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body)
        if (response.err) {
            errorResponseBody.err = response.err
            errorResponseBody.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponseBody)
        }

        successResponseBody.data = response
        successResponseBody.message = "User created successfully"
        return res.status(201).json(successResponseBody)
    }
    catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err
            errorResponseBody.message = error.message
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


module.exports = {
    signup
}
