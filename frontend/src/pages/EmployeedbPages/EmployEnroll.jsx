import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const apiRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    return response.json();
  } catch (error) {
    console.error('Error with API request:', error);
    throw new Error('API request failed');
  }
};

const ManageEnrollments = () => {
  const [enrollees, setEnrollees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const enrolleesPerPage = 25;
  const [showPassword, setShowPassword] = useState(false);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('General');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null); // State for personal info
  const [familyInfo, setFamilyInfo] = useState(null); // State for family info
  const [educationalInfo, setEducationalInfo] = useState(null); // State for family info
  
  const [formData, setFormData] = useState({
    student_id: 0, // Initial fallback value
    full_name: '',
    student_type: '',
    program_id: '',
    email: '',
    semester: '',
    dob: '',
    class_section: '',
    status: '',
    password: '',
    enrollment_id: '',
  });
  
  
  const handleRowClick = async (enrollees) => {
    setSelectedStudent(enrollees);
  
    if (enrollees.student_id) {
      try {
        // Fetch the enrollment_id using the student_id
        const response = await fetch(`https://cvsu-backend-system.vercel.app/api/fetchstudents?studentId=${enrollees.student_id}`);
        const data = await response.json();
  
        if (response.ok && data.enrollment_id) {
          const enrollment_id = data.enrollment_id;
          setStudents(data);

          // Use the fetched enrollment_id to perform other fetches
          fetchPersonalInfo(enrollment_id);
          fetchFamilyInfo(enrollment_id);
          fetchEducationalInfo(enrollment_id);
        } else {
          console.error('Failed to fetch enrollment_id:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching enrollment_id:', error);
      }
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
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(''); // Clears the status message after 5 seconds
      }, 5000);
    
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const closeModal = () => {
    setModalOpen(false);
    setLoading(false);
  };

  const openModal = async (studentId) => {
    if (!studentId) {
      console.error('Student ID is required');
      setStatusMessage('Student ID is missing');
      return;
    }
  
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/fetchstudents?studentId=${studentId}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch student information: ${response.statusText}`);
      }
  
      // Parse the response as JSON
      const student = await response.json();
  
      // Check if the response contains valid student data
      if (!student || Object.keys(student).length === 0) {
        setStatusMessage('Student not found');
        return;
      }
  
      // Format the date of birth (if available)
      const formattedDob = student.dob ? new Date(student.dob).toISOString().slice(0, 10) : '';
  
      // Set the form data, resetting the password field
      setFormData({
        ...student,
        dob: formattedDob,
        password: '', // Reset password when editing
      });
  
      // Open the modal
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching student information:', error);
      setStatusMessage('Failed to fetch student details');
    }
  };
  
    
    

  useEffect(() => {
    fetchEnrollees();
  }, []);

  const fetchEnrollees = async () => {
    try {
      const response = await fetch('https://cvsu-backend-system.vercel.app/api/manage-enrollees');
      if (!response.ok) {
        throw new Error('Failed to fetch enrollees');
      }
      const data = await response.json();
      setEnrollees(data);
    } catch (error) {
      console.error('Error fetching Enrollees:', error);
    }
  };

  const handleEdit = (enrollees) => {
    setEditingId(enrollees.id);
    setEditedFields({ ...enrollees });
  };

  const handleFieldChange = (field, value) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (formData.program_id === 1) {
      setSemesterOptions([
        { value: 1, label: 'First Year, First Semester' },
        { value: 2, label: 'First Year, Second Semester' },
        { value: 3, label: 'Second Year, First Semester' },
        { value: 4, label: 'Second Year, Second Semester' },
        { value: 5, label: 'Third Year, First Semester' },
        { value: 6, label: 'Third Year, Second Semester' },
        { value: 7, label: 'Third Year, Mid Year' },
        { value: 8, label: 'Fourth Year, First Semester' },
        { value: 9, label: 'Fourth Year, Second Semester' },
      ]);
    } else if (formData.program_id === 2) {
      setSemesterOptions([
        { value: 10, label: 'First Year, First Semester' },
        { value: 11, label: 'First Year, Second Semester' },
        { value: 12, label: 'Second Year, First Semester' },
        { value: 13, label: 'Second Year, Second Semester' },
        { value: 14, label: 'Second Year, Mid Year' },
        { value: 15, label: 'Third Year, First Semester' },
        { value: 16, label: 'Third Year, Second Semester' },
        { value: 17, label: 'Fourth Year, First Semester' },
        { value: 18, label: 'Fourth Year, Second Semester' },
      ]);
    } else {
      setSemesterOptions([]);
    }
  }, [formData.program_id]);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/student_progress/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedFields),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update enrollees');
      }

      const result = await response.json();
      console.log(result.message);

      setEnrollees((prevEnrollees) =>
        prevEnrollees.map((enrollees) =>
          enrollees.id === editingId ? { ...enrollees, ...editedFields } : enrollees
        )
      );

      setEditingId(null);
      setEditedFields({});
    } catch (error) {
      console.error('Error updating enrollees:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Prepare data with student_id only (both semester and status will be handled by backend)
      const studentData = {
        student_id: parseInt(formData.student_id, 10), // Ensures student_id is a number
      };
  
      // Hash the password if provided
      const hashedPassword = formData.password
        ? await bcrypt.hash(formData.password, 10)
        : null;
  
      // Prepare the payload with form data
      const payload = { ...formData };
      if (hashedPassword) {
        payload.password = hashedPassword; // Include hashed password
      } else {
        delete payload.password; // Remove password field if it's empty
      }
  
      // Ensure the date of birth is properly formatted
      if (formData.dob) {
        payload.dob = new Date(formData.dob).toISOString().slice(0, 10);
      }
  
      // Set the API URL and method for editing the student
      const url = `https://cvsu-backend-system.vercel.app/api/students/${formData.student_id}`;
      const method = 'PUT';
  
      // Send the API request to update the student
      await apiRequest(url, method, payload);
  
      // Update the status message and close the modal
      setStatusMessage('Student updated successfully');
      setModalOpen(false);
  
      // Update the students state locally
      setEnrollees((prevStudents) =>
        prevStudents.map((student) =>
          student.student_id === formData.student_id ? { ...student, ...payload } : student
        )
      );
  
      // Now, update the student status after successful update
      const statusResponse = await fetch('https://cvsu-backend-system.vercel.app/api/update-student-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData), // Sending only student_id
      });
  
      if (!statusResponse.ok) {
        const errorData = await statusResponse.json();
        console.error('Status Update Error:', errorData);
        throw new Error(errorData.message || 'Failed to update student status');
      }
  
      console.log('Student status updated successfully');
    } catch (error) {
      // Handle API errors
      setStatusMessage('Error updating data');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const paginateEnrollees = (enrollees) => {
    const startIndex = (currentPage - 1) * enrolleesPerPage;
    const endIndex = startIndex + enrolleesPerPage;
    return enrollees.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(enrollees.length / enrolleesPerPage);

  const filteredEnrollees = enrollees.filter((enrollees) =>
    enrollees.status !== "enrolled" &&
    enrollees.student_id &&
    String(enrollees.student_id).includes(searchTerm)
  );
  

  return (
    <div className="p-6 bg-gradient-to-r from-green-800 to-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Enrollments</h2>

        <div className="mb-6">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Search by Enrollment ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Student ID</th>
                <th className="px-4 py-2 text-left border border-gray-300">Checklist Verification</th>
                <th className="px-4 py-2 text-left border border-gray-300">Society Payment</th>
                <th className="px-4 py-2 text-left border border-gray-300">Advising Requirement</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginateEnrollees(filteredEnrollees).map((enrollees) => (
                <tr key={enrollees.id} 
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(enrollees)}
                >
                  <td className="px-4 py-2 border border-gray-300">{enrollees.student_id}</td>
                  {['checklist_verification', 'society_payment', 'advising_requirement'].map(
                    (field) => (
                      <td key={field} className="px-4 py-2 border border-gray-300">
                        {editingId === enrollees.id ? (
                          <select
                            value={editedFields[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                            className="p-2 border border-gray-300 rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                          </select>
                        ) : (
                          enrollees[field]
                        )}
                      </td>
                    )
                  )}
                  <td className="px-4 py-2 border border-gray-300">
                    {editingId === enrollees.id ? (
                      <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row's onClick
                        handleSave();
                      }}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                        
                      >
                        Save
                      </button>
                    ) : (
                      <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row's onClick
                        handleEdit(enrollees);
                      }}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                     <button
                       onClick={(e) => {
                        e.stopPropagation(); // Prevent the row's onClick
                        openModal(enrollees.student_id);
                      }}
                      disabled={
                        enrollees.checklist_verification !== 'approved' ||
                        enrollees.society_payment !== 'approved' ||
                        enrollees.advising_requirement !== 'approved'
                      }
                      className={`ml-2 px-4 py-1 rounded-md ${
                        enrollees.checklist_verification === 'approved' &&
                        enrollees.society_payment === 'approved' &&
                        enrollees.advising_requirement === 'approved'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      Enroll
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

           {/* Modal for adding/editing a student */}
                {modalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl  ml-[250px] w-full">
                      <h3 className="text-xl mb-4">Enroll Applicant</h3>
                      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                        <input
                            type="text"
                            placeholder="Enrollment ID"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.enrollment_id}
                            onChange={(e) => setFormData({ ...formData, enrollment_id: e.target.value })}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Student ID"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.student_id}
                            onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            required
                          />
                          <select
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.student_type}
                            onChange={(e) => setFormData({ ...formData, student_type: e.target.value })}
                            required
                          >
                            <option value="">Select Student Type</option>
                            <option value="Regular">Regular</option>
                            <option value="Irregular">Irregular</option>
                          </select>
                          <select
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.program_id}
                            onChange={(e) => setFormData({ ...formData, program_id: parseInt(e.target.value, 10) })}
                            required
                          >
                            <option value="">Select Student Program</option>
                            <option value="1">BSCS</option>
                            <option value="2">BSIT</option>
                          </select>
                          <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <select
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value, 10) })}
                            required
                          >
                            <option value="">Select Semester</option>
                            {semesterOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <input
                            type="date"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Class Section"
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.class_section}
                            onChange={(e) => setFormData({ ...formData, class_section: e.target.value })}
                            required
                          />
                          <select
                            className="w-full px-4 py-2 mb-2 border"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            required
                          >
                            <option value="">Select Account Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Password"
                              className="w-full px-4 py-2 mb-2 border"
                              value={formData.password}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                              
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              className="absolute right-3 top-3 text-gray-500"
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4 col-span-2">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 text-black rounded-md"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className={`px-4 py-2 rounded-md ${
                              loading ? "bg-blue-400" : "bg-blue-500"
                            } text-white flex items-center justify-center`}
                            disabled={loading}
                          >
                            {loading ? (
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                              </svg>
                            ) : (
                              "Enroll Applicant"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
        

      
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

        <div className={`mt-4 text-center ${statusMessage ? 'text-green-600' : ''}`}>
          {statusMessage}
        </div>
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
                {['General', 'Personal', 'Family', 'Educational'].map((tab, index) => (
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
                {activeTab === 'General' && students ? (
                  <>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">General Information</h3>
                  <div className="grid grid-cols-1 text-center gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="mb-2 text-gray-700"><strong>Student ID:</strong> {students.student_id}</p>
                      <p className="mb-2 text-gray-700"><strong>Full Name:</strong> {students.full_name}</p>
                      <p className="mb-2 text-gray-700"><strong>Email:</strong> {students.email}</p>
                      <p className="mb-2 text-gray-700"><strong>Student Type:</strong> {students.student_type}</p>
                      <p className="mb-2 text-gray-700">
                        <strong>Program:</strong> {students.program_id === 1 ? "BSCS" : "BSIT"}
                      </p>
                      <p className="mb-2 text-gray-700"><strong>Semester:</strong> {getSemesterLabel(students.semester)}</p>
                      <p className="mb-2 text-gray-700"><strong>Section:</strong> {students.class_section}</p>
                      <p className="mb-2 text-gray-700"><strong>Status:</strong> {students.status}</p>
                    </div>
                  </div>
                </>
               ) : (
                activeTab === 'General' && <p className="text-gray-500">Loading personal information...</p>
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
  );
};

export default ManageEnrollments;
