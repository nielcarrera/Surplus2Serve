// controllers/locationController.js
const locationModel = require('../models/locationModel');

const getLocations = (req, res) => {
    locationModel.getAllLocations((err, results) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error' });
        res.json(results);
    });
};

const addLocation = (req, res) => {
    const { location } = req.body;  // Get the location from the request body

    // Check if location is provided
    if (!location) {
        return res.status(400).json({ message: 'Location is required' });
    }

    // Step 1: Fetch all locations from the database
    locationModel.getAllLocations((err, results) => {
        if (err) {
            console.error('Error fetching locations:', err);
            return res.status(500).json({ message: 'Error fetching locations' });
        }

        // Step 2: Check if the location already exists in the fetched locations
        const locationExists = results.some(loc => loc.location.toLowerCase() === location.toLowerCase());

        // If location already exists, send a response indicating it
        if (locationExists) {
            return res.status(409).json({ message: 'Location already exists' });
        }

        // Step 3: Location does not exist, proceed with insertion
        locationModel.addLocation(location, (err, results) => {
            if (err) {
                console.error('Error adding location:', err);
                return res.status(500).json({ message: 'Error adding location' });
            }

            // Successfully added the location, return the new location data
            res.status(201).json({
                message: 'Location added successfully',
                locationID: results.insertId,  // Get the ID of the newly inserted location
                location
            });
        });
    });
};

module.exports = { addLocation };

const updateLocation = (req, res) => {
    const { locationID, location } = req.body;
  
    if (!location || !locationID) {
      return res.status(400).json({ message: 'Location and Location ID are required' });
    }
  
    locationModel.updateLocation(locationID, location, (err, results) => {
      if (err) {
        console.error('Error updating location:', err);
        return res.status(500).json({ message: 'Error updating location' });
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
  
      res.status(200).json({ locationID, location });
    });
  };
const deleteLocation = (req, res) => {
    const { locationID } = req.params;  // Get locationID from the route parameter

    // Check if locationID is provided
    if (!locationID) {
        return res.status(400).json({ message: 'Location ID is required' });
    }

    // Call the model function to delete the location
    locationModel.deleteLocation(locationID, (err, results) => {
        if (err) {
            console.error('Error deleting location:', err);
            return res.status(500).json({ message: 'Error deleting location' });
        }

        // If no rows were affected, the location was not found
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Successfully deleted the location
        res.status(200).json({ message: 'Location deleted successfully', locationID });
    });
};
  

module.exports = { 
    getLocations,
    addLocation,
    updateLocation,
    deleteLocation
 };
