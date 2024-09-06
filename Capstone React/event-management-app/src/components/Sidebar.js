import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, PlusCircle, Calendar, Settings } from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
      <div className="p-6">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/profile"
                className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition duration-150 ease-in-out"
              >
                <UserCircle className="h-5 w-5 mr-3 text-indigo-600" />
                <span className="font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition duration-150 ease-in-out"
              >
                <PlusCircle className="h-5 w-5 mr-3 text-indigo-600" />
                <span className="font-medium">Create Event</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition duration-150 ease-in-out"
              >
                <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                <span className="font-medium">My Events</span>
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;