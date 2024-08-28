import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      {/* <img src="/path/to/logo.png" alt="App Logo" className="w-24 h-24 mb-8" /> */}
      <h1 className="text-4xl font-bold mb-4">Welcome to <span className='text-black'>Ganpati Computers</span></h1>
      <p className="text-lg mb-8">Computer Repair and Maintenance.</p>
      <div className="flex space-x-4">
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition duration-300">
          Login
        </button>
        <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
