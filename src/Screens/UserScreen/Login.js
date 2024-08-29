// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../component/User/GlobalState'
import { url } from '../../API/Config';
import Loader from '../../component/Loader';
export default function Welcome() {
  const { state, dispatch } = useGlobalState()
  const [isLoading, setIsLoading] = useState(false);
  const [email, setemail] = useState('ahjhja');
  const [password, setpassword] = useState('ghhgh');
  const navigate = useNavigate(); // Hook for navigation
  const Login = () => {
    if (!email || email == "") {
      alert('Enter Your Email')
      return
    }
    if (!password || password == "") {
      alert('Enter Your Password')
      return
    }
    setIsLoading(true)
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        "password": password,
        "email": email
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch(url + `api/users/Signin`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setIsLoading(false)
          if (result.data.status == 1) {
            dispatch({ type: 'LOGIN', payload: result.data });
            navigate('/')
          }
          else {
            setIsLoading(false)
            alert('Something Went Wrong')
          }
        })
        .catch((error) => console.error(error));
    } catch (e) {
      console.log(e.message)
      setIsLoading(false)
    } 
  }
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Loader
        message={`Please Wait..`}
        isLoading={isLoading}
      />
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Welcome to Ganpati computers
        </h1>
        <p className="text-base sm:text-lg mb-8 animate-fadeInDelay">Your personal space to manage all your billing needs.</p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        <div className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-80 transform transition duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">Sign In</h2>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="Email">
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            id='Email'
            type="Email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => {
              let value = e.target.value;
              // Remove any non-numeric characters, including the decimal point
              // value = value.replace(/[^0-9]/g, "");
              // Limit the length to 12 digits
              // if (value.length <= 10) {
              setemail(value);
              // }
            }}
          />
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            password <span className='text-red-500'>*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-white p-3 rounded hover:bg-indigo-700 transition duration-300"
            onClick={Login} // Handle navigation on button click
          > Sign In </button>
        </div>

      </div>
    </div>
  );
}
