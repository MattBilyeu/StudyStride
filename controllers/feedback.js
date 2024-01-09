const Feedback = require('../models/feedback');
const Stats = require('../models/stats');
const User = require('../models/user');
const Admin = require('../models/admin');

const { sendOne, sendMany } = require('../util/emailer');

const dangerousKeywords = [
    "import",
    "script",
    "onload",
    "onclick",
    "onerror",
    "script",
    "iframe",
    "object",
    "embed",
    "eval",
    "document.write",
    "setTimeout",
    "javascript:",
    "alert(",
    "confirm(",
    "SELECT",
    "DELETE",
    "UPDATE",
    "DROP",
    "../",
    "file://",
  ];

exports.createFeedback = (req, res, next) => {
    const text = req.body.text;
    const userId = req.session.userId;
    for (let i = 0; i < dangerousKeywords.length; i++) { //Iterates through all of the flagged keywords to ensure none are present in the feedback.  This is to prevent injection attacks.
        if (text.toLowerCase().includes(dangerousKeywords[i].toLowerCase())) {
            text = 'Invalid feedback submitted - original text dropped.'
        }
    };
    const newFeedback = new Feedback({
        text: text,
        userId: userId,
        createDate: Date(),
        acknowledged: false
    });
    newFeedback.save();
    Stats.findOne()
        .then(stats => {
            const now = Date.now();
            const lastNotification = new Date(stats.lastAdminFeedbackNotification);
            if (now > (lastNotification.getTime() + (24 * 60 * 60 * 1000))) { //This is to notify admins of feedback when submitted, but no more than once per day
                Admin.find()
                    .then(admins => {
                        const adminEmails = admins.map(admin => admin.email);
                        sendMany(adminEmails, 'Studystride Feedback', '<p>New feedback has been left at Studystride.</p>');
                    });
                stats.lastAdminFeedbackNotification = new Date();
                stats.save();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.deleteFeedback = (req, res, next) => {
   Feedback.findByIdAndDelete(req.body.feedbackId)
    .then(deleted => {
        return res.status(200).json({messsage: 'Feedback deleted.'})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Internal server error.'})
    })
}

exports.emailSender = (req, res, next) => {
    if (req.session.role !== 'admin') { //Server side validation to prevent unauthorized users from accessing the email all users method.  The session is only set to 'admin' when one logs in as an admin.
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
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.getFeedback = (req, res, next) => {
    Feedback.find()
        .then(feedbacks => {
            if (feedbacks && feedbacks.length > 0) {
                return res.status(200).json({feedbacks})
            } else {
                return res.status(200).json({message: 'No feedback found.'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}