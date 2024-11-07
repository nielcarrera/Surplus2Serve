import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfile({ userID, initialFullName, onNameChange }) {
  const [firstName, setFirstName] = useState(''); // First name state
  const [lastName, setLastName] = useState(''); // Last name state

  useEffect(() => {
    if (initialFullName) {
      const parts = initialFullName.split(' ');
      setFirstName(parts[0] || ''); // Set first name
      setLastName(parts[1] || '');  // Set last name
    }
  }, [initialFullName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('http://localhost:5000/auth/update-profile', { 
        userID: userID, 
        firstName: firstName, 
        lastName: lastName 
      });
      alert('Profile updated successfully');
      onNameChange(`${firstName} ${lastName}`);  // Notify parent component with updated name
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
            First Name
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full p-2 bg-transparent text-gray-900 outline-none rounded-md"
              placeholder="Enter first name"
            />
          </div>
        </div>

        <div className="w-1/2">
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
            Last Name
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full p-2 bg-transparent text-gray-900 outline-none rounded-md"
              placeholder="Enter last name"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        Update Name
      </button>
    </form>
  );
}

export default EditProfile;
