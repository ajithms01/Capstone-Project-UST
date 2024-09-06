import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [clientId, setClientId] = useState(null);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get(`http://localhost:9598/user/getUser`, {
          params: { username: username }
        });
        setClientId(response.data.id);
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    };

    if (username) {
      fetchClientId();
    }
  }, [username]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (clientId) {
        try {
          const response = await axios.get(`http://localhost:9598/user/events`, {
            params: { userId: clientId }
          });
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchEvents();
  }, [clientId]);

  const handleEventClick = (eventId) => {
    navigate(`/details/${eventId}`);
  };
  
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'events' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Events</h2>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-lg shadow cursor-pointer"
                    onClick={() => handleEventClick(event.id)}
                  >
                    <h3 className="font-semibold text-lg text-gray-800">{event.name}</h3>
                    <p className="text-gray-600">{event.type} on {event.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Profile</h2>
              <p className="text-gray-600">Profile content goes here.</p>
            </div>
          )}
          {activeTab === 'create-event' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Event</h2>
              <p className="text-gray-600">Event creation form goes here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
