const paymentService = require('../services/payment.service');
const { BOOKING_STATUS, STATUS } = require('../utils/constants');
const { errorRes, successRes } = require('../utils/responsebody');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Theatre = require('../models/theatre.model');
const sendMail = require('../services/email.service');


const create = async (req, res) => {
    try {
        const response = await paymentService.addPayment(req.body);
        if (response.status == BOOKING_STATUS.expired) {
            errorRes.err = 'The payment took more than 5 minutes to get processed, hence you booking got expired, please try again';
            errorRes.data = response;
            return res.status(STATUS.GONE).json(errorRes);
        }
        if (response.status == BOOKING_STATUS.cancelled) {
            errorRes.err = 'The payment failed due to some reason, booking was not successfull, please try again';
            errorRes.data = response;
            return res.status(STATUS.PAYMENT_REQUIRED).json(errorRes);
        }
        const user = await User.findById(response.userId);
        const movie = await Movie.findById(response.movieId);
        const theatre = await Theatre.findById(response.theatreId);
        successRes.data = response;
        successRes.message = 'Booking completed successfully';
        console.log(response, process.env.NOTI_SERVICE);
        // sendMail(
        //     'Your booking is Successfull', 
        //     response.userId,
        //     `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successfull. Your booking id is ${response.id}`
        // );

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


const getPaymentDetailsById = async (req, res) => {
    try {
        const response = await paymentService.fetchPaymentById(req.params.id);
        successRes.data = response;
        successRes.message = "Successfully fetched the booking and payment details";
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


const getAllPayments = async (req, res) => {
    try {
        const response = await paymentService.fetchAllPayments(req.user);
        successRes.data = response;
        successRes.message = "Successfully fetched all the payments";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


module.exports = {
    create,
    getPaymentDetailsById,
    getAllPayments
}
