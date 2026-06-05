const { successRes, errorRes } = require('../utils/responsebody');
const bookingService = require('../services/booking.services');
const { STATUS } = require('../utils/constants');


const create = async (req, res) => {
    try {
        let userId = req.user;
        const response = await bookingService.addBooking({ ...req.body, userId: userId });
        successRes.message = "Successfully created a booking";
        successRes.data = response;
        return res.status(STATUS.CREATED).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const update = async (req, res) => {
    try {
        const response = await bookingService.modifyBooking(req.body, req.params.id);
        successRes.data = response;
        successRes.message = "Successfully updated the booking";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        console.log(error);
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const getBookings = async (req, res, next) => {
    try {
        const response = await bookingService.getBookings({ userId: req.user });
        successRes.data = response;
        successRes.message = "Successfully fetched the bookings";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const getAllBookings = async (req, res, next) => {
    try {
        const response = await bookingService.getAllBookings();
        successRes.data = response;
        successRes.message = "Successfully fetched the bookings";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const getBookingById = async (req, res, next) => {
    try {
        const response = await bookingService.getBookingById(req.params.id, req.user);
        successRes.data = response;
        successRes.message = "Successfully fetched the booking";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


module.exports = {
    create,
    update,
    getBookings,
    getAllBookings,
    getBookingById
}
