import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile information
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    // Handle logout functionality
    axios.post('/api/users/logout')
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setError('Failed to logout');
      });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!user) {
    return <div className="text-center">No user data available</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">User Profile</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Username</h3>
            <p className="text-gray-700">{user.username}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-700">{user.email}</p>
          </div>
          {/* Add more user details here as needed */}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
