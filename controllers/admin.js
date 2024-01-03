const Admin = require('../models/admin');
const User = require('../models/user');

const bcrypt = require('bcrypt');

const { sendOne, sendMany } = require('../util/emailer');

exports.createAdmin = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(422).json({message: 'Must be logged in as an admin.'})
    }
    const name = req.body.name;
    const email = req.body.email;
    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            const newAdmin = new Admin({
                name: name,
                email: email,
                password: hashedPassword,
                resetToken: null,
                resetExpiration: null
            });
            newAdmin.save()
                .then(result => {
                    res.status(201).json({message: 'New admin created.'})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Internal server error.'})
                })
        })
}

exports.sendAdminPassUpdate = (req, res, next) => {
    const email = req.body.email;
    let foundAdmin;
    Admin.findOne({email: email})
        .then(admin => {
            if (!admin) {
                return res.status(404).json({message: 'That email is not valid.'})
            } else {
                foundAdmin = admin;
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) {
                        console.log(err);
                        next(new Error('Error creating reset token.'))
                    };
                    const token = buffer.toString('hex');
                    foundAdmin.resetToken = token;
                    foundAdmin.tokenExpiration = Date.now() + (60 * 60 * 1000);
                    foundAdmin.save()
                        .then(result => {
                            sendOne(email, 'Password Reset',
                            `
                                <h1>Password Reset</h1>
                                <p>You requested a password reset.</p>
                                <p>Click this <a href="http://localhost:3000/admin-pass-reset/${token}">link</a> to set a new password.</p>
                            `
                        );
                        res.status(200).json({message: 'Password Reset Sent - Please check your email.'})
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({message: 'Internal server error.'})
                        })
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.updateAdminPassword = (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;
    let foundUser;
    User.findOne({resetToken: token})
        .then(user => {
            if (!user || user.resetExpiration < Date()) {
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

exports.emailAllUsers = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(422).json({message: 'Must be logged in as an admin.'})
    }
    User.find()
        .then(users => {
            const userEmails = users.filter(users => users.receivesEmails).map(user => user.email);
            sendMany(userEmails, req.body.subject, req.body.text);
            return res.status(200).json({message: 'Emails sent.'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.getAllAdmins = (req, res, next) => {
    Admin.find()
        .then(admins => {
            const adminArray = [];
            admins.forEach(admin => {
                const adminObj = {
                    name: admin.name,
                    _id: admin._id
                };
                adminArray.push(adminObj);
            })
            res.status(200).response({message: 'All admins provided.', allAdmins: adminArray})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.deleteAdmin = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(422).json({message: 'Must be logged in as an admin.'})
    }
    Admin.findByIdAndDelete(req.body.adminId)
        .then(result => {
            res.status(200).json({message: 'Admin deleted.'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Internal server error.'})
        })
}

exports.toggleBanUser = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(422).json({message: 'Must be logged in as an admin.'})
    }
    User.findById(req.body.userId)
        .then(user => {
            user.banned = !user.banned;
            user.save()
                .then(updatedUser => {
                    res.status(200).json({message: 'User updated.', user: updatedUser})
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