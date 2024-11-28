import React, { useState } from 'react';

const Enroll = () => {
  const [gradesChecked, setGradesChecked] = useState(false);
  const [feeChecked, setFeeChecked] = useState(false);

  const handleEnroll = () => {
    if (!gradesChecked || !feeChecked) {
      alert('Please complete all requirements before enrolling.');
    } else {
      alert('Enrollment successful!');
    }
  };

  const handleIrregularChange = () => {
    alert('Changed to irregular status.');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white max-w-lg w-full p-8 shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-green-900 mb-4">Enrollment</h1>
          <p className="text-gray-600 text-sm">
            Welcome to the enrollment system. Please make sure to fulfill all the requirements below to complete your
            enrollment. You may also choose to switch to irregular status if necessary.
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Requirements Section */}
        <div>
          <h2 className="text-lg font-semibold text-green-900 mb-4">Requirements</h2>

          {/* Grades Requirement */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="gradesCheckbox"
              checked={gradesChecked}
              onChange={() => setGradesChecked(!gradesChecked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="gradesCheckbox"
              className="ml-3 text-gray-700 cursor-pointer select-none"
            >
              Grades: There must be no failing grades.
            </label>
          </div>

          {/* Society Fee Requirement */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="feeCheckbox"
              checked={feeChecked}
              onChange={() => setFeeChecked(!feeChecked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="feeCheckbox"
              className="ml-3 text-gray-700 cursor-pointer select-none"
            >
              Society Fee: You must pay an amount for the society fee.
            </label>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleEnroll}
            disabled={!gradesChecked || !feeChecked}
            className={`px-6 py-2 text-white rounded-lg ${
              gradesChecked && feeChecked
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-green-400 cursor-not-allowed'
            }`}
          >
            Enroll
          </button>
          <button
            onClick={handleIrregularChange}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Change to Irregular
          </button>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
