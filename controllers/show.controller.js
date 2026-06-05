const showService = require('../services/show.service');
const { successRes, errorRes } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');


const create = async (req, res) => {
    try {
        const response = await showService.addShow(req.body);
        successRes.message = "Successfully created the show";
        successRes.data = response;
        return res.status(STATUS.CREATED).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(STATUS.OK).json(errorRes);
    }
}


const getShows = async (req, res) => {
    try {
        const response = await showService.getShows(req.query);
        successRes.message = "Successfully fetched the movie shows";
        successRes.data = response;
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        if (error.err) {
            errorRes.err = error.err;
            return res.status(error.code).json(errorRes);
        }
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR);
    }
}


const destroy = async (req, res) => {
    try {
        const response = await showService.removeShow(req.params.id);
        successRes.data = response;
        successRes.message = "Successfully deleted the show";
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


const update = async (req, res) => {
    try {
        const response = await showService.modifyShow(req.params.id, req.body);
        successRes.data = response;
        successRes.message = "Successfully updated the show";
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


module.exports = {
    create,
    getShows,
    destroy,
    update
}
