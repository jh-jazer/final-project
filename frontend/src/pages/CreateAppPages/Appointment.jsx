import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';

const Appointment = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const { userDetails } = useOutletContext();
  const enrollment_id = userDetails?.enrollment_id || "No id provided";
  const { setActiveItem } = useActiveItem();

  const [formData, setFormData] = useState({ date: "", time: "" });
  const [slots, setSlots] = useState({ morning: 0, afternoon: 0 });
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (formData.date) {
      const fetchSlots = async () => {
        try {
          const response = await fetch(`https://cvsu-backend-system.vercel.app/api/available-slots?date=${formData.date}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

          const data = await response.json();
          setSlots({ morning: data.morning, afternoon: data.afternoon });
        } catch (error) {
          console.error('Error fetching available slots:', error);
          alert("An error occurred while fetching available slots. Please try again later.");
        }
      };
      fetchSlots();
    }
  }, [formData.date]);

  const handleInputChange = (e, isDatePicker = false) => {
    if (isDatePicker) {
      const selectedDate = e;
      setStartDate(selectedDate);
      setFormData(prevData => ({
        ...prevData,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : ''
      }));
    } else {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const isWeekend = date => date.getDay() === 0 || date.getDay() === 6;

  useEffect(() => {
    setIsNextButtonDisabled(!validate());
  }, [formData, isCheckboxChecked]);

  const validate = () => formData.date && formData.time && isCheckboxChecked;

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      const updatedFormData = { ...formData, enrollment_id };

      try {
        const response = await fetch('http://localhost:5005/submit_personal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData)
        });

        if (response.ok) {
          setSuccessMessage("Appointment scheduled successfully!");
          setFormData({ date: '', time: '' });
          setStartDate(null);
        } else {
          setSuccessMessage("Submission issue. Please try again.");
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSuccessMessage("An error occurred. Please try again.");
      }
    } else {
      setSuccessMessage("Invalid form entries. Please check and try again.");
    }

    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      <div className="relative text-center my-10">
        <button 
          onClick={() => navigate('/createapplication/requirement')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold text-[#001800]">Schedule Appointment</h1>
      

      <button
        onClick={() => navigate('/createapplication/document-verification')}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isNextButtonDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      </div>

      <div className="appointment-form-container">
        <div className="bg-gray-800 text-white px-4 rounded pt-3 pb-6 mb-3">
          <h3 className="text-lg font-bold mb-2">Directions</h3>
          <ul className="list-disc pl-6">
            <li>Choose a date and time for your OSAS appointment at Cavite State University - Bacoor.</li>
            <li>Select "Schedule Appointment" to finalize your admission application.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Select Date</label>
            <DatePicker
              selected={startDate}
              onChange={date => handleInputChange(date, true)}
              minDate={new Date()}
              filterDate={date => !isWeekend(date)}
              dateFormat="yyyy-MM-dd"
              className="block w-full p-2 border rounded"
              placeholderText="Select a date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">Select Time</label>
            <select
              id="appointmentTime"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className="block w-full p-2 border rounded"
            >
              <option value="" disabled>Select a time slot</option>
              <option value="morning">08:00 AM - 12:00 PM ({slots.morning} slots left)</option>
              <option value="afternoon">01:00 PM - 05:00 PM ({slots.afternoon} slots left)</option>
            </select>
          </div>

          <div className="bg-gray-100 p-4 rounded mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={e => setIsCheckboxChecked(e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm">I certify that all information provided is true and correct.</span>
            </label>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
          >
            Schedule Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
