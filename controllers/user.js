const User = require('../models/user');
const Badge = require('../models/badge');
const Stats = require('../models/stats');

const { sendOne } = require('../util/emailer');

const crypto = require('crypto');
const bcrypt = require('bcrypt');

function formatDate(date) {
    const day = String(date.getMonth() + 1).padStart(2, '0');
    const month = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}

function resolveMilestones(oldArray, newArray) {
    let newMilestones = 0;
    for (let i = 0; i < newArray.length; i++) { //Finds out if any new topics have been added.  This is so that the total milestones created app stat can be updated when users log new milestones.
        const found = oldArray.findIndex(item => item.topic === newArray[i].topic); //Checks each topic in the new array to see if it exists in the old array.  If it doesn't, then the milestones is iterated.
        if (found !== -1) {
            newMilestones += 1
        }
    };
    if (newMilestones !== 0) {
        Stats.findOne()
            .then(stats => {
                stats.milestonesCreated += newMilestones;
                stats.save()
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({message: 'Internal server error.'})
            })
    }
}

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email.toLowerCase(); //Done to ensure emails are case insensitive.  Login attempts also do this to whatever email is entered.
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if (user) {
                return res.status(422).json({message: 'A user with that email already exists.'})
            } else {
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const futureTimeStamp = Date() + (30 * 24 * 60 * 60 * 1000);
                        const futureDate = new Date(futureTimeStamp);
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            createDate: new Date(),
                            receivesEmails: true,
                            totalTime: 0,
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
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
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
            if (!user || user._id.toString() !== req.session.userId.toString()) {
                return res.status(422).json({message: 'Your email update attempt has failed, please try again.'})
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
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
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
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.updatePassword = (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    let foundUser;
    User.findOne({resetToken: token})
        .then(user => {
            const tokenExpiration = new Date(user.resetTokenExpiration);
            if (!user || tokenExpiration.getTime() < Date.now()) { //Checks if the token is not found or if it is expired, does not update password if it is.
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
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.updateMilestones = (req, res, next) => {
    const newMilestones = req.body.milestones;
    User.findById(req.session.userId)
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
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.createTopic = (req, res, next) => {
    const title = req.body.title;
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                const foundTopic = user.topics.findIndex(topicObj => topicObj.topic === req.body.title); //Does not allow the same topic to be added twice
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
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.deleteTopic = (req, res, next) => {
    console.log(req.body);
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                const topic = req.body.topic;
                if (req.body.mergeTopic !== 'None') { //If the user has selected a merge topic, push all timestamps from the topic to be deleted into the merge topic.
                    const mergeTopic = req.body.mergeTopic;
                    const mergeIndex = user.topics.findIndex(topicObj => topicObj.topic === mergeTopic);
                    const topicIndex = user.topics.findIndex(topicObj => topicObj.topic === topic);
                    user.topics[mergeIndex].timestamps = user.topics[mergeIndex].timestamps.concat(user.topics[topicIndex].timestamps)
                };
                user.topics = user.topics.filter(topicObj => topicObj.topic !== topic); //Filters out the topic to be deleted, then saves the user with the updated topics array.
                user.save()
                    .then(updatedUser => {
                        return res.status(200).json({message: 'Topic deleted.', user: updatedUser})
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
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
                const currentDate = new Date();
                user.userActiveUntil = currentDate.getTime() + (30 * 24 * 60 * 60 * 1000); //Updates the user's active until date to 30 days from now - this is for app stats so admins can see how many users are active
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
                                console.log(err);
                                res.status(500).json({message: 'Internal server error.'})
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
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
                const stopTime = new Date();
                const startTime = new Date(user.activeSession.start)
                const duration = (stopTime.getTime() - startTime.getTime())/(1000 * 60);
                dur = duration;     //Results in the total duration of time spent studying this session.
                const index = user.topics.findIndex(topicObj => topicObj.topic === user.activeSession.topic);
                if (index !== -1) {
                    user.totalTime += +duration;
                    const timeStampObj = {stamp: stopTime, duration: duration};
                    user.topics[index].timestamps.push(timeStampObj);   //Saves the user's study session to their topic's timestamps array.
                };
                user.activeSession = null;
                const activeUntil = startTime.getTime() + (1000 * 60 * 60 * 24 * 30);
                user.userActiveUntil = new Date(activeUntil);
                const wholeHoursStudied = Math.floor(user.totalTime/60);
                if (wholeHoursStudied > ((user.badges.length + 1) * 10)) {   //Compares the total study time to the number of badges the user has earned to see if they have earned a new badge.
                    const newBadge = new Badge({    //The user earns a new badge ever 10 hours, so they are given a new badge if they have 10 hours more study time than 10*number of badges.
                        owner: user._id,
                        ownerName: user.name,
                        text: `${user.name} has earned a new badge!  That's another 10 hours spent studying, for a total of ${wholeHoursStudied} hrs.  Great work ${user.name}!  What dedication!`,
                        dateEarned: formatDate(new Date())
                    });
                    newBadge.save()
                        .then(badge => {
                            if (user.receivesEmails) {
                                const emailBody = `
                                <h1>Contratulations ${user.name}!</h1>  
                                <p>You've earned a new Study Streak Badge!<p>
                                <br>
                                <p>You can view your new badge <a href="study-stride.com/badge/${badge._id}"><strong>HERE.</strong></a></p>
                            `
                            sendOne(user.email, `You've earned a Study Streak Badge from Study Stride!`, emailBody);
                            }
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
                            console.log(err);
                            res.status(500).json({message: 'Internal server error.'})
                        })
                } else {
                    user.save()
                        .then(updatedUser => {
                            return res.status(200).json({message: 'Session ended.', user: updatedUser})
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({message: 'Internal server error.'})
                        })
                };
                Stats.findOne()
                    .then(stats => {
                        stats.totalStudyTime += (dur/60);
                        stats.save()
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.seedTime = (req, res, next) => { //Used to create the result of ending a session but with the desired number of minutes.  It is meant to allow negative numbers.
    const seedTime = req.body.seedTime;
    const seedTopic = req.body.seedTopic;
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                const index = user.topics.findIndex(topicObj => topicObj.topic === seedTopic);
                if (index === -1) {
                    return res.status(404).json({message: `${seedTopic} was not found.`})
                } else {
                    const timestamp = {stamp: new Date(), duration: seedTime};
                    user.topics[index].timestamps.push(timestamp);
                    user.totalTime += seedTime;
                    user.save()
                        .then(updatedUser => {
                            return res.status(200).json({message: 'Time seeded.', user: updatedUser})
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({message: 'Internal server error.'})
                        })
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
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
                        console.log(err);
                        res.status(500).json({message: 'Internal server error.'})
                    })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.deleteUser = (req, res, next) => {
    const userId = req.body.userId
    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({message: 'User not found.'})
            } else {
                return res.status(200).json({message: 'User deleted.', user: null})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.getStatsObject = (req, res, next) => {
    Stats.findOne()
        .then(statsObj => res.status(200).json(statsObj))
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.getActiveUserCount = (req, res, next) => {
    User.find()
        .then(users => {
            let currentDate = Date.now();
            const activeUsers = users.filter(user => {
                return user.userActiveUntil.getTime() > currentDate
            });
            return res.status(200).json({allUsers: users.length, activeUsers: activeUsers.length})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.renderBadge = (req, res, next) => {
    const badgeId = req.params.badgeId;
    console.log(badgeId);
    Badge.findById(badgeId)
        .then(badge => {
            if (!badge) {
                return res.render('error')
            };
            res.render('badge', { //This uses the badge ID to render a badge page with EJS.  I used EJS here instead of an angular component so I could easily bind unique descriptions for the sake of social sharing.
                ownerName: badge.ownerName,
                text: badge.text,
                dateEarned: badge.dateEarned,
                id: badge._id
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}