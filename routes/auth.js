const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/userLogin', authController.userLogin);

router.post('/adminLogin', authController.adminLogin);

module.exports = router