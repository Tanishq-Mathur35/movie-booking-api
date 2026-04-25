const theatreService = require("../services/theatre.service")
const { successResponseBody, errorResponseBody } = require("../utils/responseBody")


const createTheatre = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body)
        successResponseBody.data = response
        successResponseBody.message = "Theatre created successfully"
        return res.status(201).json(successResponseBody)
    }
    catch (error) {
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}


module.exports = {
    createTheatre
}
