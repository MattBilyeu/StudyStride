const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const feedbackController = require('../controllers/feedback');

router.post('/create', userController.createUser);

router.post('/updateEmail', userController.updateEmail);

router.post('/sendPassUpdate', userController.sendPassUpdate);

router.post('/updatePassword', userController.updatePassword);

router.post('/updateMilestones', userController.updateMilestones);

router.post('/createTopic', userController.createTopic);

router.post('/deleteTopic', userController.deleteTopic);

router.post('/startSession', userController.startSession);

router.post('/endSession', userController.endSession);

router.post('/submitFeedback', feedbackController.createFeedback);

router.post('/seedTime', userController.seedTime);

router.post('/toggleReceiveEmails', userController.toggleReceiveEmails);

router.post('/delete', userController.deleteUser);

router.post('/getStatsObject', userController.getStatsObject);

router.post('/getActiveUsers', userController.getActiveUserCount);