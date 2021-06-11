// import packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// book data model
const bookSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pagesAmount: {
        type: String,
        required: true
    },
    publishment: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        min: 3,
        max: 4
    }
});

module.exports = mongoose.model('Book', bookSchema);