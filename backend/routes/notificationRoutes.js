const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notificationController');

router.get('/fetchUserNotifs/:userId', notificationController.fetchNotificationsById);

module.exports = router;