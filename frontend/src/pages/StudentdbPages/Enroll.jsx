import React, { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";

const Enroll = () => {
  const user = useOutletContext();
  const [gradesChecked, setGradesChecked] = useState(false);
  const [feeChecked, setFeeChecked] = useState(false);
  const [adviserChecked, setAdviserChecked] = useState(false); // Add adviser approval checkbox
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal should be open initially

  const enrollee = {
    id: user.id,
    name: user.full_name,
    course: user.program,
    status: user.type,
  };

  // Handle Continue Journey
  const handleContinueJourney = async () => {
    setIsModalOpen(false); // Close the modal when user clicks

    // Prepare the data to be inserted into the database
    const progressData = {
      student_id: enrollee.id,
      checklist_verification: 'pending',  // Set default state
      society_payment: 'pending',         // Set default state
      advising_requirement: 'pending'    // Set default state
    };

    try {
      // Make the API call to create a new row in the student_progress table
      const response = await fetch('http://localhost:5000/api/student-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(progressData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Progress created:', result);
      } else {
        console.error('Failed to create progress');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle Enroll
  const handleEnroll = () => {
    console.log('Enrollment started');
    // You can add additional actions like submitting the enrollment data here
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
                onChange={() => setGradesChecked(!gradesChecked)}
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
              onChange={() => setFeeChecked(!feeChecked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="feeCheckbox" className="ml-3 text-gray-700 cursor-pointer select-none">
              Society Fee: You must pay an amount for the society fee.
            </label>
          </div>

          {/* Add Adviser Approval requirement for Irregular students */}
          {enrollee.status === 'Irregular' && (
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="adviserCheckbox"
                checked={adviserChecked}
                onChange={() => setAdviserChecked(!adviserChecked)}
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
          {enrollee.status === 'Irregular' ? (
            <button
              onClick={handleEnroll}
              disabled={!feeChecked || !adviserChecked}
              className={`px-6 py-2 text-white rounded-lg ${feeChecked && adviserChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'}`}
            >
              Enroll
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={!feeChecked}
              className={`px-6 py-2 text-white rounded-lg ${feeChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'}`}
            >
              Enroll
            </button>
          )}
        </div>
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
              >
                Continue your journey with CvSU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
