import React from 'react';
import { User, LogOut } from 'lucide-react';

function NavBar() {
  // Retrieve username from localStorage
  const username = localStorage.getItem('username') || 'UserName';

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('clientId');

    // Redirect to login page or any other action needed after logout
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600 font-poppins">Eventio</h1>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative inline-block text-left">
                <div>
                  <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <User className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    {username}
                  </button>
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;