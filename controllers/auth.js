const User = require('../models/user');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin');

exports.userLogin = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    let foundUser;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            } else {
                foundUser = user;
                bcrypt.compare(password, user.password)
                    .then(domatch => {
                        if (!domatch) {
                            return res.status(422).json({message: 'Password and Email Combination Not Found'})
                        } else {
                            req.session._id = foundUser._id.toString();
                            req.session.role = 'member';
                            foundUser.password = 'redacted';
                            return res.status(200).json({foundUser})
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

exports.adminLogin = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    let foundUser;
    Admin.findOne({email: email})
        .then(user => {
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            } else {
                foundUser = user;
                bcrypt.compare(password, user.password)
                    .then(domatch => {
                        if (!domatch) {
                            return res.status(422).json({message: 'Password and Email Combination Not Found'})
                        } else {
                            req.session._id = foundUser._id.toString();
                            req.session.role = 'admin';
                            foundUser.password = 'redacted';
                            return res.status(200).json({foundUser})
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