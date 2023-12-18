const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    acknowledged: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);