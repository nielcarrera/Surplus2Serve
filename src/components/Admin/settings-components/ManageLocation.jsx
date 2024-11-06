import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageLocations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  // States for handling inline editing
  const [editingId, setEditingId] = useState(null); // Track which location is being edited
  const [editedNames, setEditedNames] = useState({}); // Track edited location names by ID

  useEffect(() => {
    axios.get('http://localhost:5000/api/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(err => console.error('Error fetching locations:', err));
  }, []);

  const handleAddLocation = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/add-location', { location: newLocation });
        console.log('Location added:', response.data);
        setLocations(prevLocations => [...prevLocations, response.data]);  // Update locations list
        setNewLocation('');  // Clear the input field after adding
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error('Location already exists:', error.response.data.message);
        } else {
            console.error('Error adding location:', error);
        }
    }
};


  const handleDeleteLocation = async (id) => {
    try {
      // Make a DELETE request to delete the location by its ID
      await axios.delete(`http://localhost:5000/api/delete-location/${id}`);
      // Update the state after the location is deleted
      setLocations(prevLocations => prevLocations.filter(location => location.locationID !== id));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };
  

  const handleEditLocation = async (id, newName) => {
    try {
      const response = await axios.put('http://localhost:5000/api/updateLocation', {
        locationID: id,
        location: newName
      });
  
      // Update the locations state based on the response
      setLocations(prevLocations =>
        prevLocations.map(location =>
          location.locationID === id ? { ...location, location: newName } : location
        )
      );
    } catch (error) {
      console.error('Error editing location:', error);
    }
  };
  

  const handleKeyPress = (e, locationId) => {
    if (e.key === 'Enter') {
      const newName = e.target.value;
      handleEditLocation(locationId, newName);
      setEditingId(null); // Stop editing after saving
    }
  };

  const handleStartEditing = (locationId, name) => {
    setEditingId(locationId);
    setEditedNames(prev => ({ ...prev, [locationId]: name }));
  };

  const handleStopEditing = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (locationId) => {
    handleEditLocation(locationId, editedNames[locationId]);
    handleStopEditing();
  };

  return (
    <div>
      <h3>Manage Locations</h3>

      <form onSubmit={handleAddLocation} className="mb-4">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="New Location"
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Location</button>
      </form>

      <table className="min-w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.locationID}>
              <td>{location.locationID}</td>
              <td>
                {editingId === location.locationID ? (
                  <input
                    type="text"
                    value={editedNames[location.locationID] || location.location}
                    onChange={(e) => setEditedNames(prev => ({ ...prev, [location.locationID]: e.target.value }))}
                    onKeyPress={(e) => handleKeyPress(e, location.locationID)}
                    className="border p-2"
                    autoFocus
                  />
                ) : (
                  location.location
                )}
              </td>
              <td>
                {editingId === location.locationID ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(location.locationID)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleStopEditing}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStartEditing(location.locationID, location.location)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDeleteLocation(location.locationID)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageLocations;
