const foodModel = require('../models/foodModel');

const errorMessage = "Internal Server Error";

const getFoodCategory = (req, res) => {
    foodModel.getAllFoodCategory((err, results) => {
        if (err) return res.status(500).json({ message: errorMessage });
        res.json(results);
    });
};

const getFood = (req, res) => {
    foodModel.getAllFood((err, results) => {
        if (err) return res.status(500).json({ message: errorMessage});
        res.json(results);
    });
}

module.exports = { getFoodCategory, getFood };