import React, { useState, useEffect } from 'react';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-01-31');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [newAvailableSlots, setNewAvailableSlots] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const appointmentsPerPage = 25; // Maximum appointments per page

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, startDate, endDate, searchTerm]);

  // Fetch all appointments data from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://cvsu-backend-system.vercel.app/api/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const filterAppointments = () => {
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      const isWithinDateRange = appointmentDate >= start && appointmentDate <= end;

      // Extract the month from the appointment date
      const appointmentMonth = appointmentDate
        .toLocaleString('default', { month: 'long' })
        .toLowerCase();

      // Check if the appointment matches the search term (month or time period)
      const isMatchingSearchTerm =
        searchTerm === '' ||
        appointment.time_period.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointmentMonth.includes(searchTerm.toLowerCase()) ||
        appointment.date.toLowerCase().includes(searchTerm.toLowerCase());

      return isMatchingSearchTerm && isWithinDateRange;
    });
    setFilteredAppointments(filtered);
  };

  // Function to handle saving the updated available slots
  const handleSaveSlots = async (appointmentId) => {
    if (newAvailableSlots && !isNaN(newAvailableSlots)) {
      try {
        // Send PUT request to update the available slots in the backend
        const response = await fetch(
          `https://cvsu-backend-system.vercel.app/api/appointments/${appointmentId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ available_slots: newAvailableSlots }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update available slots');
        }

        // Update the state locally to reflect the change in the UI
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, available_slots: newAvailableSlots }
              : appointment
          )
        );

        // Reset editing state
        setEditingSlotId(null);
        setNewAvailableSlots('');
      } catch (error) {
        console.error('Error updating available slots:', error);
      }
    }
  };

  // Function to format date in a more readable way
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options); // Formats to "January 15, 2025"
  };

  // Get the appointments for the current page
  const paginateAppointments = (appointments) => {
    const startIndex = (currentPage - 1) * appointmentsPerPage;
    const endIndex = startIndex + appointmentsPerPage;
    return appointments.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 ">Manage Appointments</h2>

        {/* Date range filters */}
        <div className="flex space-x-4 mb-6  overflow-x-auto">
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

        {/* Search by month */}
        <div className="mb-6">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Search by time period or month (e.g., January)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs for Appointment Status */}
        <div className="mb-4 flex flex-wrap space-x-6">
          <button
            onClick={() => setActiveTab('Upcoming')}
            className={`${
              activeTab === 'Upcoming' ? 'text-blue-600 font-semibold' : 'text-gray-600'
            } px-4 py-2`}
          >
            Upcoming Appointments
          </button>
          <button
            onClick={() => setActiveTab('Past')}
            className={`${
              activeTab === 'Past' ? 'text-blue-600 font-semibold' : 'text-gray-600'
            } px-4 py-2`}
          >
            Past Appointments
          </button>
        </div>

        {/* Table for Appointments */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Date</th>
                <th className="px-4 py-2 text-left border border-gray-300">Time Period</th>
                <th className="px-4 py-2 text-left border border-gray-300">Available Slots</th>
                <th className="px-4 py-2 text-left border border-gray-300">Max Slots</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginateAppointments(filteredAppointments)
                .filter((appointment) => {
                  const appointmentDate = new Date(appointment.date);
                  const today = new Date();
                  return activeTab === 'Upcoming'
                    ? appointmentDate >= today
                    : appointmentDate < today;
                })
                .map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">
                      {formatDate(appointment.date)}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{appointment.time_period}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {editingSlotId === appointment.id ? (
                        <input
                          type="number"
                          value={newAvailableSlots}
                          onChange={(e) => setNewAvailableSlots(e.target.value)}
                          className="p-2 border border-gray-300 rounded-md w-20"
                        />
                      ) : (
                        appointment.available_slots
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{appointment.max_slots}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {editingSlotId === appointment.id ? (
                        <button
                          onClick={() => handleSaveSlots(appointment.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingSlotId(appointment.id);
                            setNewAvailableSlots(appointment.available_slots);
                          }}
                          className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Prev
          </button>
          <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
