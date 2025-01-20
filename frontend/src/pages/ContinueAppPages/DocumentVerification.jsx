import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const DocumentVerification = () => {
  const { userDetails } = useOutletContext(); 
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTimePeriod, setScheduleTimePeriod] = useState(null);
  const [status, setStatus] = useState('pending'); // Default status is 'pending'

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      localStorage.setItem('verificationComplete', 'true');
      navigate('/createapplication/entrance-examination'); 
      setActiveItem(item); 
    } 
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/appointment'); 
    setActiveItem(item); 
  };

  
   useEffect(() => {
            // Check if the personal form is completed by checking localStorage
            const appointmentFormComplete = localStorage.getItem('appointmentFormComplete');
            if (!appointmentFormComplete) {
              // Redirect to the personal form if it's not completed
              navigate('/createapplication');
            }
          }, [navigate]);
  

  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No id provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchFormData = async (enrollment_id) => {
    setLoading(true);
    setError(null);
    try {
      const [scheduleResponse, progressResponse] = await Promise.all([
        fetch(`https://cvsu-backend-system.vercel.app/api/getSchedule?enrollment_id=${enrollment_id}`),
        fetch(`https://cvsu-backend-system.vercel.app/api/getApplicantProgress?enrollment_id=${enrollment_id}`)
      ]);
  
      if (!scheduleResponse.ok || !progressResponse.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const scheduleData = await scheduleResponse.json();
      const progressData = await progressResponse.json();
  
      setScheduleDate(scheduleData.scheduled_date || null);
      setScheduleTimePeriod(scheduleData.time_period || null);
      setStatus(progressData.docs_verification || 'pending');

      setIsNextButtonDisabled(false);
  
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  const currentDate = new Date();
  const appointmentDate = new Date(scheduleDate);
  const timeDiff = appointmentDate - currentDate;
  const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)); 

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
      className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
        <div>
         {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-600">{error}</p>
    ) : (
      <p className="text-red-600 hidden">{error}</p>    )}
    </div>
      {/* Header Section */}
      <div className="relative text-center mb-10">
        
        <button 
          onClick={() => handleSecondClick('/appointment')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-4xl font-extrabold text-[#003d1f]">Documents Verification</h1>
        
        <button
          onClick={() => handleFirstClick('/entrance-examination')}
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
        <div className="lg:col-span-1 flex flex-col items-center space-y-6 my-5">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Appointed Schedule</h5>

          {/* Schedule Date and Time */}
          {scheduleDate && scheduleTimePeriod ? (
            <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
              <p className="mb-2">
                {`Date: ${new Date(scheduleDate).toLocaleDateString()} | Time: ${scheduleTimePeriod === "morning" ? "Morning" : "Afternoon"}`}
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-500">No appointment scheduled.</p>
          )}

            <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Verification Status</h5>

            {/* Status Display */}
            <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
              <p className="mb-2">{`Status: ${status}`}</p>
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
              <li>
                Verification of requirements is only allowed on your scheduled date. Arriving on a different date 
                without a valid appointment will not be entertained.
              </li>
              <li>For inquiries, please contact the office of student affairs and services.</li>
              <li>
                For more information about the admission procedures, 
                <a 
                  href="https://cvsu-system.vercel.app/procedures" 
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

export default DocumentVerification;
