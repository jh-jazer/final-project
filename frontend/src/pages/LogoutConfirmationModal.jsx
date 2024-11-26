import React from "react";

const LogoutConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onCancel}
          >
            No, Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;