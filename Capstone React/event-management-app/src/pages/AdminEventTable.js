import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';

function AdminEventTable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:9598/api/event');
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderTable = () => {
    if (loading) return <p>Loading events...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (events.length === 0) return <p>No events found.</p>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor IDs</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue ID</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.id}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{format(new Date(event.date), 'yyyy-MM-dd')}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.type}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.userId}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.vendorIds.join(', ')}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.venueId}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.paymentStatus ? 'Paid' : 'Unpaid'}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex-1">
        <AdminNavBar />
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4 mx-4">
          <h2 className="text-2xl font-bold mb-4">Event List</h2>
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default AdminEventTable;