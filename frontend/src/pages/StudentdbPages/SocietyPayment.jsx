import React, { useState, useEffect } from 'react';

const SocietyPayments = () => {
  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      enrolleeID: '202212345',
      enrolleeName: 'John Doe',
      course: 'Computer Science',
      year: '2nd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Yes',
      requirementsComplete: 'Yes',
      enrolleeType: 'Regular', // Add enrolleeType to differentiate
    },
    {
      id: 2,
      enrolleeID: '202212346',
      enrolleeName: 'Jane Smith',
      course: 'Information Technology',
      year: '3rd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'No',
      requirementsComplete: 'No',
      enrolleeType: 'Irregular', // Add enrolleeType to differentiate
    },
    {
      id: 3,
      enrolleeID: '202212347',
      enrolleeName: 'Mark Lee',
      course: 'Computer Science',
      year: '1st Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Yes',
      requirementsComplete: 'Yes',
      enrolleeType: 'Regular', // Add enrolleeType to differentiate
    },
    {
      id: 4,
      enrolleeID: '202212348',
      enrolleeName: 'Alice Johnson',
      course: 'Information Technology',
      year: '2nd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'No',
      requirementsComplete: 'No',
      enrolleeType: 'Irregular', // Add enrolleeType to differentiate
    },
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [studentType, setStudentType] = useState('Regular'); // State to toggle between tables

  useEffect(() => {
    // Fetch enrollment data from an API or database
    // Example: setEnrollments(fetchedData);
  }, []);

  // Update the requirementsComplete based on Society Fee and Checklist
  const updateRequirements = (enrollee) => {
    if (enrollee.societyFeePaid === 'Yes' && enrollee.checklistValid === 'Yes') {
      return 'Yes';
    }
    return 'No';
  };

  const handleApproval = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              societyFeePaid: 'Yes',
              requirementsComplete: updateRequirements({ ...enrollee, societyFeePaid: 'Yes' }), // Update the requirementsComplete after approval
            }
          : enrollee
      )
    );
  };

  const handleRejection = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              societyFeePaid: 'No',
              requirementsComplete: updateRequirements({ ...enrollee, societyFeePaid: 'No' }), // Update the requirementsComplete after rejection
            }
          : enrollee
      )
    );
  };

  // Sorting logic updated for "Society Fee Paid"
  const filteredEnrollments = enrollments
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.enrolleeName.localeCompare(b.enrolleeName);
      } else if (sortBy === 'society fee') {
        // Sort by "Society Fee Paid" status with "Yes" > "No"
        if (a.societyFeePaid === 'Yes' && b.societyFeePaid === 'No') return -1;
        if (a.societyFeePaid === 'No' && b.societyFeePaid === 'Yes') return 1;
        return 0;
      }
      return 0;
    });

  const handleRadioChange = (type) => {
    setStudentType(type); // Toggle between 'Regular' and 'Irregular' student types
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Enrollment Management
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Enrollee Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
  
        {/* Sort Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="name">Sort by Enrollee Name</option>
            <option value="society fee">Sort by Payment Status</option>
          </select>
        </div>

        <div className="mb-4 flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="studentType"
              value="Regular"
              checked={studentType === 'Regular'}
              onChange={() => handleRadioChange('Regular')}
              className="mr-2"
            />
            Regular Students
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="studentType"
              value="Irregular"
              checked={studentType === 'Irregular'}
              onChange={() => handleRadioChange('Irregular')}
              className="mr-2"
            />
            Irregular Students
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Enrollee ID</th>
                <th className="px-4 py-2 text-left border border-gray-300">Enrollee Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                <th className="px-4 py-2 text-left border border-gray-300">Society Fee Paid</th>
                <th className="px-4 py-2 text-left border border-gray-300">Payment Validation</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments
                .filter((enrollee) => enrollee.enrolleeType === studentType)
                .map((enrollee) => (
                  <tr key={enrollee.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{enrollee.enrolleeID}</td>
                    <td className="px-4 py-2 border border-gray-300">{enrollee.enrolleeName}</td>
                    <td className="px-4 py-2 border border-gray-300">{enrollee.course}</td>
                    <td className="px-4 py-2 border border-gray-300">{enrollee.year}</td>
                    <td className="px-4 py-2 border border-gray-300">{enrollee.societyFeePaid}</td>
                    <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleApproval(enrollee.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                      >
                        Paid
                      </button>
                      <button
                        onClick={() => handleRejection(enrollee.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                      >
                        Unpaid
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

export default SocietyPayments;
