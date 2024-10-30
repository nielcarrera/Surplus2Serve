// models/locationModel.js
const db = require('../config/db');

// Query to fetch all locations
const getAllLocations = (callback) => {
    const query = 'SELECT * FROM location';
    db.query(query, callback);
};

module.exports = { getAllLocations };
