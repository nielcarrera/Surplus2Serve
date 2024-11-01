// routes/locationRoutes.js
const express = require('express');
const foodController = require('../controllers/foodController');
const locationController = require('../controllers/locationController');
const router = express.Router();

router.get('/locations', locationController.getLocations);
router.get('/category', foodController.getFoodCategory);
router.get('/foodPosted', foodController.getFood);

module.exports = router;
