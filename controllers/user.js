const User = require('../models/user');
const Badge = require('../models/badge');
const Stats = require('../models/stats');

const { sendOne } = require('../util/emailer');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function resolveMilestones(oldArray, newArray) {
    let newMilestones = 0;
    for (let i = 0; i < newArray.length; i++) {
        const found = oldArray.find(item => item === newArray[i]);
        if (found) {
            newMilestones += 1
        }
    };
    if (newMilestones !== 0) {
        Stats.findOne()
            .then(stats => {
                stats.milestonesCreated += newMilestones;
                return stats.save()
            })
            .catch(err => {
                const error = new Error(err);
                error.status(500);
                next(error)
            })
    }
}

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email.toLowerCase();
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
                        const futureTimeStamp = Date() + (30 * 24 * 60 * 60 * 1000);
                        const futureDate = new Date(futureTimeStamp);
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            receivesEmails: true,
                            topics: [],
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
            if (!user || user._id.toString() !== req.session._id.toString()) {
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
    let foundUser;
    User.findOne({resetToken: token})
        .then(user => {
            if (!user || user.resetTokenExpiration < Date()) {
                return res.status(404).json({message: 'Your token is invalid.'})
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
    const newMilestones = req.body.milestones;
    User.findById(req.session._id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                resolveMilestones(user.milestones, newMilestones);
                user.milestones = newMilestones;
                user.save()
                    .then(updatedUser => {
                        return res.status(200).json({message: 'Milestones updated.', user: updatedUser})
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

exports.createTopic = (req, res, next) => {
    const title = req.body.title;
    User.findById(req.session._id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                const foundTopic = user.topics.findIndex(topicObj => topicObj.topic === req.body.title);
                if (foundTopic !== -1) {
                    return res.status(422).json({message: 'A topic by that name already exists.'})
                }
                const newTopic = {topic: title, timestamps: []};
                user.topics.push(newTopic);
                user.save()
                    .then(updatedUser => {
                        return res.status(201).json({message: 'New topic created.', user: updatedUser})
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

exports.deleteTopic = (req, res, next) => {
    User.findById(req.session._id)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                let topic = req.body.topic;
                user.topics = user.topics.filter(topicObj => topicObj.topic !== topic);
                user.save()
                    .then(updatedUser => {
                        return res.status(200).json({message: 'Topic deleted.', user: updatedUser})
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

exports.startSession = (req, res, next) => {
    const startTime = new Date();
    const activeSession = {
        topic: req.body.topic,
        start: startTime
    };
    User.findById(req.session.userId)
        .then(user => {
            if (user.activeSession) {
                return res.status(422).json({messsage: 'A session is already active.'})
            } else {
                user.activeSession = activeSession;
                const currentDate = Date();
                user.userActiveUntil = currentDate + (30 * 24 * 60 * 60 * 1000);
                user.save()
                    .then(updatedUser => {
                        res.status(201).json({message: 'Session started.', user: updatedUser})
                    })
                    .then(result => {
                        Stats.findOne()
                            .then(stats => {
                                stats.totalTimeStamps += 1;
                                stats.save();
                            })
                            .catch(err => {
                                const error = new Error(err);
                                error.status(500);
                                next(error)
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

exports.endSession = (req, res, next) => {
    let user;
    let dur;
    User.findById(req.session.userId)
        .then(foundUser => {
            if (!foundUser.activeSession) {
                return res.status(404).json({message: 'An active session was not found'})
            } else {
                user = foundUser;
                const stopTime = Date();
                const duration = (stopTime - user.activeSession.start)/(1000 * 60);
                dur = duration;     //Results in the total duration of time spent studying this session.
                user.activeSession = null;
                const index = user.topics.findIndex(topicObj => topicObj.topic === user.activeSession.topic);
                if (index !== -1) {
                    user.totalTime += duration;
                    const timeStampObj = {stamp: stopTime, duration: duration};
                    user.topics[index].timestamps.push(timeStampObj);   //Saves the user's study session to their topic's timestamps array.
                };
                if (Math.floor(user.totalTime/60) > (user.badges.length * 10)) {   //Compares the total study time to the number of badges the user has earned to see if they have earned a new badge.
                    const newBadge = new Badge({    //The user earns a new badge ever 10 hours, so they are given a new badge if they have 10 hours more study time than 10*number of badges.
                        owner: user._id,
                        ownerName: user.name,
                        text: `${user.name} has earned a new badge!  That's another 10 hours spent studying.  Great work ${user.name}!  What dedication!`,
                        dateEarned: formatDate(new Date())
                    });
                    newBadge.save()
                        .then(badge => {
                            user.badges.push(badge._id);
                            user.save()
                                .then(updatedUser => {
                                    return res.status(201).json({message: `Congratulations!  You've earned a new badge!`, user: updatedUser, badge: badge._id})
                                })
                                .catch(err => {
                                    const error = new Error(err);
                                    error.status(500);
                                    next(error)
                                })
                        })
                        .catch(err => {
                            const error = new Error(err);
                            error.status(500);
                            next(error)
                        })
                } else {
                    user.save()
                        .then(updatedUser => {
                            return res.status(200).json({message: 'Session ended.', user: updatedUser})
                        })
                        .catch(err => {
                            const error = new Error(err);
                            error.status(500);
                            next(error)
                        })
                };
                Stats.findOne()
                    .then(stats => {
                        stats.totalStudyTime += dur;
                        stats.save()
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

exports.seedTime = (req, res, next) => {
    const seedTime = req.body.seedTime;
    const seedTopic = req.body.seedTopic;
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                const index = user.topics.findIndex(topicObj => topicObj.topic === seedTopic);
                if (index !== -1) {
                    return res.status(404).json({message: `${seedTopic} was not found.`})
                } else {
                    const timestamp = {stamp: Date(), duration: seedTime};
                    user.topics[index].timestamps.push(timestamp);
                    user.save()
                        .then(updatedUser => {
                            return res.status(200).json({message: 'Time seeded.', user: updatedUser})
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

exports.toggleReceiveEmails = (req, res, next) => {
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                user.receivesEmails = !user.receivesEmails;
                user.save()
                    .then(updatedUser => {
                        return res.status(200).json({message: 'User updated.', user: updatedUser})
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

exports.deleteUser = (req, res, next) => {
    let userId;
    if (req.session.role === 'admin') {
        userId = req.body.userId
    } else {
        userId = req.session.userId
    }
    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                return res.status(200).json({message: 'User deleted.'})
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.getStatsObject = (req, res, next) => {
    Stats.findOne()
        .then(statsObj => res.status(200).json({stats: statsObj}))
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
}

exports.getActiveUserCount = (req, res, next) => {
    User.find()
        .then(users => {
            let currentDate = Date();
            const activeUsers = users.filter(user => {
                user.userActiveUntil > currentDate
            });
            return res.status(200).json({activeUserCount: activeUsers.length})
        })
        .catch(err => {
            const error = new Error(err);
            error.status(500);
            next(error)
        })
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