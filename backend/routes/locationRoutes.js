// routes/locationRoutes.js
const express = require('express');
const router = express.Router();

const foodController = require('../controllers/foodController');
const locationController = require('../controllers/locationController');
const conversationController = require('../controllers/conversationController');

router.get('/locations', locationController.getLocations);
router.post('/add-location', locationController.addLocation);
router.put('/updateLocation', locationController.updateLocation);
router.delete('/delete-location/:locationID', locationController.deleteLocation);

router.get('/category', foodController.getFoodCategory);
router.get('/categorystats' ,foodController.fetchCategoryStats);

router.get('/foodPosted', foodController.getFood);
router.post('/insertFood', foodController.createFoodPost);
router.get('/foodStats', foodController.getFoodStats);


router.post('/insertCategory', foodController.insertFoodCategory);
router.post('/updateCategory', foodController.updateFoodCategory);
router.delete('/deleteCategory/:categoryId', foodController.deleteFoodCategory);


router.get('/conversations/:userID', conversationController.fetchUserConversations);
router.get('/messages/:conversationId', conversationController.getMessagesForConversation);
router.post('/createFoodConversation', conversationController.createFoodConversation);

router.post('/sendMessage', conversationController.sendMessage);
// Update food status endpoint
router.put('/update-food-status', foodController.updateFoodStatus);

router.post('/fetchUser', foodController.fetchUserDetail);

router.get('/fetchPosts/:userId', foodController.fetchFoodPosts);

module.exports = router;
