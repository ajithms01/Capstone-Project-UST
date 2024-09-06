import {User,LogOut} from 'lucide-react';
  // Retrieve username from localStorage

function AdminNavBar(){
  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('clientId');

    // Redirect to login page or any other action needed after logout
    window.location.href = '/login';
  };
    return(
    <div>
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-600">Eventio</h1>
    <div className="flex items-center space-x-6">
      <span className="flex items-center text-gray-700">
        <User className="mr-2" />
        <span className="font-medium">Admin</span>
      </span>
      <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                Logout
              </button>
    </div>
  </nav>
  </div>
  );
}
export default AdminNavBar;