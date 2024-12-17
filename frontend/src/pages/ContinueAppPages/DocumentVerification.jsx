import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';

const DocumentVerification = () => {
  const { applicantType, schedule } = useAppContext(); // Access schedule data from context
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const handleSecondClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/entrance-examination');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  // Assuming schedule has 'date' and 'time' fields
  const scheduleDate = schedule?.date;
  const scheduleTime = schedule?.time;

  // Reminder Logic
  const currentDate = new Date();
  const appointmentDate = new Date(scheduleDate);
  const timeDiff = appointmentDate - currentDate;
  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)); // hours until appointment

  // Reminder message based on time left
  let reminderMessage = '';
  if (hoursLeft < 24) {
    reminderMessage = 'Your appointment is in less than 24 hours. Please prepare the necessary documents.';
  } else if (hoursLeft < 48) {
    reminderMessage = 'You have an appointment in the next 48 hours. Don’t forget to bring your documents.';
  } else {
    reminderMessage = 'You have some time before your appointment. Make sure all documents are ready.';
  }

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen bg-[#ffffffad] p-8 pt-12 shadow-xl rounded-lg flex flex-col">
      
      {/* Header Section */}
      <div className="relative text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Documents Verification</h1>
        
          <button onClick={() => handleSecondClick('/entrance-examination')}
            className={`absolute right-0 top-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        
      </div>

      {/* Content Section */}
<div className="flex justify-center bg-white shadow-lg py-[5%] rounded-lg items-center flex-col h-full">
  <h5 className="text-2xl font-extrabold text-[#1b1b1b] mb-6 pt-8">Your Appointed Schedule</h5>
  
  {/* Schedule Date and Time with Shadow */}
  {scheduleDate && scheduleTime ? (
    <div className="text-xl font-medium text-[#345e34] p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
      <p>{`Date: ${new Date(scheduleDate).toLocaleDateString()}`}</p>
      <p>{`Time: ${new Date(scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
    </div>
  ) : (
    <p className="text-lg text-gray-500">No appointment scheduled.</p>
  )}
  <div><p className="text-lg mt-3 text-gray-500">Please bring the required documents to the Campus for verification</p></div>



        {/* Reminder Section */}
        <div className="mt-11 w-full max-w-4xl p-4 bg-red-100 border-l-4 border-red-500 text-gray-700">
          <h5 className="font-semibold text-lg">Reminder:</h5>
          <p>{reminderMessage}</p>
        </div>

        {/* New Reminder Section with Bullet Points */}
        <div className="mt-6 w-full max-w-4xl p-4 bg-green-100 border-l-4 border-green-500 text-gray-700">
          <h5 className="font-semibold text-lg">Important Notice:</h5>
          <ul className="list-disc pl-6">
            <li>
              Verification of requirements is only allowed on your scheduled date. Arriving on a different date 
              without a valid appointment will not be entertained.
            </li>
            <li> For inquiries, please contact the office of student affairs and services.</li>
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
  );
};

export default DocumentVerification;
