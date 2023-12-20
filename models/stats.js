const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statsSchema = new Schema({
    totalTimeStamps: {
        type: Number,
        required: true
    },
    milestonesCreated: {
        type: Number,
        required: true
    },
    totalStudyTime: {
        type: Number,
        required: true
    },
    lastAdminFeedbackNotification: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Stats', statsSchema);