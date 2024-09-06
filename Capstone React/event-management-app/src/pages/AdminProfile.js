import React, { useState, useEffect } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';
import axios from 'axios'; // For making API calls

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    name: '',
  });

  useEffect(() => {
    // Get the username from local storage
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      // Fetch user details from the backend
      axios.get(`http://localhost:9598/user/getUser?username=${storedUsername}`)
        .then(response => {
          if (response.data) {
            setUserDetails({
              username: response.data.username,
              email: response.data.email,
              name: response.data.name,
            });
          } else {
            alert('User not found');
          }
        })
        .catch(error => {
          console.error('There was an error fetching the user details!', error);
          alert('Failed to fetch user details.');
        });
    } else {
      alert('No username found in local storage');
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
    <AdminSideBar/>
    <div className="flex-1">
      <AdminNavBar/>
      <div className="bg-white p-4 rounded-lg shadow-lg mt-4 mx-4">

        {/* User Details Display */}
        <div className="p-10 max-w-3xl mx-auto h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">User Profile</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-lg font-medium text-gray-700">Username</label>
                <p className="text-xl text-gray-800">{userDetails.username}</p>
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-gray-700">Name</label>
                <p className="text-xl text-gray-800">{userDetails.name}</p>
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-gray-700">Email</label>
                <p className="text-xl text-gray-800">{userDetails.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
