import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useActiveItem } from '../../contexts/CreateAppContext';

const DocumentSubmission = () => {
  const { userDetails } = useOutletContext();
  const enrollment_id = userDetails?.enrollment_id || 'No ID provided';
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();
  const divRef = useRef(null);

  const [status, setStatus] = useState('Loading...');
  const [reminderMessage, setReminderMessage] = useState('');  // Static reminder message
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchApplicantProgress = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/getApplicantProgress?enrollment_id=${enrollment_id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const { docs_submission } = await response.json();

        setStatus(docs_submission);
        setIsNextButtonDisabled(docs_submission !== 'approved');

        // Set a static reminder message
        setReminderMessage('Ensure that all required documents are submitted before the deadline.');
      } catch (error) {
        console.error('Error fetching applicant progress:', error);
        setStatus('Error fetching data');
      }
    };

    if (enrollment_id !== 'No ID provided') {
      fetchApplicantProgress();
    }
  }, [enrollment_id]);

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

  return (
    <div ref={divRef} className="w-full min-h-screen bg-gradient-to-br from-green-100 to-white p-8 pt-12 shadow-lg rounded-lg flex flex-col">
      <div className="relative text-center mb-10">
        <button
          onClick={() => handleSecondClick('/entrance-examination')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#4f7c4f] hover:text-green-800 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-4xl font-extrabold text-[#003d1f]">Documents Submission</h1>

        <button
          onClick={() => handleFirstClick('/applicant-society-payment')}
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

      <div className="w-full shadow-xl py-[5%] px-6 rounded-lg items-center flex-col lg:grid lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1 flex flex-col items-center space-y-6 my-5">
          <h5 className="text-2xl font-extrabold text-[#2a2a2a]">Your Appointed Status</h5>
          <div className="text-lg font-medium text-[#4f7c4f] p-6 bg-white shadow-md rounded-lg w-full text-center">
            <p className="mb-2">{`Status: ${status}`}</p>
          </div>

          <div>
            {status === 'Pending' ? (
              <p className="text-lg mt-3 text-gray-500">Once your documents are submitted, you can proceed to Society Payments.</p>
            ) : (
              <p className="text-lg mt-3 text-gray-500">You can now proceed to the Society Payment.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col space-y-6">
          <div className="w-full p-6 bg-red-100 border-l-4 border-red-500 text-gray-700 rounded-lg">
            <h5 className="font-semibold text-lg">Reminder:</h5>
            <p>{reminderMessage}</p>
          </div>

          <div className="mt-6 w-full max-w-4xl p-4 bg-green-100 border-l-4 border-green-500 text-gray-700">
            <h5 className="font-semibold text-lg">Important Notice:</h5>
            <ul className="list-disc pl-6">
              <li>Submission of requirements is only allowed on your scheduled date. Arriving on a different date without a valid appointment will not be entertained.</li>
              <li>For inquiries, please contact the Office of Student Affairs And Services.</li>
              <li>
                For more information about the admission procedures,{' '}
                <a href="https://www.your-website-link.com/admissionprocedures" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
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
