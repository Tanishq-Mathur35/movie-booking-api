const { STATUS, USER_ROLE, BOOKING_STATUS } = require('../utils/constants');
const { errorRes } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');


const validateBookingCreateRequest = async (req, res, next) => {
    if (!req.body.theatreId) {
        errorRes.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!ObjectId.isValid(req.body.theatreId)) {
        errorRes.err = "Invalid theatreid provided"
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    const theatre = await theatreService.fetchTheatre(req.body.theatreId);
    if (!theatre) {
        errorRes.err = "No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorRes);
    }
    if (!req.body.movieId) {
        errorRes.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!ObjectId.isValid(req.body.movieId)) {
        errorRes.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    console.log(theatre.movies.indexOf(req.body.movieId), req.body.movieId);
    if (theatre.movies.indexOf(req.body.movieId) == -1) {
        errorRes.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorRes);
    }
    if (!req.body.timing) {
        errorRes.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.noOfSeats) {
        errorRes.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


const canChangeStatus = async (req, res, next) => {
    const user = await userService.findUserById(req.user);
    if (user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
        errorRes.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errorRes);
    }
    next();
}


module.exports = {
    validateBookingCreateRequest,
    canChangeStatus
}
