import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css";
import { useActiveItem } from "../../contexts/CreateAppContext";

const Appointment = () => {
  const navigate = useNavigate();
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // Checkbox state
  const { setActiveItem } = useActiveItem();
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
  }); // Store the selected date and time


  const handleSecondClick = (item) => {
    if (isSubmitButtonDisabled) {
      navigate('/createapplication/requirements');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  const slots = {
    morning: 5, // Example slots left in the morning
    afternoon: 3, // Example slots left in the afternoon
  };

  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date,item) => {
    setStartDate(date);
    setActiveItem(item);
    setDate(date); // Store the date selected
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday (0) or Saturday (6)
  };

  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select both a date and a time for the appointment.");
    } else {
      // Format the date to a readable string
      const formattedDate = new Date(date).toLocaleDateString();

      const appointment = {
        date: formattedDate,
        time,
      };

      setAppointmentDetails(appointment); // Store appointment details
      setIsSubmitConfirmationOpen(true); // Open confirmation dialog
    }
  };

 const confirmSubmit = (item) => {
    navigate("/createapplication/document-verification"); // Navigate to /admissiondb
    setActiveItem(item);
  };


  const cancelSubmit = (item) => {
    setIsSubmitConfirmationOpen(false); // Close confirmation dialog
    setActiveItem(item);
  };

  // Enable/disable submit button dynamically
  useEffect(() => {
    if (date && time && isCheckboxChecked) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [date, time, isCheckboxChecked]);

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      <div className="relative text-center my-10">
      <button 
            onClick={() => handleSecondClick('/requirements')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2text-[#345e34] hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        <h1 className="text-3xl font-extrabold text-[#001800]">Schedule Appointment</h1>
      </div>

      <div className="appointment-form-container">
        <div className="bg-gray-800 text-white px-4 rounded pt-3 pb-6 mb-3">
          <h3 className="text-lg text-white font-bold mb-2">Directions</h3>
          <ul className="list-disc pl-6">
            <li>
              Choose a date and time you can visit the Office of Student Affairs and Services (OSAS) at Cavite State University - Bacoor to personally submit the original copies of your uploaded requirements for validation.
            </li>
            <li>
              Select Submit Application to schedule your appointment and finalize your admission application.
            </li>
          </ul>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Select Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              minDate={new Date()} // Restrict past dates
              filterDate={(date) => !isWeekend(date)} // Disable weekends
              dateFormat="yyyy-MM-dd"
              className="block w-full p-2 border rounded"
              placeholderText="Select a date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">Select Time</label>
            <select
              id="appointmentTime"
              name="appointmentTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="block w-full p-2 border rounded"
            >
              <option value="" disabled>Select a time slot</option>
              <option value="08:00 AM-12:00 PM">
                08:00 AM - 12:00 PM ({slots.morning} slots left)
              </option>
              <option value="01:00 PM-05:00 PM">
                01:00 PM - 05:00 PM ({slots.afternoon} slots left)
              </option>
            </select>
          </div>

          {/* Certification Statement */}
          <div className="bg-gray-100 p-4 rounded mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm">
                I hereby certify that all information stated are true and correct to the best of my knowledge.
              </span>
            </label>
          </div>
        </form>
      </div>

      <div className="flex justify-end gap-5 mb-5 mx-5">
        <div className="text-left">
          <button
            className={`px-6 py-2 font-bold rounded-lg focus:outline-none ${isSubmitButtonDisabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-green-500 text-white hover:bg-red-700"}`}
            onClick={handleSubmit}
            disabled={isSubmitButtonDisabled}
          >
            Schedule Appointment
          </button>
        </div>
      </div>

     {/* Submit Confirmation Modal */}
{isSubmitConfirmationOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm mx-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Confirm Appointment Schedule
      </h2>
      <p className="text-lg text-gray-600 text-center mb-4">
        Are you sure you want to schedule this appointment?
      </p>
      <div className="text-center mb-6">
        {appointmentDetails && (
          <p className="text-xl font-medium text-gray-800">
            <span className="block">{appointmentDetails.date}</span>
            <span className="block text-green-600">{appointmentDetails.time}</span>
          </p>
        )}
      </div>
      <div className="flex justify-around gap-4">
        <button
          onClick={() => confirmSubmit('/document-verification')}
          className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Confirm
        </button>
        <button
          onClick={() => cancelSubmit('/document-verification')}
          className="px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Appointment;
