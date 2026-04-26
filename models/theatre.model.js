const mongoose = require('mongoose');


/**
 * @description  Theatre model represents a theatre entity in the database. The schema also includes timestamps for createdAt and updatedAt fields.
 */
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String,
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie'
    }
},
    {
        timestamps: true
    }
)


const Theatre = mongoose.model('Theatre', theatreSchema)

module.exports = Theatre
