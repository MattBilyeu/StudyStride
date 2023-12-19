const User = require('../models/user');
const Badge = require('../models/badge');

const { sendOne } = require('../util/emailer');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let foundUser;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(422).json({message: 'A user with that email already exists.'})
            } else {
                foundUser = user;
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const futureTimeStamp = Date.now() + (30 * 24 * 60 * 60 * 1000);
                        const futureDate = new Date(futureTimeStamp);
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            receivesEmails: true,
                            times: [],
                            activeSession: null,
                            milestones: [],
                            userActiveUntil: futureDate,
                            badges: [],
                            banned: false,
                            resetToken: null,
                            resetExpiration: null
                        });
                        newUser.save().then(newUser => {
                            return res.status(201).json({message: 'User Created.', user: newUser})
                        })
                    })
                .catch(err => {
                    const error = new Error(err);
                    error.status(500);
                    next(error)
                })
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.updateEmail = (req, res, next) => {
    const oldEmail = req.body.oldEmail;
    const newEmail = req.body.newEmail;
    const password = req.body.password;
    let foundUser;
    User.findOne({email: oldEmail})
        .then(user => {
            if (!user) {
                return res.status(422).json({message: 'The reset email you used is no longer valid, please submit a new request.'})
            } else {
                foundUser = user;
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (!doMatch) {
                            return res.status(422).json({message: 'The email and password combination you have submitted has not been found.'})
                        } else {
                            if (foundUser.banned) {
                                return res.status(422).json({message: 'The email you have used has been banned from the system.'})
                            } else {
                                foundUser.email = newEmail;
                                foundUser.save()
                                    .then(updatedUser => {
                                        return res.status(200).json({message: 'Email updated.', user: updatedUser})
                                    })
                                    .catch(err => {
                                        const error = new Error(err);
                                        error.status(500);
                                        next(error)
                                    })
                            }
                        }
                    })
                    .catch(err => {
                        const error = new Error(err);
                        error.status(500);
                        next(error)
                    })
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.sendPassUpdate = (req, res, next) => {
    const email = req.body.email;
    let foundUser;
    User.findOne({email: email})
        .then(user => {
            if (!user || user.banned) {
                return res.status(404).json({message: 'That email is not valid.'})
            } else {
                foundUser = user;
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        console.log(err);
                        next(new Error('Error creating reset token.'))
                    };
                    const token = buffer.toString('hex');
                    foundUser.resetToken = token;
                    foundUser.tokenExpiration = Date.now() + (60 * 60 * 1000);
                    foundUser.save()
                        .then(result => {
                            sendOne(email, 'Password Reset',
                            `
                                <h1>Password Reset</h1>
                                <p>You requested a password reset.</p>
                                <p>Click this <a href="http://localhost:3000/pass-reset/${token}">link</a> to set a new password.</p>
                            `
                        );
                        res.status(200).json({message: 'Password Reset Sent - Please check your email.'})
                        })
                        .catch(err => {
                            const error = new Error(err);
                            error.status(500);
                            next(error)
                        })
                })
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.updatePassword = (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    const email = req.body.email;
    let foundUser;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'A user with that email was not found.'})
            } else {
                foundUser = user;
                return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    foundUser.password = hashedPassword;
                    foundUser.save()
                        .then(updatedUser => {
                            updatedUser.password = 'redacted';
                            return res.status(200).json({message: 'Password updated.', user: updatedUser})
                        })
                        .catch(err => {
                            const error = new Error(err);
                            error.status(500);
                            next(error)
                        })
                })
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.updateMilestones = (req, res, next) => {
    const updateData = {milestones: req.body.milestones};
    const userId = req.body.userId;
    User.findByIdAndUpdate(userId, updateData, {new: true})
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                return res.status(200).json({message: 'Milestones updated.', user: updatedUser})
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
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