const Feedback = require('../models/feedback');

const { sendMany, sendOne } = require('../util/emailer');

exports.createFeedback = (req, res, next) => {
    // Email admins on creation if no other feedback within 24 hours
}

exports.deleteFeedback = (req, res, next) => {
    
}

exports.emailSender = (req, res, next) => {
    
}

exports.acknowledgeFeedback = (req, res, next) => {
    
}