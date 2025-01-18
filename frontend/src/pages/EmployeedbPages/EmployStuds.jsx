import React, { useState, useEffect } from 'react';

const StudentInformations = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Active');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null); // State for personal info

  const semesterMapping = { /* ... Your semester mapping ... */ };

  const getSemesterLabel = (semesterValue) => {
    return semesterMapping[semesterValue] || 'Unknown Semester';
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://cvsu-backend-system.vercel.app/api/students');
        const result = await response.json();
        setStudents(result);
      } catch (error) {
        setStatusMessage('Failed to fetch student data.');
      }
    };
    fetchStudents();
  }, []);

  
  const handleRowClick = (student) => {
    setSelectedStudent(student);
    if (student.enrollment_id) {
      fetchFormData(student.enrollment_id);
    }
  };
  
  const fetchFormData = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getPersonalInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
  
      // Format date fields if present
      const formattedData = {
        ...data,
        dob: data.dob ? formatDateForInput(data.dob) : "",
      };
  
      setPersonalInfo(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setPersonalInfo(null); // Clear previous data on error
    }
  };
  
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  };

  const filteredStudents = students.filter(
    (student) =>
      (student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toString().includes(searchTerm)) &&
      student.status === activeTab
  );

  return (
    <div className="p-6 bg-gradient-to-r from-green-800 to-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Informations</h2>
        {statusMessage && <div className="mb-4 text-center text-red-600">{statusMessage}</div>}

        {/* Search and Tab Filters */}
        {/* ... Your existing code for search and tabs ... */}

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Student Type</th>
                <th className="px-4 py-2 text-left">Program</th>
                <th className="px-4 py-2 text-left">Semester</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.student_id}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(student)}
                  >
                    <td className="px-4 py-2">{student.student_id}</td>
                    <td className="px-4 py-2">{student.full_name}</td>
                    <td className="px-4 py-2">{student.student_type}</td>
                    <td className="px-4 py-2">
                      {student.program_id === 1 ? 'BSCS' : student.program_id === 2 ? 'BSIT' : 'Unknown Program'}
                    </td>
                    <td className="px-4 py-2">{getSemesterLabel(student.semester)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-[90%] rounded-lg shadow-lg relative overflow-hidden"
    style={{
      marginLeft: '250px', // Adjust this value based on the sidebar's width
    }}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        onClick={() => {
          setSelectedStudent(null);
          setPersonalInfo(null);
        }}
      >
        ✕
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white">
        <h2 className="text-2xl font-semibold">Student Details</h2>
        <p className="text-sm opacity-90">Manage and review information for {selectedStudent.full_name}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-between bg-gray-100 px-6 py-3 border-b">
        {['General Info', 'Personal Info', 'Additional Info'].map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-t-md ${
              activeTab === tab ? 'bg-white border-t-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 overflow-y-auto h-[calc(100%-150px)]">
        {activeTab === 'General Info' && (
          <>
            <h3 className="text-xl font-semibold mb-4">General Information</h3>
            <p className="mb-2"><strong>ID:</strong> {selectedStudent.student_id}</p>
            <p className="mb-2"><strong>Full Name:</strong> {selectedStudent.full_name}</p>
            <p className="mb-2"><strong>Student Type:</strong> {selectedStudent.student_type}</p>
            <p className="mb-2">
              <strong>Program:</strong> {selectedStudent.program_id === 1 ? "BSCS" : "BSIT"}
            </p>
            <p className="mb-2"><strong>Semester:</strong> {getSemesterLabel(selectedStudent.semester)}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedStudent.status}</p>
          </>
        )}

        {activeTab === 'Personal Info' && personalInfo ? (
          <>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <p><strong>Enrollment ID:</strong> {personalInfo.enrollment_id}</p>
            <p><strong>Given Name:</strong> {personalInfo.givenName}</p>
            <p><strong>Family Name:</strong> {personalInfo.familyName}</p>
            <p><strong>Middle Name:</strong> {personalInfo.middleName}</p>
            <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
            <p><strong>Contact Number:</strong> {personalInfo.contactNumber}</p>
            <p>
              <strong>Address:</strong> {personalInfo.houseNumber} {personalInfo.streetAddress}, 
              {personalInfo.municipality}, {personalInfo.province}, {personalInfo.zipCode}, 
              {personalInfo.country}
            </p>
          </>
        ) : (
          activeTab === 'Personal Info' && <p className="text-gray-500">Loading personal information...</p>
        )}

        {activeTab === 'Additional Info' && (
          <>
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            <p className="mb-2 text-gray-500 italic">This section can contain custom data about the student, such as academic achievements, extracurricular activities, or disciplinary actions.</p>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 border-t flex justify-end">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            setSelectedStudent(null);
            setPersonalInfo(null);
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default StudentInformations;
