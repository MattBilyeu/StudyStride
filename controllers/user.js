const User = require('../models/user');
const Badge = require('../models/badge');

const { sendOne } = require('../util/emailer');

exports.createUser = (req, res, next) => {

}

exports.updateEmail = (req, res, next) => {
    
}

exports.sendEmailUpdate = (req, res, next) => {
    
}

exports.sendPassUpdate = (req, res, next) => {
    
}

exports.updatePassword = (req, res, next) => {
    
}

exports.updateMilestones = (req, res, next) => {
    
}

exports.createTopic = (req, res, next) => {
    
}

exports.startSession = (req, res, next) => {
    
}

exports.endSession = (req, res, next) => {
    //Check if badge earned
}

exports.seedTime = (req, res, next) => {
    
}

exports.toggleReceiveEmails = (req, res, next) => {
    
}

exports.deleteUser = (req, res, next) => {
    
}

exports.renderBadge = (req, res, next) => {
    const badgeId = req.params.badgeId;
    Badge.findById(badgeId)
        .then(badge => {
            if (!badge) {
                return res.render('error')
            };
            res.render('badge', {
                ownerName: badge.ownerName,
                text: badge.text,
                dateEarned: badge.dateEarned
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 404;
            return next(error);
        })
}