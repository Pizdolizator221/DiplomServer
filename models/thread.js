const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('./user');

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
    }
});

module.exports = mongoose.model('Thread', threadSchema);