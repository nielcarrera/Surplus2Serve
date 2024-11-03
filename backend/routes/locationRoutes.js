// routes/locationRoutes.js
const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');
const locationController = require('../controllers/locationController');
const conversationController = require('../controllers/conversationController');


router.get('/locations', locationController.getLocations);

router.get('/category', foodController.getFoodCategory);
router.get('/foodPosted', foodController.getFood);

router.get('/conversations/:userID', conversationController.fetchUserConversations);
router.get('/messages/:conversationId', conversationController.getMessagesForConversation);

router.post('/sendMessage', conversationController.sendMessage);

module.exports = router;
