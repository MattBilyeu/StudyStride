const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dateEarned: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Badge', badgeSchema);