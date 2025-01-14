import React, { useState, useEffect, useRef } from 'react';
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
  const divRef = useRef(null);

  const [formData, setFormData] = useState({ scheduled_date: "", time_period: "" });
  const [slots, setSlots] = useState({ morning: 0, afternoon: 0 });
  const [startDate, setStartDate] = useState(null);
  const [isExistingAppointment, setIsExistingAppointment] = useState(false);



  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No id provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);

  const fetchFormData = async (enrollment_id) => {
    try {
      const response = await fetch(`http://localhost:5005/api/getSchedule?enrollment_id=${enrollment_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (data.scheduled_date && data.time_period) {
        setFormData({ scheduled_date: data.scheduled_date, time_period: data.time_period });
        setStartDate(new Date(data.scheduled_date));
        setIsExistingAppointment(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (formData.scheduled_date && !isExistingAppointment) {
      const fetchSlots = async () => {
        try {
          const response = await fetch(`https://cvsu-backend-system.vercel.app/api/available-slots?date=${formData.scheduled_date}`);
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
  }, [formData.scheduled_date, isExistingAppointment]);

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/document-verification');// Navigate to the desired route
      setActiveItem(item);
    } 
  };


  const handleInputChange = (e, isDatePicker = false) => {
    if (isDatePicker) {
      const selectedDate = e;
      setStartDate(selectedDate);
      setFormData(prevData => ({
        ...prevData,
        scheduled_date: selectedDate ? selectedDate.toLocaleDateString('en-CA') : '', // YYYY-MM-DD format in local time
        time_period: '' 
      }));
    } else {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const isWeekend = date => date.getDay() === 0 || date.getDay() === 6;

  useEffect(() => {
    setIsNextButtonDisabled(!isExisting());
  }, [isExistingAppointment]);

  const isExisting = () => isExistingAppointment

  const validate = () => formData.scheduled_date && formData.time_period && isCheckboxChecked;

  const updateSlotCount = async (date, timePeriod) => {
    try {
      const response = await fetch('http://localhost:5005/update_slot_count', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, timePeriod })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update slots for ${timePeriod} on ${date}`);
      }
      console.log('Slot count updated successfully');
    } catch (error) {
      console.error('Error updating slot count:', error);
    }
  };
  

  const handleSubmit = async e => {
    e.preventDefault();

    if (validate()) {
      const updatedFormData = { ...formData, enrollment_id };
      setSuccessMessage("Application updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
      divRef.current.scrollIntoView({ behavior: "smooth" });


      
      try {
        const response = await fetch('http://localhost:5005/submit_appointment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData)
        });

        if (response.ok) {
          setSuccessMessage("Appointment scheduled successfully!");
          setTimeout(() => setSuccessMessage(""), 5000);
            
          await updateSlotCount(formData.scheduled_date, formData.time_period);

        } else {
          setSuccessMessage("Submission issue. Please try again.");
          setTimeout(() => setSuccessMessage(""), 5000);
          divRef.current.scrollIntoView({ behavior: "smooth" });


        }
      } catch (error) {
        console.error('Submission error:', error);
        setSuccessMessage("An error occurred. Please try again.");
        setTimeout(() => setSuccessMessage(""), 5000);
        divRef.current.scrollIntoView({ behavior: "smooth" });


      }
    } else {
      setSuccessMessage("Invalid form entries. Please check and try again.");
      setTimeout(() => setSuccessMessage(""), 5000);
      divRef.current.scrollIntoView({ behavior: "smooth" });


    }

    setTimeout(() => setSuccessMessage(""), 5000);
    divRef.current.scrollIntoView({ behavior: "smooth" });

  };

  return (
    <div 
    ref={divRef}
    className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col"
    >
      {successMessage && (
        <div 
        
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="relative text-center my-10">
      <button 
            onClick={() => handleSecondClick('/requirements')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2text-[#345e34] hover:text-green-900">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        <h1 className="text-3xl font-extrabold text-[#001800]">Schedule Appointment</h1>
        
        <button
          onClick={() => handleFirstClick('/document-verification')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
         >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
          
      </div>

      <div className="appointment-form-container min-h-screen">
        <div className="bg-gray-800 text-white px-4 rounded pt-3 pb-6 mb-3">
          <h3 className="text-lg font-bold mb-2">Directions</h3>
          <ul className="list-disc pl-6">
            <li>Choose a date and time for your OSAS appointment at Cavite State University - Bacoor.</li>
            <li>Select "Schedule Appointment" to finalize your admission application.</li>
          </ul>
        </div>

      <div className="appointment-form-container">
        {isExistingAppointment ? (
          <div className="bg-yellow-100 text-yellow-700 px-4 py-3 rounded mb-4">
          You already have an appointment scheduled for {new Date(formData.scheduled_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} at {formData.time_period}. Please contact support to make changes.
        </div>
        
        ) : (
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
                name="time_period"
                value={formData.time_period}
                onChange={handleInputChange}
                required
                className="block w-full p-2 border rounded"
              >
                <option value="" disabled>Select a time slot</option>
                <option value="morning" disabled={slots.morning === 0}>
                  08:00 AM - 12:00 PM ({slots.morning} slots left)
                </option>
                <option value="afternoon" disabled={slots.afternoon === 0}>
                  01:00 PM - 05:00 PM ({slots.afternoon} slots left)
                </option>
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
              disabled={isExistingAppointment}
            >
              Schedule Appointment
            </button>
            
          </form>
          
        )}
      </div>
      </div>

    </div>
  );
};

export default Appointment;
