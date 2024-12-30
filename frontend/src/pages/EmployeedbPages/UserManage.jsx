import React, { useState, useEffect } from 'react';

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

const AccountManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    full_name: '',
    role: '',
    email: '',
    phone_number: '',
    address: '',
    dob: '',
    emergency_contact: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await apiRequest('http://localhost:5005/api/employees', 'GET');
        setEmployees(result);
      } catch (error) {
        setStatusMessage('Failed to fetch employee data.');
      }
    };

    fetchEmployees();
  }, []);

  const openModal = (employee = null) => {
    if (employee) {
      setFormData(employee);
      setIsEditing(true);
    } else {
      setFormData({
        id: '',
        full_name: '',
        role: '',
        email: '',
        phone_number: '',
        address: '',
        dob: '',
        emergency_contact: '',
        status: '',
      });
      setIsEditing(false);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5005/api/employees/${formData.id}`
      : 'http://localhost:5005/api/employees';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      await apiRequest(url, method, formData);
      setStatusMessage(isEditing ? 'Employee updated successfully' : 'Employee added successfully');
      setModalOpen(false);
      fetchEmployees();
    } catch (error) {
      setStatusMessage('Error saving data');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await apiRequest(`http://localhost:5005/api/employees/${id}`, 'DELETE');
        setStatusMessage('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        setStatusMessage('Error deleting employee');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Employee Data</h2>
        {statusMessage && <div className="mb-4 text-center text-red-600">{statusMessage}</div>}
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => openModal()}
        >
          Add New Employee
        </button>

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
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{employee.id}</td>
                  <td className="px-4 py-2">{employee.full_name}</td>
                  <td className="px-4 py-2">{employee.role}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.phone_number}</td>
                  <td className="px-4 py-2">{employee.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                      onClick={() => openModal(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
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
                  placeholder="Full Name"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full px-4 py-2 mb-2 border"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
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
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md">
                  {isEditing ? 'Update' : 'Add'} Employee
                </button>
              </form>
              <button
                className="mt-2 w-full bg-gray-500 text-white py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
