// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/fetchUser', authController.fetchUserDetail);
router.post('/fetchName', authController.getUserFullName);
// Route for updating user profile
router.put('/update-profile', authController.updateProfile);
router.put('/update-user', authController.updateUsername);
module.exports = router;
