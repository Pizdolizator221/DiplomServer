// import packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

// thread data model
const threadSchema = new Schema({
    authorUsername: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contentText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    comments: [
        {
            authorUsername: {
                type: String,
                required: true
            },
            contentText: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = mongoose.model('Thread', threadSchema);