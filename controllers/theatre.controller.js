const theatreService = require('../services/theatre.service');
const { successRes, errorRes } = require('../utils/responsebody');
const { STATUS } = require('../utils/constants');
const sendMail = require('../services/email.service');


const create = async (req, res) => {
    try {
        const response = await theatreService.addTheatre({ ...req.body, owner: req.user });
        successRes.data = response;
        successRes.message = "Successfully created the theatre"
        sendMail(
            'Successfully created a theatre',
            req.user,
            'You have successfully created a new theatre'
        )
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


const destroy = async (req, res) => {
    try {
        const response = await theatreService.removeTheatre(req.params.id);
        successRes.data = response;
        successRes.message = "Successfully deleted the given theatre";
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


const getTheatre = async (req, res) => {
    try {
        const response = await theatreService.fetchTheatre(req.params.id);
        successRes.data = response;
        successRes.message = "Successfully fetched the data of the theatre";
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


const getTheatres = async (req, res) => {
    try {
        const response = await theatreService.fetchAllTheatres(req.query);
        successRes.data = response;
        successRes.message = "Successfully fetched all the theatres";
        return res.status(STATUS.OK).json(successRes);
    } catch (error) {
        errorRes.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorRes);
    }
}


const update = async (req, res) => {
    try {
        const response = await theatreService.modifyTheatre(req.params.id, req.body);
        successRes.data = response;
        successRes.message = "Successfully updated the theatre";
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


const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatres(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        successRes.data = response;
        successRes.message = "Successfully updated movies in the theatre";
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


const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        successRes.data = response;
        successRes.message = "Successfully fetched the movies for the theatre";
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


const checkMovie = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
        successRes.data = response;
        successRes.message = "Successfully checked if movie is present in the theatre";
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
    destroy,
    getTheatre,
    getTheatres,
    update,
    updateMovies,
    getMovies,
    checkMovie
}
