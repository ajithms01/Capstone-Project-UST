import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/AdminSideBar';

function ApprovalPage() {
  const [vendors, setVendors] = useState([]);

  // Function to fetch the vendors
  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:9598/vendor/status?status=PENDING');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      // Handle the error appropriately
    }
  };

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, []); // Empty dependency array to fetch on mount only

  // Handle vendor approval or rejection
  const handleApproval = async (vendorId, approved) => {
    try {
      if (approved) {
        // Approve the vendor
        await axios.put(`http://localhost:9598/vendor/approveVendor/${vendorId}`);
      } else {
        // Remove the vendor
        const response = await axios.delete(`http://localhost:9598/vendor`, {
          params: { id: vendorId }
        });
        if (response.status === 200) {
          // Refresh the vendors list after approval or rejection
          fetchVendors();
        } else {
          console.error('Error deleting vendor:', response);
        }
      }
      fetchVendors();
    } catch (error) {
      console.error('Error updating vendor status:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <AdminNavBar />

        {/* Approval Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 mx-6">
          <h3 className="text-xl font-semibold mb-4">Vendor Approval</h3>
          <div>
            {vendors.length > 0 ? (
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Vendor Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Rate</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map(vendor => (
                    <tr key={vendor.vendorId} className="text-center">
                      <td className="py-2">{vendor.vendorName}</td>
                      <td className="py-2">{vendor.vendorEmail}</td>
                      <td className="py-2">{vendor.vendorPhone}</td>
                      <td className="py-2">{vendor.vendorLocation}</td>
                      <td className="py-2">{vendor.type}</td>
                      <td className="py-2">{vendor.rate}</td>
                      <td className="py-2">
                        <button
                          onClick={() => handleApproval(vendor.vendorId, true)}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => handleApproval(vendor.vendorId, false)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          ✗
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pending vendors to approve.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalPage;
