const jwt = require('jsonwebtoken');

const userService = require('../services/user.service');
const { successRes, errorRes } = require('../utils/responsebody');


const signup = async (req, res) => {
    try {
        const response = await userService.registerUser(req.body);
        successRes.data = response;
        successRes.message = "Successfully registered a user";
        return res.status(201).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(500).json(errorRes);
    }
}


const signin = async (req, res) => {
    try {
        const user = await userService.findUserByEmail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if (!isValidPassword) {
            throw { err: 'Invalid password for the given email', code: 401 };
        }
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.AUTH_KEY,
            { expiresIn: '1h' }
        );

        successRes.message = "Successfully logged in";
        successRes.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        };

        return res.status(200).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        console.log(error);
        errorRes.err = error;
        return res.status(500).json(errorRes);
    }
}


const resetPassword = async (req, res) => {
    try {
        const user = await userService.findUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);
        if (!isOldPasswordCorrect) {
            throw { err: 'Invalid old password, please write the correct old password', code: 403 };
        }
        user.password = req.body.newPassword;
        await user.save();
        successRes.data = user;
        successRes.message = 'Successfully updated the password for the given user';
        return res.status(200).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(500).json(errorRes);
    }
}


module.exports = {
    signup,
    signin,
    resetPassword
}
