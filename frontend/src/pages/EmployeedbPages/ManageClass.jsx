import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [startDate, setStartDate] = useState('2025-01-15');
  const [endDate, setEndDate] = useState('2025-06-15');

  useEffect(() => {
    // Fetch appointments when the component mounts or the date range changes
    axios
      .get('http://localhost:3001/appointments', {
        params: { startDate, endDate },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  }, [startDate, endDate]);

  const handleSlotChange = (id, newAvailableSlots) => {
    axios
      .put(`http://localhost:3001/appointments/${id}`, { availableSlots: newAvailableSlots })
      .then(() => {
        // Update the appointments state after successful update
        setAppointments((prevAppointments) =>
          prevAppointments.map((appt) =>
            appt.id === id ? { ...appt, available_slots: newAvailableSlots } : appt
          )
        );
      })
      .catch((error) => console.error('Error updating appointment:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Appointments</h1>

        <div className="flex space-x-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Time Period</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Available Slots</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Max Slots</th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-sm text-gray-800">{appointment.date}</td>
                  <td className="py-3 px-6 text-sm text-gray-800">{appointment.time_period}</td>
                  <td className="py-3 px-6 text-sm text-gray-800">
                    <input
                      type="number"
                      value={appointment.available_slots}
                      onChange={(e) => handleSlotChange(appointment.id, +e.target.value)}
                      min="0"
                      max={appointment.max_slots}
                      className="w-16 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-800">{appointment.max_slots}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleSlotChange(appointment.id, appointment.available_slots)}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
