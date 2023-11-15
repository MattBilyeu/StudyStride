const mongoose = require(('mongoose'));

const Schema = mongoose.Schema;

const timestampSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    topic: {
        type: String,
        required: false
    }
})

exports.modules = mongoose.model('Timestamp', timestampSchema);