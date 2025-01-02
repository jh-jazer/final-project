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

const EmployeeAccountManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Active');
  const [statusMessage, setStatusMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    role: '',
    email: '',
    phone_number: '',
    address: '',
    dob: '',
    emergency_contact: '',
    status: '',
    password: '',
    confirmPassword: '', // Add confirmPassword here

  });
  const [isEditing, setIsEditing] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const closeModal = () => {
    setFormData({
      employee_id: '',
      full_name: '',
      role: '',
      email: '',
      phone_number: '',
      address: '',
      dob: '',
      emergency_contact: '',
      status: '',
      password: '',
      confirmPassword: '', // Reset the confirm password field
    });
    setModalOpen(false);
  };
  

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await apiRequest('https://cvsu-backend-system.vercel.app//api/employees', 'GET');
        setEmployees(result);
      } catch (error) {
        setStatusMessage('Failed to fetch employee data.');
      }
    };
    fetchEmployees();
  }, []);

  const openModal = (employee = null) => {
    if (employee) {
      // When editing an employee, format the date and reset password to an empty string
      const formattedDob = new Date(employee.dob).toISOString().slice(0, 10);
      setFormData({
        ...employee,
        dob: formattedDob,
        password: '', // Reset password when editing
      });
      setIsEditing(true); // Set the state to editing
    } else {
      // Initialize form for adding a new employee
      setFormData({
        employee_id: '',
        full_name: '',
        role: '',
        email: '',
        phone_number: '',
        address: '',
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
  
    // Check if the passwords match
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage('Passwords do not match');
      return;
    }
  
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
      ? `http://localhost:5005/api/employees/${formData.employee_id}` // Use employee ID for update
      : 'http://localhost:5005/api/employees'; // Use POST for new employees
    const method = isEditing ? 'PUT' : 'POST'; // Use PUT for updates, POST for new employee
  
    try {
      await apiRequest(url, method, payload);
      setStatusMessage(isEditing ? 'Employee updated successfully' : 'Employee added successfully');
      setModalOpen(false); // Close the modal after successful action
  
      // Update the employees state locally
      setEmployees((prevEmployees) => {
        if (isEditing) {
          return prevEmployees.map((employee) =>
            employee.employee_id === formData.employee_id ? payload : employee
          );
        } else {
          return [...prevEmployees, payload]; // Add new employee to the list
        }
      });
    } catch (error) {
      setStatusMessage('Error saving data'); // Show error message if API request fails
    }
  };
  

  const handleDelete = async (employee_id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await apiRequest(`http://localhost:5005/api/employees/${employee_id}`, 'DELETE');
        setStatusMessage('Employee deleted successfully');
  
        // Update the employees state locally
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.employee_id !== employee_id));
      } catch (error) {
        setStatusMessage('Error deleting employee');
      }
    }
  };
  

  // Toggle employee status (Active/Inactive)
  const toggleStatus = async (employee) => {
    const updatedStatus = employee.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await apiRequest(
        `http://localhost:5005/api/employees/${employee.employee_id}`,
        'PUT',
        { ...employee, status: updatedStatus }
      );
      setStatusMessage('Employee status updated');
      fetchEmployees();
    } catch (error) {
      setStatusMessage('Error updating status');
    }
  };

  // Filter employees based on search and active status
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee_id.toString().includes(searchTerm)) &&
      employee.status === activeTab
  );

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Employee Data</h2>
        {statusMessage && <div className="mb-4 text-center text-red-600">{statusMessage}</div>}

        <div className="mb-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => openModal()}
          >
            Add New Employee
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
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.employee_id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{employee.employee_id}</td>
                  <td className="px-4 py-2">{employee.full_name}</td>
                  <td className="px-4 py-2">{employee.role}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.phone_number}</td>
                  <td className="px-4 py-2">{employee.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                      onClick={() => openModal(employee)}
                      title="Edit Employee"
                    >
                      <FaEdit className="text-white" />
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(employee.employee_id)}
                      title="Delete Employee"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for adding/editing an employee */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <h3 className="text-xl mb-4">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h3>
              <form onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Employee ID"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.employee_id}
                  onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
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
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Registrar">Registrar</option>
                  <option value="Society Officer">Society Officer</option>
                  <option value="Adviser">Adviser</option>
                </select>
                <input
                  type="email"
                  placeholder="Email"
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
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password input
                  placeholder="Password"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!isEditing} // Password required only for new employees
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide icon */}
                </button>

              </div>
              <div className="relative">
              <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required={!isEditing} // Confirm password required only for new employees
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
                    {isEditing ? 'Update Employee' : 'Add Employee'}
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

export default EmployeeAccountManagement;
