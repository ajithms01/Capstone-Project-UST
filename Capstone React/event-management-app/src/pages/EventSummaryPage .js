import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';

const EventSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientId, setClientId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const username = localStorage.getItem('username');

  // Fetch clientId based on username
  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await axios.get('http://localhost:9598/user/getUser', {
          params: { username: username },
        });
        const fetchedClientId = response.data.id; // Adjust this line based on the actual response structure
        setClientId(fetchedClientId);
      } catch (error) {
        console.error('Error fetching client ID:', error);
      }
    };

    if (username) {
      fetchClientId();
    }
  }, [username]);

  // Extracting state or defaulting to empty arrays and objects
  const { selectedVenues = [], selectedAddOns = [], totalBudget = 0, eventDetails = {} } = location.state || {};

  // Debugging: Log data to verify content
  console.log('Event Details:', eventDetails);
  console.log('Selected Venues:', selectedVenues);
  console.log('Selected Add-Ons:', selectedAddOns);
  console.log('Total Budget:', totalBudget);

  const handleSubmit = async () => {
    try {
      // Extract venueId from the first item in selectedVenues array
      const venueId = selectedVenues.length > 0 ? selectedVenues[0].venueId : null;
      
      // Ensure all necessary data is included in the payload
      const eventPayload = {
        name: eventDetails.eventName || "Sample Event",
        date: eventDetails.eventDate ? new Date(eventDetails.eventDate).toISOString() : new Date().toISOString(),
        type: eventDetails.eventType || "General",
        userId: clientId,
        vendorIds: selectedAddOns.map(addOn => addOn.vendorId),
        venueId: venueId,
        guestList: eventDetails.guestList || [] // Ensure guestList is an array, even if empty
      };
  
      console.log('Submitting event payload:', eventPayload); // Log payload
  
      const response = await axios.post('http://localhost:9598/api/event', eventPayload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Response from API:', response); // Log response

      if (response.status === 200) {
        // Save the eventId from the response if available
        const createdEventId = response.data.id;
        setEventId(createdEventId);

        // Generate the invoice
        await generateInvoice(createdEventId);
        
        // Send order info to all vendors
        // await sendOrderInfo(createdEventId, eventPayload.vendorIds);
      await sendOrderInfo(createdEventId, eventPayload.vendorIds);
        navigate('/dashboard');
      } else {
        console.error('Failed to create event:', response.data);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const generateInvoice = async (eventId) => {
    try {
      // Construct URL with eventId parameter
      const url = `http://localhost:9598/employee/invoice/${eventId}`;
      
      // Make the GET request
      const response = await axios.get(url);
      
      // Handle the response
      console.log('Invoice data:', response.data);
      // You might want to save or display the invoice data
    } catch (error) {
      console.error('Error fetching invoice:', error);
      // Handle the error appropriately
    }
  };

  const sendOrderInfo = async (eventId, vendorIds) => {
    try {
        // Check if vendorIds is an array
        if (!Array.isArray(vendorIds)) {
            throw new TypeError('vendorIds is not an array');
        }

        // Iterate over the vendor IDs and send the order info to each vendor
        for (let vendorId of vendorIds) {
            // Construct the URL
            const url = `http://localhost:9598/api/event/${eventId}/${vendorId}?eventId=${eventId}&vendorId=${vendorId}`;

            // Send the POST request
            const response = await axios.post(url, {}); // If you need to send additional data, replace {} with the actual payload
            
            console.log(`Order info sent successfully for vendorId ${vendorId}:`, response.data);
        }
    } catch (error) {
        console.error('Error sending order info:', error);
    }
};

  const handleEdit = () => {
    // Navigate back to the previous page to allow editing
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Event Summary */}
        <div className="p-4 md:p-6 lg:p-8 xl:p-10 flex-1 mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Event Summary</h2>
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Event Name</h3>
                <p className="text-base md:text-xl text-gray-900">{eventDetails.eventName || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Host</h3>
                <p className="text-base md:text-xl text-gray-900">{eventDetails.host || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Date</h3>
                <p className="text-base md:text-xl text-gray-900">
                  {eventDetails.eventDate ? new Date(eventDetails.eventDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Venues</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedVenues.length > 0 ? (
                    selectedVenues.map((venue) => (
                      <li key={venue.venueId} className="text-base md:text-xl text-gray-900">
                        {venue.name} - ${venue.rent}
                      </li>
                    ))
                  ) : (
                    <li className="text-base md:text-xl text-gray-900">No venues selected</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Add-Ons</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedAddOns.length > 0 ? (
                    selectedAddOns.map((addOn) => (
                      <li key={addOn.vendorId} className="text-base md:text-xl text-gray-900">
                        {addOn.vendorName} - ${addOn.rate}
                      </li>
                    ))
                  ) : (
                    <li className="text-base md:text-xl text-gray-900">No add-ons selected</li>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Total Budget</h3>
                <p className="text-xl md:text-2xl font-bold text-gray-900">${totalBudget}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSummaryPage;
