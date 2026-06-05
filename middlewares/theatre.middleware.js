const { errorRes } = require('../utils/responsebody');


const validateTheatreCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        errorRes.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorRes);
    }
    if (!req.body.pincode) {
        errorRes.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorRes);
    }
    if (!req.body.city) {
        errorRes.err = "The city of the theatre is not present";
        return res.status(400).json(errorRes);
    }
    next();
}


const validateUpdateMoviesRequest = async (req, res, next) => {
    if (req.body.insert == undefined) {
        errorRes.err = "The insert parameter is missing in the request";
        return res.status(400).json(errorRes);
    }
    if (!req.body.movieIds) {
        errorRes.err = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorRes);
    }
    if (!(req.body.movieIds instanceof Array)) {
        errorRes.err = "Expected array of movies but found something else";
        return res.status(400).json(errorRes);
    }
    if (req.body.movieIds.length == 0) {
        errorRes.err = "No movies present in the array provided";
        return res.status(400).json(errorRes);
    }
    next();
}


module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}
