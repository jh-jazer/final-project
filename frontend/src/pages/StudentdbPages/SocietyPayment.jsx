import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SocietyPayments = () => {
  const location = useLocation();
  const { user } = location.state || {};  // Safely access user data

  // Add the course prefix (CS or IT) based on the user.course
  const coursePrefix = user?.course === 'BSCS' ? '(CS)' :
                       user?.course === 'BSIT' ? '(IT)' : '';

  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      enrolleeID: '202212345',
      enrolleeName: 'John Doe',
      course: 'Computer Science',
      year: '2nd Year',
      societyFeeStatus: 'Paid',
      requirementsComplete: 'Yes',
      enrolleeType: 'Regular',
    },
    {
      id: 2,
      enrolleeID: '202212346',
      enrolleeName: 'Jane Smith',
      course: 'Information Technology',
      year: '3rd Year',
      societyFeeStatus: 'Paid',
      requirementsComplete: 'No',
      enrolleeType: 'Irregular',
    },
    {
      id: 3,
      enrolleeID: '202212347',
      enrolleeName: 'Mark Lee',
      course: 'Computer Science',
      year: '1st Year',
      checklistValid: 'Yes',
      societyFeeStatus: 'Paid',
      requirementsComplete: 'Yes',
      enrolleeType: 'Regular',
    },
    {
      id: 4,
      enrolleeID: '202212348',
      enrolleeName: 'Alice Johnson',
      course: 'Information Technology',
      year: '2nd Year',
      societyFeeStatus: 'Paid',
      requirementsComplete: 'No',
      enrolleeType: 'Irregular',
    },
    {
        id: 5,
        enrolleeID: '202212358',
        enrolleeName: 'Anne Johnson',
        course: 'Computer Science',
        year: '2nd Year',
        societyFeeStatus: 'Paid',
        requirementsComplete: 'No',
        enrolleeType: 'Irregular',
      },
  ]);

  const [newStudents, setNewStudents] = useState([
    {
      id: 1,
      applicantID: 'A123',
      applicantName: 'Tom Brown',
      applicantType: 'Transferee',
      preferredPrograms: 'Information Technology',
      societyFeeStatus: 'Paid',
     
    },
    {
      id: 2,
      applicantID: 'A124',
      applicantName: 'Emma White',
      applicantType: 'Transferee',
      preferredPrograms: 'Computer Science',
      societyFeeStatus: 'Paid',
      
    },
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [studentType, setStudentType] = useState('Regular'); // State to toggle between tables

  // Filter enrollments based on course and search input
  const filteredEnrollments = enrollments
    .filter((enrollee) => 
      (user?.course === 'BSCS' && enrollee.course === 'Computer Science') ||
      (user?.course === 'BSIT' && enrollee.course === 'Information Technology')
    )
    .filter((enrollee) =>
      enrollee.enrolleeName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.enrolleeName.localeCompare(b.enrolleeName);
      } else if (sortBy === 'society fee') {
        return a.societyFeeStatus === 'Paid' ? -1 : 1;
      }
      return 0;
    });

  // Filter new students based on course and search input
  const filteredNewStudents = newStudents
    .filter((applicant) =>
      (user?.course === 'BSCS' && applicant.preferredPrograms === 'Computer Science') ||
      (user?.course === 'BSIT' && applicant.preferredPrograms === 'Information Technology')
    )
    .filter((applicant) =>
      applicant.applicantName.toLowerCase().includes(search.toLowerCase())
    );

  // Function to update payment status for an enrollee or applicant
  const updatePaymentStatus = (id, status, type) => {
    const setTargetList = type === 'enrollee' ? setEnrollments : setNewStudents;
    const targetList = type === 'enrollee' ? enrollments : newStudents;

    setTargetList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, societyFeeStatus: status } : item
      )
    );
  };

  // Handle approval and rejection for payment status
  const handleApproval = (id) => {
    updatePaymentStatus(id, 'Paid', user?.course === 'BSCS' || user?.course === 'BSIT' ? 'enrollee' : 'new');
  };

  const handleRejection = (id) => {
    updatePaymentStatus(id, 'Not Paid', user?.course === 'BSCS' || user?.course === 'BSIT' ? 'enrollee' : 'new');
  };

// Handle approval for new applicant payment status
const handleApplicantApproval = (id) => {
    // For new applicants, set societyFeePaid to 'Yes'
    updatePaymentStatus(id, 'Paid', 'new');
  };
  
  // Handle rejection for new applicant payment status
  const handleApplicantRejection = (id) => {
    // For new applicants, set societyFeePaid to 'No'
    updatePaymentStatus(id, 'Not Paid', 'new');
  };
  

  // Handle student type selection
  const handleRadioChange = (type) => {
    setStudentType(type); // Toggle between 'Regular', 'Irregular', and 'New' student types
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {coursePrefix} Society Payment Records
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
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
            <option value="name">Sort by Name</option>
            <option value="society fee">Sort by Payment Status</option>
          </select>
        </div>

        {/* Radio Buttons to Toggle Between Regular, Irregular, and New Students */}
        <div className="mb-4 flex space-x-4 overflow-x-auto">
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
          <label className="flex items-center">
            <input
              type="radio"
              name="studentType"
              value="New"
              checked={studentType === 'New'}
              onChange={() => handleRadioChange('New')}
              className="mr-2"
            />
            New Students
          </label>
        </div>

        {/* Table for Regular and Irregular Students */}
        {studentType !== 'New' && (
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">Enrollee ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Enrollee Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Society Fee Status</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
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
                      <td className="px-4 py-2 border border-gray-300">{enrollee.societyFeeStatus}</td>
                      <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                        <button
                          onClick={() => handleApproval(enrollee.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Paid
                        </button>
                        <button
                          onClick={() => handleRejection(enrollee.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Unpaid
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table for New Students */}
        {studentType === 'New' && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Preferred Programs</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Society Fee Status</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNewStudents.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantID}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantName}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantType}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.preferredPrograms}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.societyFeeStatus}</td>
                    <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                      <button
                        onClick={() => handleApplicantApproval(applicant.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Paid
                      </button>
                      <button
                        onClick={() => handleApplicantRejection(applicant.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Unpaid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocietyPayments;
