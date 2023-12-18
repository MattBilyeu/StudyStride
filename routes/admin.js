const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const feedbackController = require('../controllers/feedback'); //Adding feedback routes here since only admins will work with feedback

router.post('/create', adminController.createAdmin);

router.post('/delete', adminController.deleteAdmin);

router.post('/ban', adminController.banUser);

router.post('/createFeedback', feedbackController.createFeedback);

router.post('/deleteFeedback', feedbackController.deleteFeedback);

router.post('/emailSender', feedbackController.emailSender);

router.post('/acknowledgeFeedback', feedbackController.acknowledgeFeedback);