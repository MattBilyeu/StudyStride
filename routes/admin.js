const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const feedbackController = require('../controllers/feedback'); //Adding feedback routes here since only admins will work with feedback

router.post('/create', adminController.createAdmin);

router.post('/delete', adminController.deleteAdmin);

router.post('/sendPassUpdate', adminController.sendAdminPassUpdate);

router.post('/updatePassword', adminController.updateAdminPassword);

router.post('/emailAll', adminController.emailAllUsers);

router.post('/getAllAdmins', adminController.getAllAdmins);

router.post('/ban', adminController.toggleBanUser);

router.post('/getFeedback', feedbackController.getFeedback);

router.post('/deleteFeedback', feedbackController.deleteFeedback);

router.post('/emailSender', feedbackController.emailSender);

module.exports = router