// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const hardcodedEmail = 'spirit@uom.lk';
  const hardcodedPassword = 'hackmeifucam';

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === hardcodedEmail && password === hardcodedPassword) {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-white/10 backdrop-blur-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 text-white placeholder-gray-300 border rounded bg-white/20 border-white/30 focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 text-white placeholder-gray-300 border rounded bg-white/20 border-white/30 focus:outline-none focus:border-white"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 font-semibold text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;