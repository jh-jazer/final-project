import React, { useState, useEffect } from 'react';

const StudentInformations = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTable, setActiveTable] = useState('Active');
  const [activeTab, setActiveTab] = useState('General');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null); // State for personal info
  const [familyInfo, setFamilyInfo] = useState(null); // State for family info
  const [educationalInfo, setEducationalInfo] = useState(null); // State for family info



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
      // Fetch both Personal Info and Family Info when a student is selected
      fetchPersonalInfo(student.enrollment_id);
      fetchFamilyInfo(student.enrollment_id);
      fetchEducationalInfo(student.enrollment_id);

    }
  };
  
  const fetchPersonalInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getPersonalInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch personal data");
      }
  
      const data = await response.json();
  
      // Format date fields if present
      const formattedData = {
        ...data,
        dob: data.dob ? formatDateForInput(data.dob) : "",
      };
  
      setPersonalInfo(formattedData);
    } catch (error) {
      console.error("Error fetching personal data:", error);
      setPersonalInfo(null); // Clear previous data on error
    }
  };
  
  const fetchFamilyInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getFamilyInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch family information');
      }
  
      const data = await response.json();
  
      setFamilyInfo(data); // Store the fetched family information
    } catch (error) {
      console.error("Error fetching family info:", error);
      setFamilyInfo(null); // Clear previous data on error
    }
  };

  const fetchEducationalInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getEducationInfo?enrollment_id=${enrollment_id}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch family information');
      }
  
      const data = await response.json();
  
      setEducationalInfo(data); // Store the fetched family information
    } catch (error) {
      console.error("Error fetching family info:", error);
      setEducationalInfo(null); // Clear previous data on error
    }
  };
  


  
  // Define a mapping for semesters and their labels
const semesterMapping = {
  1: 'First Year, First Semester',
  2: 'First Year, Second Semester',
  3: 'Second Year, First Semester',
  4: 'Second Year, Second Semester',
  5: 'Third Year, First Semester',
  6: 'Third Year, Second Semester',
  7: 'Third Year, Mid Year',
  8: 'Fourth Year, First Semester',
  9: 'Fourth Year, Second Semester',
  10: 'First Year, First Semester',
  11: 'First Year, Second Semester',
  12: 'Second Year, First Semester',
  13: 'Second Year, Second Semester',
  14: 'Second Year, Mid Year',
  15: 'Third Year, First Semester',
  16: 'Third Year, Second Semester',
  17: 'Fourth Year, First Semester',
  18: 'Fourth Year, Second Semester',
};

