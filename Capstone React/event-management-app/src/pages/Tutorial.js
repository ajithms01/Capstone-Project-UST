import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'AIzaSyDLK4BMsbTpUgkO9a4PVl2G0pVvmASppxg';

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Tutorials',
    href: '/tutorials',
  },
];

const Tutorial = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=tips for organizing ${searchTerm}&type=video&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  const handleVideoClick = (videoId) => {
    // Construct the YouTube video URL using the video ID
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    navigate(youtubeUrl); // Use useNavigate to redirect to the YouTube URL
  };

  return (
    <div className="w-full">
      <header className="relative w-full border-b bg-white pb-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="inline-flex items-center space-x-2">
            <span className="font-bold">Eventio</span>
          </div>
          <div>
            <ul className="inline-flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </div>
      </header>

      <h1 className="text-3xl font-bold mt-6 mb-6 text-center font-poppins">Need Ideas?</h1>
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter event type (e.g., wedding, conference)"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
        />
        <button onClick={searchVideos} className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Search size={24} />
        </button>
      </div>
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white rounded-lg w-96 shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{video.snippet.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{video.snippet.description}</p>
              <button
                onClick={() => handleVideoClick(video.id.videoId)}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Watch Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;