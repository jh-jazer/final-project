import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Enroll = () => {
  const location = useLocation();
  const userStatus = location.state?.status || 'Regular'; // Fallback to 'Regular' if no state is passed

  const [gradesChecked, setGradesChecked] = useState(false);
  const [feeChecked, setFeeChecked] = useState(false);
  const [adviserChecked, setAdviserChecked] = useState(false); // Add adviser approval checkbox
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false); // Add state for appointment modal
  const [selectedReason, setSelectedReason] = useState('');
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [proofImage, setProofImage] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(''); // Add state for appointment time
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false); // Track if appointment is scheduled
  const [appointmentId, setAppointmentId] = useState(null); // Track the appointment ID

  const user = {
    id: '202212345',
    name: 'John Doe',
    course: 'BSCS',
    status: userStatus, // Use status from the location state
    email: 'johndoe@cvsu.edu.ph',
  };

  const handleEnroll = () => {
    if (!gradesChecked || !feeChecked || (user.status === 'Irregular' && !adviserChecked)) {
      alert('Please complete all requirements before enrolling.');
    } else {
      alert('Enrollment successful!');
    }
  };

  const handleIrregularChange = () => {
    setIsModalOpen(true);
  };

  const handleAppointmentRequest = () => {
    if (isAppointmentScheduled) {
      alert('You already have a scheduled appointment.');
    } else {
      setIsAppointmentModalOpen(true); // Open the appointment modal
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedReason('');
    setIsRequestSent(false);
    setProofImage(null);
    setExplanation('');
    // Reset the checkbox states here if needed
    setGradesChecked(false);
    setFeeChecked(false);
    setAdviserChecked(false);
  };

  const handleAppointmentModalClose = () => {
    setIsAppointmentModalOpen(false);
    setAppointmentTime('');
    // Reset the checkbox states if needed for appointment form
  };

  const handleSendRequest = () => {
    if (selectedReason === '' || !proofImage || explanation === '') {
      alert('Please fill all fields before sending the request.');
    } else {
      setIsRequestSent(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if the file size is below 1MB (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        alert('File size must be less than 1MB.');
        return;
      }

      // If valid, set the image preview
      setProofImage(URL.createObjectURL(file));
    }
  };

  const handleScheduleAppointment = () => {
    if (!appointmentTime) {
      alert("Please select both date and time before scheduling.");
      return;
    }

    // Generate a unique appointment ID
    const generatedAppointmentId = `APPT-${Date.now()}`;

    setAppointmentId(generatedAppointmentId); // Store the generated ID
    setIsAppointmentScheduled(true);
    alert(`Your Advising appointment is scheduled for ${appointmentTime}. Your Appointment ID is ${generatedAppointmentId}`);
    setIsAppointmentModalOpen(false); // Close the modal after scheduling the appointment
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white max-w-lg w-full p-4 shadow-lg rounded-lg">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-green-900 mb-4">Enrollment</h1>
          <p className="text-gray-600 text-sm">
          {user.status === 'Irregular' 
            ? 'Welcome to the enrollment system. Since you are an irregular student, please ensure that all necessary requirements, including adviser approval, are completed before proceeding with enrollment.'
            : 'Welcome to the enrollment system. Please make sure to fulfill all the requirements below to complete your enrollment.'}
        </p>

        </div>

        <hr className="my-6 border-gray-300" />

        {/* Requirements Section */}
        <div>
          <h2 className="text-lg font-semibold text-green-900 mb-4">Requirements</h2>

          {/* Grades Requirement */}
          {user.status !== 'Irregular' && (
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
          {user.status === 'Irregular' && (
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
          <hr className="my-6 border-gray-300" />

          {/* Display selected appointment time if chosen */}
          {appointmentTime && !isAppointmentScheduled && (
            <div className="mt-4 text-gray-700">
              <p className="font-semibold">Your chosen appointment:</p>
              <p>{appointmentTime}</p>
            </div>
          )}

          {isAppointmentScheduled && (
            <div className="mt-4 text-gray-700">
              <p className="font-semibold text-green-700">Your advising appointment has been scheduled for:</p>
              <p className="text-green-700">{appointmentTime}</p>
              <p className="text-green-700 font-semibold mt-2">Appointment ID: {appointmentId}</p> {/* Display Appointment ID */}
            </div>
          )}
        </div>

        <hr className="my-6 border-gray-300" />

       {/* Action Buttons */}
<div className="flex justify-center space-x-4">
  {user.status === 'Irregular' ? (
    <>
      <button
        onClick={handleEnroll}
        disabled={!feeChecked || !adviserChecked}
        className={`px-6 py-2 text-white rounded-lg ${feeChecked && adviserChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'}`}
      >
        Enroll
      </button>
      <button
        onClick={handleAppointmentRequest}
        disabled={isAppointmentScheduled} // Disable if appointment is already scheduled
        className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg ${isAppointmentScheduled ? 'cursor-not-allowed bg-blue-400' : ''}`}
      >
        Request Appointment
      </button>
    </>
        ) : (
          <>
            <button
              onClick={handleEnroll}
              disabled={!feeChecked}
              className={`px-6 py-2 text-white rounded-lg ${feeChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-green-400 cursor-not-allowed'}`}
            >
              Enroll
            </button>
            
            {/* Only show the 'Change to Irregular' button if the student is not already irregular */}
            <button
              onClick={handleIrregularChange}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Change to Irregular
            </button>
          </>
        )}
      </div>

       
      </div>

      {/* Irregular Change Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[80vh]">
            {isRequestSent ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-green-900 mb-4">Request Sent</h2>
                <p className="text-gray-600 mb-6">Your request to change to irregular status has been sent. Please wait for the approval.</p>
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-green-900 mb-4">Change to Irregular Status</h2>
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">ID: {user.id}</p>
                  <p className="text-gray-700 mb-4">Email: {user.email}</p>
                  <label htmlFor="reason" className="block text-gray-700 mb-2">Reason for switching to irregular:</label>
                  <select
                    id="reason"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a reason</option>
                    <option value="Personal issues">Personal issues</option>
                    <option value="Academic difficulties">Academic difficulties</option>
                    <option value="Health reasons">Health reasons</option>
                    <option value="Financial problems">Financial problems</option>
                    <option value="Change of career">Change of career or academic path</option>
                    <option value="Work commitments">Work commitments</option>
                    <option value="Study abroad">Study abroad or exchange programs</option>
                    <option value="Other">Other (Please use the Text-Box below)</option>
                  </select>
                </div>

                {/* Image Upload Section for Proof */}
                <div className="mb-6">
                  <label htmlFor="proof" className="block text-gray-700 mb-2">Proof of Reason:</label>
                  <input
                    type="file"
                    id="proof"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-gray-700"
                  />
                  {proofImage && (
                    <div className="mt-4">
                      <img src={proofImage} alt="Proof" className="max-w-full h-auto" />
                    </div>
                  )}
                </div>

                {/* Text Explanation Section */}
                <div className="mb-6">
                  <label htmlFor="explanation" className="block text-gray-700 mb-2">Additional Explanation:</label>
                  <textarea
                    id="explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex justify-between space-x-4">
              {/* Cancel Button */}
              <button
                onClick={handleModalClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>

              {/* Schedule Button */}
              <button
                onClick={handleSendRequest}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Send Request
              </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl mx-4 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold text-green-900 mb-4">Choose Appointment Time</h2>

            {/* Date Selection */}
            <div className="mb-6">
              <label htmlFor="appointmentDate" className="block text-gray-700 mb-2">Select Appointment Date</label>
              <input
                type="date"
                id="appointmentDate"
                value={appointmentTime.split(' ')[0] || ''}
                onChange={(e) => setAppointmentTime(`${e.target.value} ${appointmentTime.split(' ')[1] || 'Morning'}`)}
                min={new Date().toISOString().split('T')[0]} // Restrict to future dates only
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <label htmlFor="appointmentTime" className="block text-gray-700 mb-2">Select Appointment Time</label>
              <select
                id="appointmentTime"
                value={appointmentTime.split(' ')[1] || 'Morning'}
                onChange={(e) => setAppointmentTime(`${appointmentTime.split(' ')[0]} ${e.target.value}`)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </div>

            <div className="flex justify-between space-x-4">
              {/* Cancel Button */}
              <button
                onClick={handleAppointmentModalClose}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
              >
                Cancel
              </button>

              {/* Schedule Button */}
              <button
                onClick={handleScheduleAppointment}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enroll;
