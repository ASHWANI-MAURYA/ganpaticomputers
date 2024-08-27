
// 'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../Redux/slices/authSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const handleLogin = async () => {
        dispatch(loginStart());
        try {
            const user = { email, name: 'John Doe' };
            dispatch(loginSuccess(user));
        } catch (err) {
            dispatch(loginFailure('Failed to login'));
        }
    };



    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full p-3 mt-2 text-white rounded-md ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        // onClick={}
                        className="mt-2 text-blue-500 hover:underline"
                    >
                        Sign up here
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
