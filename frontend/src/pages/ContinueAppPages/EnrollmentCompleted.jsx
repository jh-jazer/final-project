import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from '../../contexts/CreateAppContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const EnrollmentCompletion = () => {
  const { userDetails } = useOutletContext();
  const enrollment_id = userDetails?.enrollment_id || 'No ID provided';
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Loading...'); // Default to loading status
  const [reminderMessage, setReminderMessage] = useState('');
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const divRef = useRef(null);

  useEffect(() => {
    const fetchEnrollmentStatus = async () => {
      try {
        const response = await axios.get(`https://cvsu-backend-system.vercel.app/api/getApplicantProgress?enrollment_id=${enrollment_id}`);

        if (response.data) {
          const { student_enrollment, appointment_date } = response.data;

          setStatus(student_enrollment); // Update status based on the API response
          setIsNextButtonDisabled(student_enrollment !== 'approved'); // Disable Next button if not approved

          // Set dynamic reminder message based on appointment date
          if (appointment_date) {
            setDynamicReminderMessage(appointment_date);
          } else {
            setReminderMessage('Appointment date not available.');
          }
        } else {
          setStatus('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching enrollment status:', error);
        setStatus('Error fetching data');
      }
    };

    if (enrollment_id !== 'No ID provided') {
      fetchEnrollmentStatus();
    }
  }, [enrollment_id]);

  // Dynamic Schedule-Based Reminders
  const setDynamicReminderMessage = (appointmentDateStr) => {
    const currentDate = new Date();
    const appointmentDate = new Date(appointmentDateStr);

    if (isNaN(appointmentDate)) {
      setReminderMessage('Invalid appointment date.');
      return;
    }

    const timeDiff = appointmentDate - currentDate;
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));

    let message;
    if (hoursLeft < 24) {
      message = 'Your examination is in less than 24 hours. Please prepare the required documents and materials.';
    } else if (hoursLeft < 48) {
      message = 'You have an examination in the next 48 hours. Don’t forget to bring the required documents and materials.';
    } else {
      message = 'You have some time before your examination. Make sure to bring the required documents and materials.';
    }

    setReminderMessage(message);
  };

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/login');
      setActiveItem(item);
    }
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/applicant-society-payment');
    setActiveItem(item);
  };

  useEffect(() => {
                // Check if the personal form is completed by checking localStorage
                const paymentComplete = localStorage.getItem('paymentComplete');
                if (!paymentComplete) {
                  // Redirect to the personal form if it's not completed
                  navigate('/createapplication');
                }
              }, [navigate]);

  return (
    <div ref={divRef} className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button
          onClick={() => handleSecondClick('/applicant-society-payment')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-4xl font-extrabold text-[#003d1f] px-5">Enrollment Completion</h1>
      
        <button
          onClick={() => handleFirstClick('/document-submission')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all ${
            isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isNextButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

      {/* Content Section */}
      <div className="w-full shadow-xl py-[5%] px-6 rounded-lg items-center flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Left Column: Status Section */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-6 my-5">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Enrollment Status</h5>
          <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
            <p className="mb-2">{`Status: ${status}`}</p>
          </div>

          {/* Status Message */}
          <div>
            {status === 'pending' ? (
              <p className="text-lg mt-3 text-gray-500">Your enrollment is still under review. Please be patient.</p>
            ) : status === 'approved' ? (
              <p className="text-lg mt-3 text-gray-500">
                Congratulations! Your enrollment has been approved. Welcome to Cavite State University!
              </p>
            ) : (
              <p className="text-lg mt-3 text-gray-500">Error fetching enrollment status.</p>
            )}
          </div>
        </div>

        {/* Right Column: Reminder and Important Notice */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {status === 'approved' && (
            <>
              <div className="w-full p-6 bg-green-100 border-l-4 border-green-500 text-gray-700 rounded-lg">
                <h5 className="font-semibold text-lg">Next Steps:</h5>
                <ul>
                  <li>Review your schedule and prepare for your first day of classes.</li>
                  <li>Explore student resources to make the most of your university experience.</li>
                  <li>If you need assistance, feel free to contact the Student Affairs Office.</li>
                </ul>
              </div>
              <div className="w-full p-6 bg-blue-100 border-l-4 border-blue-500 text-gray-700 rounded-lg">
                <h5 className="font-semibold text-lg">Important Information:</h5>
                <p>
                  For further inquiries regarding your enrollment or the next steps, please visit the official website or
                  contact the Admissions Office directly.
                </p>
              </div>
            </>
          )}
          {status === 'pending' && (
            <div className="w-full p-6 bg-yellow-100 border-l-4 border-yellow-500 text-gray-700 rounded-lg">
              <h5 className="font-semibold text-lg">Reminder:</h5>
              <p>Your enrollment is being processed. You will be notified once it's approved.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCompletion;
