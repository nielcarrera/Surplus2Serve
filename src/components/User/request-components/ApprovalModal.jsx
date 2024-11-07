import React from 'react';

function ApprovalModal({ isOpen, onClose, onApprove, onDeny }) {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Food Approval</h3>
        <p className="mb-4">Do you want to approve or deny this request?</p>

        <div className="flex space-x-4">
          <button
            onClick={() => { onApprove(); onClose(); }}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => { onDeny(); onClose(); }}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Deny
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times; Close
        </button>
      </div>
    </div>
  );
}

export default ApprovalModal;
