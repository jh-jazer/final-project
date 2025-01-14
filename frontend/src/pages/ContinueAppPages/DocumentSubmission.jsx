import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const DocumentSubmission = () => {
  const { userDetails } = useOutletContext(); 
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Pending'); // Default to 'Pending'

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/applicant-society-payment'); 
      setActiveItem(item); 
    } 
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/entrance-examination'); 
    setActiveItem(item); 
  };

  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No id provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchFormData = async (enrollment_id) => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getSchedule?enrollment_id=${enrollment_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      
      // Simulate setting status based on the fetched data
      if (data.status) {
        setStatus(data.status); // If status is provided, use it
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const currentDate = new Date();
  let reminderMessage = '';
  if (status === 'Pending') {
    reminderMessage = 'Your documents are pending submission. Please submit them to proceed.';
  } else if (status === 'Approved') {
    reminderMessage = 'You can now proceed to the Society Payment.';
  }

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button 
          onClick={() => handleSecondClick('/entrance-examination')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-4xl font-extrabold text-[#003d1f]">Documents Submission</h1>
        
        <button
          onClick={() => handleFirstClick('/applicant-society-payment')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full shadow-xl py-[5%] px-6 rounded-lg items-center flex-col lg:grid lg:grid-cols-2 gap-8">

        {/* Left Column: Schedule Section */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-6">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Appointed Status</h5>

          {/* Status Display */}
          <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
            <p className="mb-2">{`Status: ${status}`}</p>
          </div>

          {/* Text based on status */}
          <div>
            {status === 'Pending' ? (
              <p className="text-lg mt-3 text-gray-500">Once your documents are submitted, you can proceed to Society Payments</p>
            ) : (
              <p className="text-lg mt-3 text-gray-500">You can now proceed to the Society Payment</p>
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
          <div className="mt-6 w-full max-w-4xl p-4 bg-green-100 border-l-4 border-green-500 text-gray-700">
            <h5 className="font-semibold text-lg">Important Notice:</h5>
            <ul className="list-disc pl-6">
              <li>
                Submission of requirements is only allowed on your scheduled date. Arriving on a different date 
                without a valid appointment will not be entertained.
              </li>
              <li>For inquiries, please contact the Office of Student Affairs And Services.</li>
              <li>
                For more information about the admission procedures, 
                <a 
                  href="https://www.your-website-link.com/admissionprocedures" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
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

export default DocumentSubmission;
