const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    role: {
        type: String,
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

module.exports = mongoose.model('Admin', adminSchema);