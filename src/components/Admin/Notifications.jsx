import React, { useState } from "react";
import axios from 'axios';
import ApprovalModal from "./request-components/ApprovalModal"; // Import the Approval Modal

export default function Notifications() {
  // Dummy data for notifications with added date, time, and IDs
  const initialNotifications = [
    {
      id: 1,
      type: "Verification Requests",
      description: "@janedoe123 posted a verification request.",
      date: "2024-11-07T10:00:00.000Z",
      verificationId: "13", 
    },
    {
      id: 2,
      type: "Food Approvals",
      description: "@janedoe123 posted a food for approval.",
      date: "2024-11-07T11:30:00.000Z",
      foodId: "12", 
    },
    {
      id: 3,
      type: "Verification Requests",
      description: "@brentfaiyaz1 posted a verification request.",
      date: "2024-11-06T14:00:00.000Z",
      verificationId: "12", 
    },
    {
      id: 4,
      type: "Food Approvals",
      description: "@brentfaiyaz1 posted a food for approval.",
      date: "2024-11-06T16:15:00.000Z",
      foodId: "1", 
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFoodId, setCurrentFoodId] = useState(null);

  // Function to format the date and time without milliseconds
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Sorting and filtering handlers
  const handleSort = (type) => {
    if (type === "All") {
      setNotifications(initialNotifications); // Show all notifications
    } else {
      const filtered = initialNotifications.filter((notification) => notification.type === type);
      setNotifications(filtered);
    }
  };

  // Modal actions
  const openModal = (foodId) => {
    setCurrentFoodId(foodId);
    setIsModalOpen(true); // Open modal with specific foodId
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setCurrentFoodId(null); // Reset the current foodId
  };

  const handleStatus = async (foodId, status) => {
    try {
      // Await the axios request to ensure it completes before proceeding
      const response = await axios.put('http://localhost:5000/api/update-food-status', {
        id: foodId,
        status: status
      });

      // Handle the response
      alert(`Request ${foodId} status updated to: ${status}`);
      console.log(response);

      // Update the filtered requests locally (simulating a backend update)
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.foodId === foodId ? { ...notification, FoodStatus: status } : notification
        )
      );
    } catch (err) {
      // Handle any errors that occur during the API call
      console.error("Error updating status:", err);
      alert('There was an error updating the status. Please try again.');
    }
  };

  const handleApprove = () => {
    // Call handleStatus with 'approved' when user clicks approve
    handleStatus(currentFoodId, 'approved');
    closeModal(); // Close the modal after the action
  };

  const handleDeny = () => {
    // Call handleStatus with 'denied' when user clicks deny
    handleStatus(currentFoodId, 'denied');
    closeModal(); // Close the modal after the action
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Notifications</h1>

      <div className="buttons-container flex space-x-4 mb-6">
        <button
          onClick={() => handleSort("All")}
          className="btn py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ease-in-out shadow-md"
        >
          View All
        </button>
        <button
          onClick={() => handleSort("Verification Requests")}
          className="btn py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 ease-in-out shadow-md"
        >
          Verification Requests
        </button>
        <button
          onClick={() => handleSort("Food Approvals")}
          className="btn py-2 px-6 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition duration-200 ease-in-out shadow-md"
        >
          Food Approvals
        </button>
      </div>

      <div className="notifications-container space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="nc-card p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${notification.type === "Verification Requests" ? "bg-blue-500" : "bg-yellow-500"}`}
                />
                <span className="text-lg font-medium text-gray-700">{notification.description}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {notification.foodId && (
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => openModal(notification.foodId)} // Open modal when clicking on food ID
                >
                  Food ID: {notification.foodId}
                </span>
              )}
              {notification.verificationId && <span>Verification Request ID: {notification.verificationId}</span>}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* The ApprovalModal will be passed state to open/close and approval actions */}
      <ApprovalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
}