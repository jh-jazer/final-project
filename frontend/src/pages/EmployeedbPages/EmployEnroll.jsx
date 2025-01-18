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
      const response = await fetch(`http://localhost:5005/api/fetchstudents?studentId=${studentId}`);
      
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
      const response = await fetch('http://localhost:5005/api/manage-enrollees');
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
        `http://localhost:5005/api/student_progress/${editingId}`,
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
      const url = `http://localhost:5005/api/students/${formData.student_id}`;
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
      const statusResponse = await fetch('http://localhost:5005/api/update-student-status', {
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
    <div className="p-6 bg-green-500 min-h-screen">
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
                <tr key={enrollees.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{enrollees.student_id}</td>
                  {['checklist_verification', 'society_payment', 'advising_requirement'].map(
                    (field) => (
                      <td key={field} className="px-4 py-2 border border-gray-300">
                        {editingId === enrollees.id ? (
                          <select
                            value={editedFields[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
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
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(enrollees)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                     <button
                      onClick={() => openModal(enrollees.student_id)}
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
    </div>
  );
};

export default ManageEnrollments;
