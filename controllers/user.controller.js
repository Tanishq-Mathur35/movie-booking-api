const userService = require('../services/user.service');
const { errorRes, successRes } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');


const update = async (req, res) => {
    try {
        const response = await userService.modifyUser(req.body, req.params.id);
        successRes.data = response;
        successRes.message = 'Successfully updated the user';
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
    update
}
