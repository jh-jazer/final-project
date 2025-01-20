import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Enroll = () => {
  const { user } = useOutletContext(); // Access the passed data
  const [gradesChecked, setGradesChecked] = useState(false);
  const [feeChecked, setFeeChecked] = useState(false);
  const [adviserChecked, setAdviserChecked] = useState(false); // Adviser approval for irregular students
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false); // Adviser approval for irregular students
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal is initially closed until the student is verified
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const enrollee = {
    id: user.id,
    name: user.full_name,
    course: user.program,
    status: user.type,
  };

  const API_URL = 'https://cvsu-backend-system.vercel.app/api/student-progress';
  const CHECK_PROGRESS_URL = `https://cvsu-backend-system.vercel.app/api/check-progress/${enrollee.id}`;
  const CHECK_STATUS_URL = `https://cvsu-backend-system.vercel.app/api/check-progress-status/${enrollee.id}`;

  // Check if student progress exists
  const checkStudentProgress = async () => {
    try {
      const response = await fetch(CHECK_PROGRESS_URL);
      const data = await response.json();
      if (response.ok && data.exists) {
        setIsModalOpen(false); // If student progress exists, no modal
      } else {
        setIsModalOpen(true); // Show modal if student progress does not exist
      }
    } catch (error) {
      console.error('Error checking student progress:', error);
      setErrorMessage('An error occurred while checking progress.');
    }
  };

  // Check all three statuses (checklist_verification, society_payment, advising_requirement)
  const checkProgressStatus = async () => {
    try {
      const response = await fetch(CHECK_STATUS_URL);
      const data = await response.json();
      console.log('Progress status:', data);

      if (response.ok) {
        // Set the state based on the database values
        setGradesChecked(data.checklist_verification === 'approved');
        setFeeChecked(data.society_payment === 'approved');
        setAdviserChecked(data.advising_requirement === 'approved');
        setAlreadyEnrolled(data.status === 'enrolled');
      }
    } catch (error) {
      console.error('Error checking progress status:', error);
      setErrorMessage('An error occurred while checking progress status.');
    }
  };

  useEffect(() => {
    // Check if the student progress exists and status for all requirements
    checkStudentProgress();
    checkProgressStatus();
  }, [enrollee.id]);

  const handleContinueJourney = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Set the default progressData
    const progressData = {
      student_id: parseInt(enrollee.id, 10), // Ensure it's a number
      checklist_verification: 'pending', // Default to pending for both types
      society_payment: 'pending',       // Default to pending for both types
      advising_requirement: enrollee.status === 'Regular' ? 'approved' : 'pending', // Set to 'approved' for Regular students
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(progressData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Progress created:', result);
        setSuccessMessage('Enrollment progress created successfully.');
        setIsModalOpen(false);
      } else {
        const error = await response.json();
        console.error('API Error:', error); // Log the API's error response
        setErrorMessage(error.message || 'Failed to create progress.');
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  
  const handleEnroll = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    // Ensure enrollee.id is valid
    if (!enrollee.id || isNaN(enrollee.id)) {
      setErrorMessage('Invalid student ID.');
      setIsLoading(false);
      return;
    }
  
    // Prepare data with student_id only (both semester and status will be handled by backend)
    const studentData = {
      student_id: parseInt(enrollee.id, 10),
    };
  
    try {
      // Update the student's semester in the students table
      const semesterResponse = await fetch('https://cvsu-backend-system.vercel.app/api/update-student-semester', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),  // Sending the student_id
      });
  
      if (semesterResponse.ok) {
        // Then, update the status in student_progress
        const statusResponse = await fetch('https://cvsu-backend-system.vercel.app/api/update-student-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData),  // Sending the student_id
        });
  
        if (statusResponse.ok) {
          const result = await statusResponse.json();
          console.log('Status updated:', result);
          setSuccessMessage('Student enrolled successfully and status updated.');
          setIsModalOpen(false); // Close modal or proceed to next step
        } else {
          const error = await statusResponse.json();
          console.error('Status Update Error:', error);
          setErrorMessage(error.message || 'Failed to update student status.');
        }
      } else {
        const error = await semesterResponse.json();
        console.error('Semester Update Error:', error);
        setErrorMessage(error.message || 'Failed to update semester.');
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  // Checkbox change handlers
  const handleGradesChange = (event) => {
    setGradesChecked(event.target.checked);
  };

  const handleFeeChange = (event) => {
    setFeeChecked(event.target.checked);
  };

  const handleAdviserChange = (event) => {
    setAdviserChecked(event.target.checked);
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white max-w-lg w-full p-4 shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-green-900 mb-4">Enrollment</h1>
          <p className="text-gray-600 text-sm">
            {enrollee.status === 'Irregular'
              ? 'Welcome to the enrollment system. Since you are an irregular student, please ensure that all necessary requirements, including adviser approval, are completed before proceeding with enrollment.'
              : 'Welcome to the enrollment system. Please make sure to fulfill all the requirements below to complete your enrollment.'}
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Requirements Section */}
        <div>
          <h2 className="text-lg font-semibold text-green-900 mb-4">Requirements</h2>

          {/* Grades Requirement */}
          {enrollee.status !== 'Irregular' && (
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="gradesCheckbox"
                checked={gradesChecked}
                disabled
                onChange={handleGradesChange} // Add onChange handler here
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="gradesCheckbox" className="ml-3 text-gray-700 cursor-pointer select-none">
                Grades: There must be no failing grades.
              </label>
            </div>
          )}

          {/* Society Fee Requirement */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="feeCheckbox"
              checked={feeChecked}
              disabled
              onChange={handleFeeChange} // Add onChange handler here
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="feeCheckbox" className="ml-3 text-gray-700 cursor-pointer select-none">
              Society Fee: You must pay an amount for the society fee.
            </label>
          </div>

          {/* Adviser Approval Requirement for Irregular Students */}
          {enrollee.status === 'Irregular' && (
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="adviserCheckbox"
                checked={adviserChecked}
                disabled
                onChange={handleAdviserChange} // Add onChange handler here
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="adviserCheckbox" className="ml-3 text-gray-700 cursor-pointer select-none">
                Adviser Approval: You must have approval from your adviser.
              </label>
            </div>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {alreadyEnrolled ? (
              <p className="text-green-600 font-semibold text-lg">You are already enrolled.</p>
            ) : (
              enrollee.status === 'Irregular' ? (
                <button
                  onClick={handleEnroll}
                  disabled={!feeChecked || !adviserChecked}
                  className={`px-6 py-2 text-white rounded-lg ${
                    feeChecked && adviserChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'
                  }`}
                >
                  Enroll
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={!feeChecked || !gradesChecked}
                  className={`px-6 py-2 text-white rounded-lg ${
                    feeChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'
                  }`}
                >
                  Enroll
                </button>
              )
            )}
          </div>

        {/* Error and Success Messages */}
        {errorMessage && <div className="text-red-500 text-sm text-center mt-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 text-sm text-center mt-4">{successMessage}</div>}
      </div>

      {/* Modal with Quote */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg mx-4 overflow-y-auto max-h-[80vh]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-900 mb-4">"WELCOME TO ENROLLMENT PAGE."</h2>
              <button
                onClick={handleContinueJourney}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Continue your journey with CvSU'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
