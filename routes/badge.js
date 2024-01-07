const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/:badgeId', userController.renderBadge);

module.exports = router