// Rewrite getSemesterLabel to use the semesterMapping
const getSemesterLabel = (semesterValue) => {
  return semesterMapping[semesterValue] || 'Unknown Semester';
};

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  };

  // Filter the students based on the search term (by full_name or student_id)
  const filteredStudents = students.filter(
    (student) =>
      (student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toString().includes(searchTerm)) &&
      student.status === activeTable
  );

  

  return (
    <div className="p-6 bg-gradient-to-r from-green-800 to-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Informations</h2>
        {statusMessage && <div className="mb-4 text-center text-red-600">{statusMessage}</div>}

        {/* Search Bar */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search by Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">
          <button
            className={`px-4 py-2 ${activeTable === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-md`}
            onClick={() => setActiveTable('Active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 ${activeTable === 'Inactive' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-md`}
            onClick={() => setActiveTable('Inactive')}
          >
            Inactive
          </button>
        </div>

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

        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-[90%] rounded-lg shadow-lg relative overflow-hidden"
              style={{ marginLeft: '250px' }}> {/* Adjust this value based on the sidebar's width */}
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
                {['General', 'Personal', 'Family', 'Educational', 'Documents'].map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-t-md ${activeTab === tab ? 'bg-white border-t-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 overflow-y-auto h-[calc(100%-150px)]">
                {activeTab === 'General' && (
                  <>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">General Information</h3>
                  <div className="grid grid-cols-1 text-center gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="mb-2 text-gray-700"><strong>Student ID:</strong> {selectedStudent.student_id}</p>
                      <p className="mb-2 text-gray-700"><strong>Full Name:</strong> {selectedStudent.full_name}</p>
                      <p className="mb-2 text-gray-700"><strong>Email:</strong> {selectedStudent.email}</p>
                      <p className="mb-2 text-gray-700"><strong>Student Type:</strong> {selectedStudent.student_type}</p>
                      <p className="mb-2 text-gray-700">
                        <strong>Program:</strong> {selectedStudent.program_id === 1 ? "BSCS" : "BSIT"}
                      </p>
                      <p className="mb-2 text-gray-700"><strong>Semester:</strong> {getSemesterLabel(selectedStudent.semester)}</p>
                      <p className="mb-2 text-gray-700"><strong>Section:</strong> {selectedStudent.class_section}</p>
                      <p className="mb-2 text-gray-700"><strong>Status:</strong> {selectedStudent.status}</p>
                    </div>
                  </div>
                </>
                
                )}

                {activeTab === 'Personal' && personalInfo ? (
                 <>
                 <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Personal Information</h3>
                 <div className="grid grid-cols-1 text-center  gap-6">
                   <div className="bg-white p-4 rounded-lg shadow-md">
                     <p className="mb-2 text-gray-700"><strong>Enrollment ID:</strong> {personalInfo.enrollment_id}</p>
                     <p className="mb-2 text-gray-700"><strong>LRN:</strong> {personalInfo.lrn}</p>
                     <p className="mb-2 text-gray-700"><strong>Sex</strong> {personalInfo.sex}</p>
                     <p className="mb-2 text-gray-700"><strong>Birthday:</strong> {personalInfo.dob}</p>
                     <p className="mb-2 text-gray-700"><strong>Civil Status:</strong> {personalInfo.civilStatus}</p>
                     <p className="mb-2 text-gray-700"><strong>Religion:</strong> {personalInfo.religion}</p>
                     <p className="mb-2 text-gray-700"><strong>Contact Number:</strong> {personalInfo.contactNumber}</p>
                     <p className="mb-2 text-gray-700">
                       <strong>Address:</strong> {personalInfo.houseNumber} {personalInfo.streetAddress},
                       {personalInfo.municipality}, {personalInfo.province}, {personalInfo.zipCode},
                       {personalInfo.country}
                     </p>
                   </div>
                 </div>
               </>
               
                ) : (
                  activeTab === 'Personal' && <p className="text-gray-500">Loading personal information...</p>
                )}

                    {activeTab === 'Family' && familyInfo ? (
                      <>
                        <h3 className="text-xl font-semibold text-center mb-4">Family Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Father Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Father's Name:</strong> {familyInfo.fatherName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Father's Occupation:</strong> {familyInfo.fatherOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Father's Contact:</strong> {familyInfo.fatherContact || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Is Father Not Applicable:</strong> {familyInfo.isFatherNotApplicable ? "Yes" : "No"}</p>
                          </div>

                          {/* Mother Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Mother's Name:</strong> {familyInfo.motherName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Mother's Occupation:</strong> {familyInfo.motherOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Mother's Contact:</strong> {familyInfo.motherContact || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Is Mother Not Applicable:</strong> {familyInfo.isMotherNotApplicable ? "Yes" : "No"}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          {/* Guardian Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Guardian's Name:</strong> {familyInfo.guardianName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Guardian's Occupation:</strong> {familyInfo.guardianOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Guardian's Contact:</strong> {familyInfo.guardianContact || "Not provided"}</p>
                          </div>

                          {/* Siblings Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Number of Siblings:</strong> {familyInfo.numOfSiblings || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Family's Annual Income:</strong> {familyInfo.familyIncome || "Not provided"}</p>
                          </div>
                        </div>

                      </>
                    ) : (
                      activeTab === 'Family' && <p className="text-gray-500">Loading family information...</p>
                    )}


                  {activeTab === 'Educational' && educationalInfo ? (
                    <>
                      <h3 className="text-xl font-semibold mb-4">Educational Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Elementary School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>Elementary School Name:</strong> {educationalInfo.elementarySchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Elementary School Address:</strong> {educationalInfo.elementarySchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Elementary School Year Graduated:</strong> {educationalInfo.elementarySchoolYearGraduated || "Not provided"}</p>
                        </div>

                        {/* High School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>High School Name:</strong> {educationalInfo.highSchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>High School Address:</strong> {educationalInfo.highSchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>High School Year Graduated:</strong> {educationalInfo.highSchoolYearGraduated || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Senior High School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>Senior High School Name:</strong> {educationalInfo.seniorHighSchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Senior High School Address:</strong> {educationalInfo.seniorHighSchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Senior High School Year Graduated:</strong> {educationalInfo.seniorHighSchoolYearGraduated || "Not provided"}</p>
                        </div>

                        {/* College Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>College Name:</strong> {educationalInfo.collegeName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>College Address:</strong> {educationalInfo.collegeAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>College Year Graduated:</strong> {educationalInfo.collegeYearGraduated || "Not provided"}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    activeTab === 'Educational' && <p className="text-gray-500">Loading educational information...</p>
                  )}



                {activeTab === 'Documents' && (
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
