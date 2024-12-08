import React, { useState, useEffect } from 'react';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      course: 'Computer Science',
      applicationStatus: 'Pending',
      submittedDate: '2024-11-10',
      applicantType: 'Regular',
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      course: 'Information Technology',
      applicationStatus: 'Approved',
      submittedDate: '2024-11-12',
      applicantType: 'Regular',
    },
    {
      id: 3,
      studentName: 'Mark Lee',
      course: 'Computer Science',
      applicationStatus: 'Rejected',
      submittedDate: '2024-11-15',
      applicantType: 'Irregular',
    },
    {
      id: 4,
      studentName: 'Alice Johnson',
      course: 'Information Technology',
      applicationStatus: 'Pending',
      submittedDate: '2024-11-18',
      applicantType: 'Regular',
    },
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [applicantTypeFilter, setApplicantTypeFilter] = useState('All');

  useEffect(() => {
    // Fetch application data from an API or database
    // Example: setApplications(fetchedData);
  }, []);

  const handleApproval = (id) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === id
          ? { ...application, applicationStatus: 'Approved' }
          : application
      )
    );
  };

  const handleRejection = (id) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === id
          ? { ...application, applicationStatus: 'Rejected' }
          : application
      )
    );
  };

  const filteredApplications = applications
    .filter((application) => {
      return (
        application.studentName.toLowerCase().includes(search.toLowerCase()) &&
        (applicantTypeFilter === 'All' || application.applicantType === applicantTypeFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.studentName.localeCompare(b.studentName);
      } else if (sortBy === 'status') {
        return a.applicationStatus.localeCompare(b.applicationStatus);
      }
      return 0;
    });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Application Management</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Student Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Applicant Type Filter Dropdown */}
        <div className="mb-4">
          <select
            value={applicantTypeFilter}
            onChange={(e) => setApplicantTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="All">All Applicants</option>
            <option value="Regular">Regular</option>
            <option value="Irregular">Irregular</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="name">Sort by Student Name</option>
            <option value="status">Sort by Application Status</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Student Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                <th className="px-4 py-2 text-left border border-gray-300">Application Status</th>
                <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{application.studentName}</td>
                  <td className="px-4 py-2 border border-gray-300">{application.course}</td>
                  <td className="px-4 py-2 border border-gray-300">{application.applicationStatus}</td>
                  <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                  <td className="px-4 py-2 border border-gray-300">{application.applicantType}</td>
                  <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleApproval(application.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejection(application.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                    >
                      Reject
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

export default ApplicationManagement;
