const Feedback = require('../models/feedback');
const Stats = require('../models/stats');
const User = require('../models/user');

const { sendOne } = require('../util/emailer');

exports.createFeedback = (req, res, next) => {
    const text = req.body.text;
    const userId = req.session.userId;
    const newFeedback = new Feedback({
        text: text,
        userId: userId,
        createDate: Date(),
        acknowledged: false
    });
    newFeedback.save();
    Stats.findOne()
        .then(stats => {
            if (Date() > (stats.lastAdminFeedbackNotification + (24 * 60 * 60 * 1000))) {
                sendOne('matt.bilyeu1@gmail.com', 'Studystride Feedback', '<p>New feedback has been left at Studystride.</p>');
                stats.lastAdminFeedbackNotification = Date();
                stats.save();
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })

}

exports.deleteFeedback = (req, res, next) => {
   Feedback.findByIdAndDelete(req.body.feedbackId)
    .then(deleted => {
        if (!deleted) {
            return res.status(404).json({message: 'Feedback not found'})
        } else {
            return res.status(200).json({messsage: 'Feedback deleted.'})
        }
    })
    .catch(err => {
        const error = new Error(err);
        error.status(500);
        next(error)
    }) 
}

exports.emailSender = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(422).json({message: 'Must be logged in as an admin.'})
    }
    const message = req.body.message;
    const senderId = req.body.senderId;
    User.findById(senderId)
        .then(foundUser => {
            if (foundUser) {
                sendOne(foundUser.email, 'Studystride Response', message);
                return res.status(200).json({message: 'Message sent.'})
            } else {
                return res.status(404).json({message: 'User not found.'})
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.getFeedback = (req, res, next) => {
    Feedback.find()
        .then(feedbacks => {
            if (feedbacks && feedbacks.length > 0) {
                return res.status(200).json({feedbacks})
            } else {
                return res.status(404).json({message: 'No feedback found.'})
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}