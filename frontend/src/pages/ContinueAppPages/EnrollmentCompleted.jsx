import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const EnrollmentCompletion = () => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const divRef = useRef(null);

  return (
    <div
      ref={divRef}
      className="w-full min-h-screen bg-[#ffffffad] p-8 pt-12 shadow-xl rounded-lg flex flex-col"
    >
      {/* Header Section */}
      <div className="relative text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Welcome to Cavite State University</h1>
        <Link
          to="/createapplication/appointment"
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
        >
          <button
            className={`text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isNextButtonDisabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Content Section */}
        <h5 className="text-2xl font-extrabold text-[#1b1b1b] mb-6 pt-8">Enrollment Completion Status</h5>
        
        {/* Welcome Message */}
        <div>
          <p className="text-lg mt-3 text-gray-500">
            Congratulations! You have successfully completed your enrollment process at Cavite State University.
          </p>
          <p className="text-lg mt-3 text-gray-500">
            We are excited to welcome you as part of our academic community. Prepare for an enriching and
            fulfilling educational journey ahead!
          </p>
        </div>

        {/* Further Steps */}
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-gray-700">
          <h5 className="font-semibold text-lg">Next Steps:</h5>
          <ul>
            <li>
              Review your schedule and make sure you’re ready for your first day of classes.
            </li>
            <li>
              Explore student resources to get the most out of your time at Cavite State University.
            </li>
            <li>
              If you need any assistance, feel free to contact the Student Affairs Office.
            </li>
          </ul>
        </div>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-gray-700">
          <h5 className="font-semibold text-lg">Important Information:</h5>
          <p>
            For any further inquiries regarding your enrollment, you can visit the official website or contact
            the Admissions Office directly. 
          </p>
        </div>
      </div>
    
  );
};

export default EnrollmentCompletion;
