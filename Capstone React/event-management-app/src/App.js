import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VenueSelectionPage from './pages/VenueSelectionPage';
import AddOnSelectionPage from './pages/AddOnSelectionPage';
import ApprovalPage from './pages/ApprovalPage';
import UserRegistration from './pages/UserRegistration';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import VendorRegistrationPage from './pages/VendorRegistration';
import EventSummaryPage from './pages/EventSummaryPage ';
import EventCreationPage from './pages/EventCreation';
import LandinngPageOne  from './pages/landingpage';
import EventDetailsPage from './pages/EventDetailsPage';
import AdminProfile from './pages/AdminProfile';
import AdminEventTable from './pages/AdminEventTable';
import Tutorial from './pages/Tutorial';
import PaymentPage from './pages/RazorPayment';
import GuestInfoForm from './pages/GuestInfoForm';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandinngPageOne />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/create' element={<EventCreationPage/>} />
        <Route path="/venues" element={<VenueSelectionPage />} />
        <Route path="/addons" element={<AddOnSelectionPage />} />
        <Route path="/adminprofile" element={<AdminProfile/>} />
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/summary" element={<EventSummaryPage/>} />
        <Route path="/vendorregistration" element={<VendorRegistrationPage/>} />
        <Route path="/details/:eventId" element={<EventDetailsPage/>} />
        <Route path="admineventdetails" element={<AdminEventTable/>}/>
        <Route path="/tutorials" element={<Tutorial/>}/>
        <Route path="/guestinfo" element={<GuestInfoForm/>}/>
        <Route path="payment" element={<PaymentPage/>} />

      </Routes>
    </Router>
  );
};

export default App;
