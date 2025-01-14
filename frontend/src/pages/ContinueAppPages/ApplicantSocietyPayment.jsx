import React, { useState, useEffect, useRef } from 'react';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const SocietyPayment = () => {
  const { userDetails } = useOutletContext(); 
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState('Pending'); // Default to 'Pending'

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/enrollment-completed'); 
      setActiveItem(item); 
    } 
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/document-submission'); 
    setActiveItem(item); 
  };

  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No id provided") {
      fetchPaymentStatus(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchPaymentStatus = async (enrollment_id) => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getPaymentStatus?enrollment_id=${enrollment_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      
      // Simulate setting payment status based on the fetched data
      if (data.paymentStatus) {
        setPaymentStatus(data.paymentStatus); // If payment status is provided, use it
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let paymentReminderMessage = '';
  if (paymentStatus === 'Pending') {
    paymentReminderMessage = 'Your payment is pending. Please make the payment to proceed.';
  } else if (paymentStatus === 'Paid') {
    paymentReminderMessage = 'You have successfully completed the payment. You can now proceed to the next step.';
  }

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button 
          onClick={() => handleSecondClick('/document-submission')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-4xl font-extrabold text-[#003d1f]">Society Payment</h1>
        
        <button
          onClick={() => handleFirstClick('/enrollment-completed')}
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

        {/* Left Column: Payment Status Section */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-6">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Payment Status</h5>

          {/* Payment Status Display */}
          <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
            <p className="mb-2">{`Status: ${paymentStatus}`}</p>
          </div>

          {/* Text based on payment status */}
          <div>
            {paymentStatus === 'Pending' ? (
              <p className="text-lg mt-3 text-gray-500">Once your payment is completed, you can proceed to the next step.</p>
            ) : (
              <p className="text-lg mt-3 text-gray-500">You can now proceed to the next step.</p>
            )}
          </div>
        </div>

        {/* Right Column: Reminder and Important Notice */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {/* Reminder Section */}
          <div className="w-full p-6 bg-red-100 border-l-4 border-red-500 text-gray-700 rounded-lg">
            <h5 className="font-semibold text-lg">Reminder:</h5>
            <p>{paymentReminderMessage}</p>
          </div>

          {/* Important Notice Section */}
          <div className="mt-6 w-full max-w-4xl p-4 bg-green-100 border-l-4 border-green-500 text-gray-700">
            <h5 className="font-semibold text-lg">Important Notice:</h5>
            <ul className="list-disc pl-6">
              <li>
                Payment must be completed before you can proceed to the next step. Please ensure the payment is made.
              </li>
              <li>For inquiries, please contact the Student Affairs Office.</li>
              <li>
                For more information about payment procedures, 
                <a 
                  href="https://www.your-website-link.com/paymentprocedures" 
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

export default SocietyPayment;
