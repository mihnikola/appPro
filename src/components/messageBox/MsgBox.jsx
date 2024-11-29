import React, { useState } from 'react';

const MsgBox = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Handle dismissing the success message
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose(); // Execute onClose callback if provided
  };

  if (!isVisible) return null; // Don't render if the message is hidden

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-md flex items-center space-x-3 w-80 z-50">
      {/* Success Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>

      {/* Message */}
      <div className="flex-1">
        <strong className="font-semibold">Success!</strong>
        {/* <p>{message}</p> */}
        <p>Uspešna prijava učinka</p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default MsgBox;
