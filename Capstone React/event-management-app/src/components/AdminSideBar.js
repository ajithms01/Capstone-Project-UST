import { Link } from 'react-router-dom';

function AdminSideBar() {
    return (
        <div className="w-64 bg-blue-600 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Welcome, Admin</h2>
          <ul className="space-y-4">
            <li>
              <a href="/adminprofile" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">Profile</a>
            </li>
            <li>
              <a href="/admindashboard" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">Events</a>
            </li>
            <li>
              <a href="/approval" className="block py-2 px-4 text-lg hover:bg-blue-700 rounded transition duration-300 ease-in-out">Approve</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default AdminSideBar;