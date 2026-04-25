const mongoose = require('mongoose');


/**
 * @description  Theatre model represents a theatre entity in the database. It includes details such as name, description, city, pincode, and address. The schema also includes timestamps for createdAt and updatedAt fields.
 */
const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
},
    {
        timestamps: true
    }
)


const Theatre = mongoose.model('Theatre', theatreSchema)

module.exports = Theatre
