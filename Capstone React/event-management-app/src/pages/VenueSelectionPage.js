import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const VenueCard = ({ venue, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
    <div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{venue.venueName}</h3>
      <p className="text-gray-600">Capacity: {venue.capacity}</p>
      <p className="text-gray-600">Rent: ${venue.rent}</p>
    </div>
    <button 
      onClick={() => onSelect(venue)}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
    >
      Select Venue
    </button>
  </div>
);

const VenueSelectionPage = () => {
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [randomVenues, setRandomVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const eventDetails = location.state?.eventDetails || {};
  const [date, setDate] = useState(eventDetails.eventDate ? new Date(eventDetails.eventDate) : new Date());
  const locationValue = eventDetails.eventLocation || 'Maharashtra'; // Default location if not available
console.log(eventDetails);
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await axios.get('http://localhost:9598/venue/getByLocation', {
          params: {
            date: formattedDate,
            location: locationValue,
          }
        });

        if (response.status === 200) {
          const venues = response.data;

          // Shuffle venues and select 4 random venues
          const getRandomVenues = (venues, num) => {
            const shuffled = [...venues].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
          };

          const randomSelection = getRandomVenues(venues, 4);
          setRandomVenues(randomSelection);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        setError(`Failed to fetch venues: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [date, locationValue]);

  const handleSelectVenue = (venue) => {
    if (!selectedVenues.find(v => v.venueId === venue.venueId)) {
      setSelectedVenues([...selectedVenues, venue]);
      setTotalBudget(totalBudget + venue.rent);
    }
  };

  const handleRemoveVenue = (venue) => {
    setSelectedVenues(selectedVenues.filter(v => v.venueId !== venue.venueId));
    setTotalBudget(totalBudget - venue.rent);
  };

  const handleNext = () => {
    navigate('/addons', { state: { eventDetails, selectedVenues } });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="p-6 h-full overflow-auto flex space-x-6 w-full">
          <div className="w-3/4 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Venues</h2>
            {loading ? (
              <p>Loading venues...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomVenues.map(venue => (
                  <VenueCard key={venue.venueId} venue={venue} onSelect={handleSelectVenue} />
                ))}
              </div>
            )}
            <div className="flex justify-end mt-6">
              <button 
                onClick={handleNext} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Next
              </button>
            </div>
          </div>
          
          <div className="w-1/4 bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Selected Venues</h2>
            <div className="space-y-4">
              {selectedVenues.map(venue => (
                <div key={venue.venueId} className="flex justify-between items-center">
                  <span className="text-gray-800">{venue.venueName}</span>
                  <button
                    onClick={() => handleRemoveVenue(venue)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-300">
              <h3 className="text-xl font-semibold text-gray-800">Total Budget</h3>
              <p className="text-2xl font-bold text-gray-800">${totalBudget}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSelectionPage;
