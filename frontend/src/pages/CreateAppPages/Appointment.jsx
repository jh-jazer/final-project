import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Appointment = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (date && time) {
      const appointment = {
        date,
        time,
      };
      setAppointments((prevAppointments) => [...prevAppointments, appointment]);
      setDate(''); // Clear the date input after adding
      setTime(''); // Clear the time input after adding
    } else {
      alert("Please select both a date and a time for the appointment.");
    }
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleSubmit = () => {
    if (appointments.length === 0) {
      alert("Please add at least one appointment before submitting.");
    } else {
      setIsSubmitConfirmationOpen(true);
    }
  };

  const confirmSubmit = () => {
    // Proceed with the submission
    alert("Your appointments have been submitted successfully!");
    setIsSubmitConfirmationOpen(false); // Close confirmation dialog
  };

  const cancelSubmit = () => {
    setIsSubmitConfirmationOpen(false); // Close confirmation dialog
  };

  // Enable the submit button only when both date and time are selected
  useEffect(() => {
    if (appointments.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [appointments]); // This will run whenever appointments change

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      <div className="appointment-form-container">
        <h2 className='text-3xl font-extrabold flex justify-center items-center'>Schedule an Appointment</h2>
        <form onSubmit={handleAddAppointment}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Select Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="appointmentTime">Select Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Add Appointment</button>
        </form>

        <div className="appointments-list">
          <h3>Scheduled Appointments</h3>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index} className="appointment-item">
                <span>{`${appointment.date} at ${appointment.time}`}</span>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteAppointment(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-5 mb-5 mx-5">
      <Link to="/createapplication/requirements">
        <button
          className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none"
          
        >
          Prev
        </button>
        </Link>

        {/* The Submit button is now disabled if there are no appointments */}
        <button
          className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none"
          disabled={appointments.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Submit Confirmation Dialog */}
      {isSubmitConfirmationOpen && (
        <div className="confirmation-dialog flex justify-end">
          <p className='flex justify-end mt-6'>Are you sure you want to submit your appointments?</p>
          <div className="flex justify-around mt-4 gap-5 mb-5 mx-5">
            <button onClick={confirmSubmit} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Yes
            </button>
            <button onClick={cancelSubmit} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
