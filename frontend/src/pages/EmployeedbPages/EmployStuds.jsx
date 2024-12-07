import React, { useState, useEffect } from 'react';

const StudentInformation = () => {
  // Sample data to simulate all student information
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '09123456789',
      address: '123 Main St, Cavite',
      year: '3rd Year',
      section: 'A',
      course: 'Computer Science',
      enrollmentStatus: 'Enrolled',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '09123456788',
      address: '456 Oak St, Cavite',
      year: '2nd Year',
      section: 'B',
      course: 'Information Technology',
      enrollmentStatus: 'Graduated',
    },
    // Add more students as needed
  ]);

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Current', 'Graduated'

  useEffect(() => {
    // Fetch data from an API or database here if needed
    // Example: setStudents(fetchedData);
    setFilteredStudents(students);
  }, [students]);

  // Filter students based on the search term and status filter
  const filterStudents = () => {
    let filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm)
    );

    if (statusFilter !== 'All') {
      filtered = filtered.filter((student) => student.enrollmentStatus === statusFilter);
    }

    return filtered;
  };

  // Handle sorting by name or enrollment status
  const handleSort = (key) => {
    const sorted = [...filteredStudents].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setFilteredStudents(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Update filtered students when the filter or search term changes
  useEffect(() => {
    setFilteredStudents(filterStudents());
  }, [searchTerm, statusFilter]);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Information</h2>

        {/* Search bar */}
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full mb-4"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Radio buttons for filtering by enrollment status (inline) */}
        <div className="mb-4 flex flex-wrap sm:flex-nowrap space-x-6 sm:space-x-8">
          <label className="flex items-center">
            <input
              type="radio"
              name="statusFilter"
              value="All"
              checked={statusFilter === 'All'}
              onChange={() => setStatusFilter('All')}
              className="mr-2"
            />{' '}
            All Students
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="statusFilter"
              value="Enrolled"
              checked={statusFilter === 'Enrolled'}
              onChange={() => setStatusFilter('Enrolled')}
              className="mr-2"
            />{' '}
            Current Students
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="statusFilter"
              value="Graduated"
              checked={statusFilter === 'Graduated'}
              onChange={() => setStatusFilter('Graduated')}
              className="mr-2"
            />{' '}
            Graduated
          </label>
        </div>

        {/* Table for student information */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Student Name
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('phone')}
                >
                  Phone
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('address')}
                >
                  Address
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('year')}
                >
                  Year
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('section')}
                >
                  Section
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('course')}
                >
                  Course
                </th>
                <th
                  className="px-4 py-2 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort('enrollmentStatus')}
                >
                  Enrollment Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.phone}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.year}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.section}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.course}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.enrollmentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;
