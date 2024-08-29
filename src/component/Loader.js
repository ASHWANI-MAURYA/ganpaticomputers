import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = ({ message, isLoading, onClose }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-3/4 transition-transform transform-gpu duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="flex justify-center items-center mb-4">
          <AiOutlineLoading3Quarters className="text-gray-600 animate-spin text-4xl" />
        </div>
        <p className="text-gray-700 text-lg font-medium text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loader;
