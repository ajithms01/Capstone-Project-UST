import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaUser as User, FaCalendarAlt as CalendarDays, FaMapPin as MapPin } from 'react-icons/fa';


const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9598/api/event/${eventId}`);
        console.log(response);
        setEvent(response.data);
      } catch (error) {
        setError('Error fetching event details');
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);
  // console.log('Fetched event details',event);

  const handleGenerateGuestLink = () => {
    const formLink = "https://example.com/form"; // Replace this with the actual form link
  
    navigator.clipboard.writeText(formLink).then(() => {
      alert('Form link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  
  const handleMakePayment = async () => {
    navigate('/payment',{ state: { amount: event.budget ,eventId: event.eventId} });
    console.log(event.budget,event.eventId);
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const content = document.getElementById('pdf-details-container');

    if (!content) {
      console.error('Element with ID "pdf-details-container" not found.');
      alert('Failed to generate PDF: Element not found');
      return;
    }

    try {
      // Temporarily show the content for PDF generation
      content.style.display = 'block';

      // Wait a bit to ensure content is fully rendered
      setTimeout(async () => {
        html2canvas(content, {
          useCORS: true,
          logging: true,
          scale: 2, // Increase scale for better quality
        }).then((canvas) => {
          if (canvas.width === 0 || canvas.height === 0) {
            console.error('Canvas is empty.');
            alert('Failed to generate PDF: Canvas is empty');
            return;
          }

          const imgData = canvas.toDataURL('image/png');

          // Check if imgData is a valid image
          if (!imgData.startsWith('data:image/png;base64,')) {
            console.error('Invalid image data.');
            alert('Failed to generate PDF: Invalid image data');
            return;
          }

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('event-details.pdf');

          // Hide the content again after PDF is generated
          content.style.display = 'none';
        }).catch((error) => {
          console.error('Error capturing canvas:', error);
          alert('Failed to generate PDF: Error capturing canvas');
          content.style.display = 'none'; // Hide the content in case of error
        });
      }, 500); // Adjust delay as necessary

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
      content.style.display = 'none'; // Hide the content in case of error
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event data found</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Event Details */}
        <div className="p-6 md:p-8 lg:p-10 flex-1 mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden ring-1 ring-gray-200">
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{event.name}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Host</h3>
                  <p className="text-base text-gray-900">{event.host || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Type</h3>
                  <p className="text-base text-gray-900">{event.type || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Date</h3>
                  <p className="text-base text-gray-900">
                    {formatDate(event.date)}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Venue</h3>
                  <p className="text-base text-gray-900">{event.venue || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                  <p className="text-base text-gray-900">{event.address || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">Location</h3>
                  <p className="text-base text-gray-900">{event.location || 'N/A'}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 flex justify-end gap-4">
            <div className="bg-gray-50 p-6 flex justify-end gap-4">
            <button
              onClick={handleGenerateGuestLink}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Generate Guest Link
            </button>

              <button
                onClick={handleMakePayment}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Make Payment
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Download PDF
              </button>
            </div>
            </div>
          </div>

          {/* Hidden Container for PDF Generation */}
          <div id="pdf-details-container" style={{ display: 'none' }}>
          <div className="max-w-2xl mx-auto bg-cream-100 shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gold-600 p-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-white">{event.name}</h2>
      </div>
      <div className="p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <User className="text-gold-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Host</h3>
            <p className="text-gray-600">{event.host || 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <CalendarDays className="text-gold-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
            <p className="text-gray-600">{formatDate(event.date)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="text-gold-600" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Venue</h3>
            <p className="text-gray-600">{event.venue || 'N/A'}</p>
            <p className="text-gray-600">{event.address || 'N/A'}</p>
            <p className="text-gray-600">{event.location || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">We look forward to your presence</p>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
