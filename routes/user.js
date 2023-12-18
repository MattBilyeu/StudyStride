const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/create', userController.createUser);

router.post('/updateEmail', userController.updateEmail);

router.post('/sendEmailUpdate', userController.sendEmailUpdate);

router.post('/sendPassUpdate', userController.sendPassUpdate);

router.post('/updatePassword', userController.updatePassword);

router.post('/updateMilestones', userController.updateMilestones);

router.post('/createTopic', userController.createTopic);

router.post('/startSession', userController.startSession);

router.post('/endSession', userController.endSession);

router.post('/seedTime', userController.seedTime);

router.post('/toggleReceiveEmails', userController.toggleReceiveEmails);

router.post('/delete', userController.deleteUser);