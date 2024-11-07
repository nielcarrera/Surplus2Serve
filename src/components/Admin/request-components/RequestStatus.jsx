import React from 'react';

function RequestRow({ request, handleStatus }) {
  const handleApproveClick = () => {
    alert("Approve button clicked for:", request.foodId);
    handleStatus(request.userId ,request.foodId, 'Approved');
  };

  const handleDenyClick = () => {
    alert("Deny button clicked for:", request.foodId);
    handleStatus(request.userId ,request.foodId, 'Denied');
  };

  return (
    <div className="grid grid-cols-8 p-4 border-t text-sm">
      <span>{request.foodId}</span>
      <span>{request.Name}</span>
      <span>{request.Date}</span>
      <span>{request.location}</span>
      <span>{request.CategoryName}</span>
      <span>{request.Foodname}</span>
      <span>{request.quantity}</span>

      {/* Conditionally render based on the FoodStatus */}
      <span className="flex space-x-2">
        {request.FoodStatus === 'Approved' || request.FoodStatus === 'Denied' ? (
          <span className="text-gray-500 font-semibold">{request.FoodStatus}</span>
        ) : (
          <>
            <button
              onClick={handleApproveClick} // Using the handleApproveClick function
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md"
            >
              Approve
            </button>
            <button
              onClick={handleDenyClick} // Using the handleDenyClick function
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md"
            >
              Deny
            </button>
          </>
        )}
      </span>
    </div>
  );
}

export default RequestRow;
