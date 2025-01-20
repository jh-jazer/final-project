import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useActiveItem } from '../../contexts/CreateAppContext';

const SocietyPayment = () => {
  const { userDetails } = useOutletContext();
  const enrollment_id = userDetails?.enrollment_id || 'No ID provided';
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [reminderMessage, setReminderMessage] = useState('Please complete your payment to proceed.');
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();
  const divRef = useRef(null);

  useEffect(() => {
    if (enrollment_id !== 'No ID provided') {
      fetchPaymentDetails(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchPaymentDetails = async (enrollmentId) => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getApplicantProgress?enrollment_id=${enrollmentId}`);
      if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

      const { society_payment } = await response.json();
      setPaymentStatus(society_payment || 'Pending');
      setIsNextButtonDisabled(society_payment !== 'approved');

      // Static reminder message
      setReminderMessage('Please complete your payment to proceed.');
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setPaymentStatus('Error fetching data');
    }
  };

  const handleNavigation = (path, item) => {
    if (!isNextButtonDisabled || path !== '/createapplication/document-submission') {
      localStorage.setItem('paymentComplete', 'true');
      navigate(path);
      setActiveItem(item);
    }
  };

  useEffect(() => {
                  // Check if the personal form is completed by checking localStorage
                  const evaluationComplete = localStorage.getItem('evaluationComplete');
                  if (!evaluationComplete) {
                    // Redirect to the personal form if it's not completed
                    navigate('/createapplication');
                  }
                }, [navigate]);
  
  

  return (
    <div ref={divRef} className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button
          onClick={() => handleNavigation('/createapplication/entrance-examination', '/entrance-examination')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-800 transition-all"
        >
          {/* Left Navigation Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-4xl font-extrabold text-green-900">Society Payment</h1>

        <button
          onClick={() => handleNavigation('/createapplication/document-submission', '/document-submission')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-green-700 hover:text-green-800 transition-all ${
            isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isNextButtonDisabled}
        >
          {/* Right Navigation Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full shadow-xl py-[5%] px-6 rounded-lg items-center flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Left Column: Payment Status */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-6 my-5">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Payment Status</h5>
          <div className="text-lg font-medium text-green-700 p-6 bg-white shadow-md rounded-lg w-full text-center">
            <p className="mb-2">{`Status: ${paymentStatus}`}</p>
          </div>
          <div>
            {paymentStatus === 'Pending' ? (
              <p className="text-lg mt-3 text-gray-500">Please complete your payment to proceed to the next step.</p>
            ) : (
              <p className="text-lg mt-3 text-gray-500">You may now proceed to the next step.</p>
            )}
          </div>
        </div>

        {/* Right Column: Reminder and Important Notice */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {/* Reminder Section */}
          <div className="w-full p-6 bg-red-100 border-l-4 border-red-500 text-gray-700 rounded-lg">
            <h5 className="font-semibold text-lg">Reminder:</h5>
            <p>{reminderMessage}</p>
          </div>

          {/* Important Notice Section */}
          <div className="w-full p-6 bg-green-100 border-l-4 border-green-500 text-gray-700 rounded-lg">
            <h5 className="font-semibold text-lg">Important Notice:</h5>
            <ul className="list-disc pl-6 space-y-2">
              <li>Please ensure payment is completed to proceed with your application.</li>
              <li>Contact Student Affairs for further assistance or inquiries.</li>
              <li>
                For more details,{' '}
                <a href="https://cvsu-system.vercel.app/procedures" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  click here.
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyPayment;
