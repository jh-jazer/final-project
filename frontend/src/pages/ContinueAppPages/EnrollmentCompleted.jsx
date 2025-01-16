import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActiveItem } from '../../contexts/CreateAppContext';

const EnrollmentCompletion = () => {
  const [status, setStatus] = useState('pending'); // Default status is 'pending'
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();

  const handleFirstClick = () => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/enrollment-completed');
      setActiveItem({ id: 11, route: "enrollment-completed" }); 
    }
  };

  const handleSecondClick = () => {
    navigate('/createapplication/applicant-society-payment');
    setActiveItem({ id: 10, route: "applicant-society-payment" }); 
  };

  useEffect(() => {
    // You can simulate an API call here to check the status.
    // Example: setStatus('approved');
    // For now, we use the default 'pending' status.
  }, []);

  return (
    <div
      ref={divRef}
      className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col"
    >
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <button
          onClick={() => handleSecondClick('/document-submission')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-4xl font-extrabold text-[#003d1f]">
          {status === 'approved' ? 'Enrollment Completion' : 'Please Wait'}
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-full shadow-xl py-[5%] px-6 rounded-lg items-center flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Left Column: Enrollment Status */}
        <div className="lg:col-span-1 flex flex-col items-center space-y-6">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">
            {status === 'approved' ? 'Enrollment Completion Status' : 'Your Enrollment is Pending'}
          </h5>

          <div>
            {status === 'approved' ? (
              <>
                <p className="text-lg mt-3 text-gray-500">
                  Congratulations! You have successfully completed your enrollment process at Cavite State University.
                </p>
                <p className="text-lg mt-3 text-gray-500">
                  We are excited to welcome you as part of our academic community. Prepare for an enriching and fulfilling educational journey ahead!
                </p>
              </>
            ) : (
              <p className="text-lg mt-3 text-gray-500">
                Please wait while we process your enrollment. You will be notified once your enrollment is approved.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Next Steps and Important Information */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {status === 'approved' ? (
            <>
              {/* Next Steps Section */}
              <div className="w-full p-6 bg-green-100 border-l-4 border-green-500 text-gray-700 rounded-lg">
                <h5 className="font-semibold text-lg">Next Steps:</h5>
                <ul>
                  <li>Review your schedule and make sure you’re ready for your first day of classes.</li>
                  <li>Explore student resources to get the most out of your time at Cavite State University.</li>
                  <li>If you need any assistance, feel free to contact the Student Affairs Office.</li>
                </ul>
              </div>

              {/* Important Information Section */}
              <div className="mt-6 w-full max-w-4xl p-4 bg-blue-100 border-l-4 border-blue-500 text-gray-700">
                <h5 className="font-semibold text-lg">Important Information:</h5>
                <p>
                  For any further inquiries regarding your enrollment, you can visit the official website or contact
                  the Admissions Office directly.
                </p>
              </div>
            </>
          ) : (
            <div className="w-full p-6 bg-yellow-100 border-l-4 border-yellow-500 text-gray-700 rounded-lg">
              <h5 className="font-semibold text-lg">Enrollment Pending:</h5>
              <p>
                Your enrollment is currently being processed. Please wait for further instructions once your enrollment is approved.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCompletion;
