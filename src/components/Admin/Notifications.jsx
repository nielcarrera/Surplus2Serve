import React, { useEffect, useState } from "react";
import axios from 'axios';
import ApprovalModal from "./request-components/ApprovalModal"; // Import the Approval Modal

export default function Notifications({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFoodId, setCurrentFoodId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch notifications
  const fetchData = async () => {
    try {
      const notificationResponse = await axios.get(`http://localhost:5000/notifications/fetchUserNotifs/${userId}`);
      setNotifications(notificationResponse.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to fetch notifications. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

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
      fetchData(); // Refetch all notifications to reset filter
    } else {
      const filtered = notifications.filter((notification) => notification.type === type);
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
      const response = await axios.put('http://localhost:5000/api/update-food-status', {
        id: foodId,
        status: status
      });
      alert(`Request ${foodId} status updated to: ${status}`);
      console.log(response);

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.foodId === foodId ? { ...notification, FoodStatus: status } : notification
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert('There was an error updating the status. Please try again.');
    }
  };

  const handleApprove = () => {
    handleStatus(currentFoodId, 'approved');
    closeModal();
  };

  const handleDeny = () => {
    handleStatus(currentFoodId, 'denied');
    closeModal();
  };

  // If loading, display a loading indicator
  if (loading) {
    return <p>Loading notifications...</p>;
  }

  // If there's an error, display the error message
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.notificationID} className="nc-card p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${notification.type === "Verification Requests" ? "bg-blue-500" : "bg-yellow-500"}`}
                />
                <span className="text-lg font-medium text-gray-700">{notification.message}</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {notification.foodId && (
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => openModal(notification.foodId)}
                >
                  Food ID: {notification.foodId}
                </span>
              )}
              {notification.verificationId && <span>Verification Request ID: {notification.verificationId}</span>}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No notifications available.</p>
      )}
      </div>

      <ApprovalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </div>
  );
}
