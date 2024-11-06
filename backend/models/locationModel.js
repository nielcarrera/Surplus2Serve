// models/locationModel.js
const db = require('../config/db');

// Query to fetch all locations
const getAllLocations = (callback) => {
    const query = 'SELECT * FROM location';
    db.query(query, callback);
};
const addLocation = (location, callback) => {
    const query = 'INSERT INTO location (location) VALUES (?);';
    db.query(query, [location], callback);  // Insert the location value
};
const updateLocation = (id, newName, callback) => {
    const query = 'UPDATE location SET location = ? WHERE locationID = ?;';
    db.query(query, [newName, id], callback);  // Correct usage of db.query
};
const deleteLocation = (locationID, callback) => {
    const query = 'DELETE FROM location WHERE locationID = ?;';
    db.query(query, [locationID], callback);
};
module.exports = { 
    getAllLocations,
    addLocation,
    updateLocation,
    deleteLocation
};
