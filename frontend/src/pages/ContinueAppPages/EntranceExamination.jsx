import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


const EntranceExamination = () => {
  const { userDetails } = useOutletContext(); 
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const { schedule } = useAppContext(); // Access schedule data from context
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  
    const handleFirstClick = () => {
      if (!isNextButtonDisabled) {
        navigate('/createapplication/document-submission'); // Navigate to the desired route
        setActiveItem({ id: 9, route: "document-submission" }); 
      } 
    };
    
    const handleSecondClick = () => {
        navigate('/createapplication/document-verification'); // Navigate to the desired route
        setActiveItem({ id: 7, route: "document-verification" }); 
      
  
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
    reminderMessage = 'Your examination is in less than 24 hours. Please prepare the required documents and materials.';
  } else if (hoursLeft < 48) {
    reminderMessage = 'You have an examination in the next 48 hours. Don’t forget to bring the required documents and materials.';
  } else {
    reminderMessage = 'You have some time before your examination. Make sure to bring the required documents and materials.';
  }

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button 
          onClick={() => handleSecondClick('/document-verification')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-4xl font-extrabold text-[#003d1f]">Student Evaluation</h1>
        
        <button
          onClick={() => handleFirstClick('/document-submission')}
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
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Examination Schedule</h5>

          {/* Schedule Date and Time */}
          {scheduleDate && scheduleTime ? (
            <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
              <p className="mb-2">
                {`Date: ${new Date(scheduleDate).toLocaleDateString()}`}
              </p>
              <p>{`Time: ${new Date(scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}</p>
            </div>
          ) : (
            <p className="text-lg text-gray-500">No appointment scheduled.</p>
          )}

          <p className="text-lg text-gray-600">Make sure to bring a valid ID and a printed copy of your application form</p>
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
              <li>
                You can only take your examination on your scheduled date. Arriving on a different date 
                without a valid appointment will not be entertained.
              </li>
              <li>For inquiries, please contact the office of student affairs and services.</li>
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

export default EntranceExamination;
