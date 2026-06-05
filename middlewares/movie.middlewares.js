const badReqRes = {
    success: false,
    err: "",
    data: {},
    message: "Malformed Request | Bad Request"
};

const { STATUS } = require('../utils/constants');


const validateMovieCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        badReqRes.err = "The name of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    if (!req.body.description) {
        badReqRes.err = "The description of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    if (!req.body.casts ||
        !(req.body.casts instanceof Array) ||
        req.body.casts.length <= 0
    ) {
        badReqRes.err = "The casts of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    if (!req.body.trailerUrl) {
        badReqRes.err = "The trailerUrl of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    if (!req.body.releaseDate) {
        badReqRes.err = "The releaseDate of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    if (!req.body.director) {
        badReqRes.err = "The director of the movie is not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(badReqRes);
    }
    next();
}


module.exports = {
    validateMovieCreateRequest
}
