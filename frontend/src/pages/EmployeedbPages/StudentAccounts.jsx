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
  const [formData, setFormData] = useState({
    student_id: '',
    full_name: '',
    student_type: '',
    program: '',
    email: '',
    phone_number: '',
    dob: '',
    emergency_contact: '',
    status: '',
    password: '',
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
      // When editing an student, format the date and reset password to an empty string
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
        program: '',
        email: '',
        phone_number: '',
        dob: '',
        emergency_contact: '',
        status: '',
        password: '',
      });
      setIsEditing(false); // Set the state to adding
    }
    setModalOpen(true); // Open the modal
  };
  
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
      ? `https://cvsu-backend-system.vercel.app/api/students/${formData.student_id}` // Use student ID for update
      : 'https://cvsu-backend-system.vercel.app/api/students'; // Use POST for new students
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
  

  // Toggle student status (Active/Inactive)
  const toggleStatus = async (student) => {
    const updatedStatus = student.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await apiRequest(
        `https://cvsu-backend-system.vercel.app/api/students${student.student_id}`,
        'PUT',
        { ...student, status: updatedStatus }
      );
      setStatusMessage('student status updated');
      fetchStudents();
    } catch (error) {
      setStatusMessage('Error updating status');
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

        <div className="mb-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => openModal()}
          >
            Add New student
          </button>
          <input
            type="text"
            placeholder="Search by name or ID"
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

        <table className="min-w-full bg-white border-collapse shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Student Type</th>
              <th className="px-4 py-2 text-left">Program</th>
              <th className="px-4 py-2 text-left">Phone</th>
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
                  <td className="px-4 py-2">{student.program}</td>
                  <td className="px-4 py-2">{student.phone_number}</td>
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

        {/* Modal for adding/editing an student */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-xl mb-4">{isEditing ? 'Edit student' : 'Add New student'}</h3>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="student ID"
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
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  required
                >
                  <option value="">Select Student Program </option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                
                </select>
                <input
                  type="email"
                  placeholder="email"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  required
                />
                
                <input
                  type="date"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Emergency Contact"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.emergency_contact}
                  onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                  required
                />
                <select
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'} // Toggle between text and password input
          placeholder="Password"
          className="w-full px-4 py-2 mb-2 border"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!isEditing} // Password required only for new students
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide icon */}
        </button>
      </div>
                <div className="flex justify-between mt-4">
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
