import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { FaEdit, FaTrashAlt, FaEye, FaEyeSlash } from 'react-icons/fa';


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

const StudentAccountManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Active');
  const [statusMessage, setStatusMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    full_name: '',
    student_type: '',
    program_id: '', // Change to program_id
    email: '',
    semester: '',
    dob: '',
    class_section: '',
    status: '',
    password: '',
    enrollment_id: '', // Added enrollment_id field
  });
  
  const [isEditing, setIsEditing] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage(''); // Clears the status message after 5 seconds
      }, 5000);

      // Cleanup the timeout if the component unmounts or the message changes
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const getSemesterLabel = (semesterValue) => {
    // Use semesterOptions to find the label for the semester value
    const semesterOption = semesterOptions.find(option => option.value === semesterValue);
    return semesterOption ? semesterOption.label : 'Unknown Semester';
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await apiRequest('https://cvsu-backend-system.vercel.app/api/students', 'GET');
        setStudents(result);
      } catch (error) {
        setStatusMessage('Failed to fetch student data.');
      }
    };
    fetchStudents();
  }, []);

  const openModal = (student = null) => {
    if (student) {
      // When editing a student, format the date and reset password to an empty string
      const formattedDob = new Date(student.dob).toISOString().slice(0, 10);
      setFormData({
        ...student,
        dob: formattedDob,
        password: '', // Reset password when editing
      });
      setIsEditing(true); // Set the state to editing
    } else {
      // Initialize form for adding a new student
      setFormData({
        student_id: '',
        full_name: '',
        student_type: '',
        program_id: '', // Set program_id to an empty string
        email: '',
        semester: '',
        dob: '',
        class_section: '',
        status: '',
        password: '',
        enrollment_id: '', // Added enrollment_id field
      });
      setIsEditing(false); // Set the state to adding
    }
    setModalOpen(true); // Open the modal
  };

  useEffect(() => {
    // Conditionally set semester options based on the selected program_id
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
      setSemesterOptions([]); // Clear options if no program_id is selected
    }
  }, [formData.program_id]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // If a password is provided, hash it; if not, skip hashing
    const hashedPassword = formData.password
      ? await bcrypt.hash(formData.password, 10)
      : null;
  
    // Create the payload with form data
    const payload = { ...formData };
    if (hashedPassword) {
      payload.password = hashedPassword; // Include hashed password
    } else {
      delete payload.password; // Remove password field if it's empty
    }
  
    // Ensure the date of birth is properly formatted
    const formattedDob = new Date(formData.dob).toISOString().slice(0, 10);
    payload.dob = formattedDob;
  
    const url = isEditing
      ? `http://localhost:5005/api/students/${formData.student_id}` // Use student ID for update
      : 'http://localhost:5005/api/students'; // Use POST for new students
    const method = isEditing ? 'PUT' : 'POST'; // Use PUT for updates, POST for new student
  
    try {
      await apiRequest(url, method, payload);
      setStatusMessage(isEditing ? 'student updated successfully' : 'student added successfully');
      setModalOpen(false); // Close the modal after successful action
  
      // Update the students state locally
      setStudents((prevStudents) => {
        if (isEditing) {
          return prevStudents.map((student) =>
            student.student_id === formData.student_id ? payload : student
          );
        } else {
          return [...prevStudents, payload]; // Add new student to the list
        }
      });
    } catch (error) {
      setStatusMessage('Error saving data'); // Show error message if API request fails
    }
  };
  
  

  const handleDelete = async (student_id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await apiRequest(`https://cvsu-backend-system.vercel.app/api/students/${student_id}`, 'DELETE');
        setStatusMessage('student deleted successfully');
  
        // Update the students state locally
        setStudents((prevStudents) => prevStudents.filter((student) => student.student_id !== student_id));
      } catch (error) {
        setStatusMessage('Error deleting student');
      }
    }
  };
  

  // Filter students based on search and active status
  const filteredStudents = students.filter(
    (student) =>
      (student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toString().includes(searchTerm)) &&
      student.status === activeTab
  );

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Accounts</h2>
        {statusMessage && <div className="mb-4 text-center text-red-600">{statusMessage}</div>}

        <div className="mb-4 flex justify-between items-center overflow-x-auto">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => openModal()}
          >
            Add New Student
          </button>
          <input
            type="text"
            placeholder="Search by Name or ID"
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-4 flex">
          <button
            className={`px-4 py-2 ${activeTab === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-md`}
            onClick={() => setActiveTab('Active')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'Inactive' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-md`}
            onClick={() => setActiveTab('Inactive')}
          >
            Inactive
          </button>
        </div>

        <div className='overflow-x-auto'>
        <table className="min-w-full bg-white border-collapse shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Student Type</th>
              <th className="px-4 py-2 text-left">Program</th>
              <th className="px-4 py-2 text-left">Semester</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
                  <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.student_id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{student.student_id}</td>
                <td className="px-4 py-2">{student.full_name}</td>
                <td className="px-4 py-2">{student.student_type}</td>
                <td className="px-4 py-2">
                  {student.program_id === 1 ? 'BSCS' : student.program_id === 2 ? 'BSIT' : 'Unknown Program'}
                </td>
                <td className="px-4 py-2">{getSemesterLabel(student.semester)}</td>
                <td className="px-4 py-2">{student.status}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                    onClick={() => openModal(student)}
                    title="Edit student"
                  >
                    <FaEdit className="text-white" />
                  </button>
                  <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(student.student_id)}
                    title="Delete student"
                  >
                    <FaTrashAlt className="text-white" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-2 text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>

        </table>
        </div>

        {/* Modal for adding/editing a student */}
{modalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
      <h3 className="text-xl mb-4">{isEditing ? 'Edit student' : 'Add New student'}</h3>
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
              required={!isEditing}
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditing ? 'Update student' : 'Add student'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default StudentAccountManagement;
