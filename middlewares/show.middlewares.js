const { STATUS } = require('../utils/constants');
const { errorRes } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;


const validateCreateShowRequest = async (req, res, next) => {
    if (!req.body.theatreId) {
        errorRes.err = "No theatre provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!ObjectId.isValid(req.body.theatreId)) {
        errorRes.err = "Invalid theatre id";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.movieId) {
        errorRes.err = "No movie provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!ObjectId.isValid(req.body.movieId)) {
        errorRes.err = "Invalid movie id";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.timing) {
        errorRes.err = "No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.noOfSeats) {
        errorRes.err = "No seat info provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.price) {
        errorRes.err = "No price information provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


const validateShowUpdateRequest = async (req, res, next) => {
    if (req.body.theatreId || req.body.movieId) {
        errorRes.err = "We cannot update theatre or movie for an already added show";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


module.exports = {
    validateCreateShowRequest,
    validateShowUpdateRequest
}
