// controllers/locationController.js
const locationModel = require('../models/locationModel');

const getLocations = (req, res) => {
    locationModel.getAllLocations((err, results) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(results);
    });
};

module.exports = { getLocations };
