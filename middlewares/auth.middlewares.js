const jwt = require('jsonwebtoken');

const { errorRes } = require('../utils/responsebody');
const userService = require('../services/user.service');
const { USER_ROLE, STATUS } = require('../utils/constants');


const validateSignupRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorRes.err = "Name of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.email) {
        errorRes.err = "Email of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.password) {
        errorRes.err = "Password of the user not present in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


const validateSigninRequest = async (req, res, next) => {
    if (!req.body.email) {
        errorRes.err = "No email provided for sign in";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.password) {
        errorRes.err = "No password provided for sign in";
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            errorRes.err = "No token provided";
            return res.status(STATUS.FORBIDDEN).json(errorRes);
        }
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            errorRes.err = "Token not verified";
            return res.status(STATUS.UNAUTHORISED).json(errorRes);
        }
        const user = await userService.findUserById(response.id);
        req.user = user.id;
        next();
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            errorRes.err = error.message;
            return res.status(STATUS.UNAUTHORISED).json(errorRes);
        }
        if (error.code == STATUS.NOT_FOUND) {
            errorRes.err = "User doesn't exist"
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const validateResetPasswordRequest = (req, res, next) => {
    if (!req.body.oldPassword) {
        errorRes.err = 'Missing the old password in the request';
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    if (!req.body.newPassword) {
        errorRes.err = 'Missing the new password in the request';
        return res.status(STATUS.BAD_REQUEST).json(errorRes);
    }
    next();
}


const isAdmin = async (req, res, next) => {
    console.log(req.user);
    const user = await userService.findUserById(req.user);
    if (user.userRole != USER_ROLE.admin) {
        errorRes.err = "User is not an admin, cannot proceed with the request"
        return res.status(STATUS.UNAUTHORISED).json(errorRes);
    }
    next();
}


const isClient = async (req, res, next) => {
    const user = await userService.findUserById(req.user);
    if (user.userRole != USER_ROLE.client) {
        errorRes.err = "User is not a client, cannot proceed with the request";
        return res.status(STATUS.UNAUTHORISED).json(errorRes);
    }
    next();
}


const isAdminOrClient = async (req, res, next) => {
    const user = await userService.findUserById(req.user);
    if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
        errorRes.err = "User is neither a client not an admin, cannot proceed with the request";
        return res.status(STATUS.UNAUTHORISED).json(errorRes);
    }
    next();
}


module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}
