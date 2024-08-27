// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <head>
        <title>Welcome to BillingApp</title>
        <meta name="description" content="Welcome to your personal billing app" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* Welcome Message */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Welcome to BillingApp</h1>
        <p className="text-base sm:text-lg mb-8 animate-fadeInDelay">Your personal space to manage all your billing needs.</p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        {showSignIn ? (
          <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-80 transform transition duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition duration-300"
              onClick={() => navigate('/dashboard')} // Handle navigation on button click
            >
              Sign In
            </button>
            <p className="mt-4 text-gray-600">Don't have an account? 
              <button
                className="text-indigo-400 hover:underline ml-1"
                onClick={() => setShowSignIn(false)}
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-80 transform transition duration-300">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Sign Up</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition duration-300"
              onClick={() => navigate('/dashboard')} // Handle navigation on button click
            >
              Sign Up
            </button>
            <p className="mt-4 text-gray-600">Already have an account? 
              <button
                className="text-green-400 hover:underline ml-1"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {/* Uncomment if you have a footer */}
      {/* <footer className="absolute bottom-4 text-sm animate-fadeInDelay">
        <p>&copy; 2024 BillingApp. Personal Use Only.</p>
      </footer> */}
    </div>
  );
}
