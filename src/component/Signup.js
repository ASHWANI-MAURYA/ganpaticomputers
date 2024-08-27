// components/Signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../slices/authSlice';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleSignup = async () => {
    dispatch(signupStart());
    try {
      // Simulate API call
      const user = { email, name: 'Jane Doe' };
      dispatch(signupSuccess(user));
    } catch (err) {
      dispatch(signupFailure('Failed to signup'));
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup} disabled={loading}>Signup</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Signup;
