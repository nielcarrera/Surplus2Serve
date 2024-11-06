import React from 'react';
import EditProfile from './settings-components/EditProfile';
import ManageCategories from './settings-components/ManageCategories';
import ManageLocation from './settings-components/ManageLocation';
import VerificationRequests from './settings-components/VerificationRequests';

function Settings({userID, fullName}) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Settings</h2>

      <div className="space-y-8">
        {/* Edit Profile Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h3>
          <EditProfile 
            userID = {userID}
            initialFullName = {fullName}
          />
        </div>

        {/* Manage Categories Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Categories</h3>
          <ManageCategories />
        </div>

        {/* Manage Location Section */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Locations</h3>
          <ManageLocation />
        </div>

        {/* Verification Requests Section */}
        {/* <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Verification Requests</h3>
          <VerificationRequests />
        </div> */}
      </div>
    </div>
  );
}

export default Settings;
