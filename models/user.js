const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    receivesEmails: {
        type: Boolean,
        required: true
    },
    topics: {
        type: Array,
        required: true
    },
    badges: {
        type: Number,
        required: true
    },
    resetToken: {
        type: String,
        required: false
    },
    resetExpiration: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);