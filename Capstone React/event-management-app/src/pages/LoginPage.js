import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post('http://localhost:9598/auth/login', {
        username,
        password,
      });

      console.log("Response data:", response.data); // Log entire response data

      const token = response.data; // The response is just the token
      console.log("Extracted token:", token); // Log extracted token

      if (token) {
        // Decode the token to extract user information
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // Log decoded token

        const userRole = decodedToken.role; // Adjust according to actual token structure
        console.log("User role:", userRole); // Log user role

        // Store the token and user role
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('username',username); // Adjust according to actual token structure

        // Redirect based on user role
        if (userRole === 'ADMIN') {
          navigate('/admindashboard'); // Redirect to admin dashboard
        } else {
          navigate('/dashboard'); // Redirect to user dashboard
        }
      } else {
        // If there's no token, set an error message
        setError('Login failed: No token returned');
      }
    } catch (err) {
      // Log detailed error information
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {loading && <div className="text-blue-500 text-center">Loading...</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
