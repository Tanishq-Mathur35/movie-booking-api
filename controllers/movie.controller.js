const Movie = require("../models/movie.model")


/**
 * @description  Create a new movie in the database
 * @returns  201 - Movie created successfully
 */
const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)

        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: "Movie created successfully"
        })
    }
    catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            error: error.message,
            data: {},
            message: "Something went wrong"
        })
    }
}


module.exports = {
    createMovie
}
