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
    totalTime: {
        type: Number,
        required: true
    },
    topics: [
        {
            topic: {type: String, required: true},
            timestamps: [{
                stamp: {type: Date, required: true},
                duration: {type: Number, required: true}
            }]
        }
    ],
    activeSession: {
        type: {
            topic: {type: String, required: true},
            start: {type: Date, required: true}
        },
        required: false
    },
    milestones: {
        type: [{
            name: {type: String, required: false},
            completed: {type: Boolean, required: false}
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