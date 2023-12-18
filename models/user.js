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
    times: {
        type: [{
            topic: {type: SVGAnimatedBooleantring, required: true},
            totalTime: {type: Number, required: true}
        }],
        default: [],
        required: false
    },
    activeSession: {
        type: {
            topic: {type: String, required: true},
            start: {type: Date, required: true}
        },
        required: false
    },
    milestones: {
        type: [{
            type: String,
            required: false
        }],
        default: []
    },
    userActiveUntil: {
        type: Date,
        required: true
    },
    badges: [{
        type: Schema.Types.ObjectId,
        ref: 'Badge',
        required: false
    }],
    banned: [{
        type: Boolean,
        required: true
    }],
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