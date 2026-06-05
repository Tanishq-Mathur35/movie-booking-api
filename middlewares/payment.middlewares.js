const { STATUS } = require("../utils/constants");
const { errorRes } = require("../utils/responsebody");
const ObjectId = require('mongoose').Types.ObjectId;


const verifyPaymentCreateRequest = async (req, res, next) => {
    if (!req.body.bookingId) {
        errorRes.err = 'No booking id received';
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!ObjectId.isValid(req.body.bookingId)) {
        errorRes.err = 'Invalid booking id';
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.amount) {
        errorRes.err = 'No amount sent';
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


module.exports = {
    verifyPaymentCreateRequest
}
