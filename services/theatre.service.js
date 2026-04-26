const Theatre = require("../models/theatre.model")


const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data)
        return response
    }
    catch (error) {
        if (error.name === "ValidationError") {
            let err = {}
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })

            return { err: err, code: 422 }
        }
        console.log(error)
        throw error
    }
}


const deleteTheatre = async (id) => {
    try {
        const theatre = await Theatre.findByIdAndDelete(id)

        return theatre
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const getTheatre = async (id) => {
    try {
        const response = await Theatre.findById(id)
        if (!response) {
            return {
                err: "No theatre found for the corresponding id provided",
                code: 404
            }
        }
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


const getAllTheatre = async () => {
    try {
        const response = await Theatre.find({})
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre
}
