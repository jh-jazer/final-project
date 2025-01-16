import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const DocumentVerification = () => {
  const { userDetails } = useOutletContext(); 
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTimePeriod, setScheduleTimePeriod] = useState(null);
  const [status, setStatus] = useState('pending'); // Default status is 'pending'

  const handleFirstClick = () => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/entrance-examination'); 
      setActiveItem({ id: 8, route: "entrance-examination" }); 
    } 
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/appointment'); 
    setActiveItem(item); 
  };

  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No id provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchFormData = async (enrollment_id) => {
    try {
      // Fetch schedule data
      const scheduleResponse = await fetch(`https://cvsu-backend-system.vercel.app/api/getSchedule?enrollment_id=${enrollment_id}`);
      if (!scheduleResponse.ok) {
        throw new Error("Failed to fetch schedule data");
      }
      const scheduleData = await scheduleResponse.json();
      
      // Set schedule date and time period
      if (scheduleData.scheduled_date && scheduleData.time_period) {
        setScheduleDate(scheduleData.scheduled_date); 
        setScheduleTimePeriod(scheduleData.time_period); 
      }
  
      // Fetch applicant progress data
      const progressResponse = await fetch(`https://cvsu-backend-system.vercel.app/api/getApplicantProgress?enrollment_id=${enrollment_id}`);
      if (!progressResponse.ok) {
        throw new Error("Failed to fetch applicant progress data");
      }
      const progressData = await progressResponse.json();
  
      // Check the docs_verification status and set the status state
      if (progressData && progressData.docs_verification) {
        setStatus(progressData.docs_verification); // Set status to 'pending' or 'approved'
      }
  
    } catch (error) {
      console.error("Error fetching data:", error);
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
        <div className="lg:col-span-1 flex flex-col items-center space-y-6">
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

           {/* Status Section */}
           <div className="w-full p-6 bg-yellow-100 border-l-4 border-yellow-500 text-gray-700 rounded-lg">
            <h5 className="font-semibold text-lg">Status:</h5>
            <p className={`text-lg font-medium ${status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
              {status === 'approved' ? 'Approved' : 'Pending..'} <br/> Please bring the required documents to the Campus for verification.
            </p>
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

export default DocumentVerification;
