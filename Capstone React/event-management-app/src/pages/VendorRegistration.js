import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorRegistrationPage = () => {
  const [vendorDetails, setVendorDetails] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorPhone: '',
    vendorLocation: '',
    type: '',
    rate: '',
    provides: [],
  });
  const navigate = useNavigate();

  const handleProvidesChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setVendorDetails((prev) => ({ ...prev, provides: selected }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Vendor details submitted:', vendorDetails);

    try {
      const response = await axios.post('http://localhost:9598/vendor/information', vendorDetails);

      if (response.status === 200) {
        alert('Vendor registered successfully');
        setVendorDetails({
          vendorName: '',
          vendorEmail: '',
          vendorPhone: '',
          vendorLocation: '',
          type: '',
          rate: '',
          provides: [],
        });
        navigate('/');
      } else {
        alert('Failed to register vendor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the vendor');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-sky-200 px-40 py-10">
        <div className="container mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Vendor Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                  <input
                    type="text"
                    id="vendorName"
                    name="vendorName"
                    value={vendorDetails.vendorName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vendorEmail" className="block text-sm font-medium text-gray-700">Vendor Email</label>
                  <input
                    type="email"
                    id="vendorEmail"
                    name="vendorEmail"
                    value={vendorDetails.vendorEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vendorPhone" className="block text-sm font-medium text-gray-700">Vendor Phone</label>
                  <input
                    type="tel"
                    id="vendorPhone"
                    name="vendorPhone"
                    value={vendorDetails.vendorPhone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vendorLocation" className="block text-sm font-medium text-gray-700">Vendor Location</label>
                  <input
                    type="text"
                    id="vendorLocation"
                    name="vendorLocation"
                    value={vendorDetails.vendorLocation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={vendorDetails.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="photographer">Photographer</option>
                    <option value="caterer">Caterer</option>
                    <option value="dj">DJ</option>
                    <option value="decorator">Decorator</option>
                    <option value="venue">Venue</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-700">Rate</label>
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    value={vendorDetails.rate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorRegistrationPage;
