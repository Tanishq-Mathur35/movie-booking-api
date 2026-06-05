const { errorRes } = require("../utils/responsebody");


const validateUpdateUserRequest = (req, res, next) => {
    if (!(req.body.userRole || req.body.userStatus)) {
        errorRes.err = 'Malformed request, please send atleast one parameter';
        return res.status(400).json(errorRes);
    }
    next();
}


module.exports = {
    validateUpdateUserRequest
}
