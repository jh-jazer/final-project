import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const EmployeeProfile = () => {
  const { user } = useOutletContext();
  const employee_id = parseInt(user?.id) || null; // Ensure integer value

  const [employee, setEmployee] = useState({
    full_name: '',
    employee_type: '',
    email: '',
    phone_number: '',
    address: '',
    dob: '',
    emergency_contact: '',
  });

  useEffect(() => {
    if (employee_id) {
      fetchFormData(employee_id);
    }
  }, [employee_id]);

  const fetchFormData = async (employee_id) => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getEmployeeInfo?employee_id=${employee_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEmployee((prevData) => ({
        ...prevData,
        ...data,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Format Date of Birth
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8 bg-gradient-to-r from-green-700 to-green-400 min-h-screen">
      <div className="bg-white shadow-2xl rounded-lg p-8 mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{employee.full_name || 'Employee Name'}</h1>
          <p className="text-lg font-medium text-gray-600 mt-2">{employee.employee_type || 'Employee Role'}</p>
        </div>

        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-gray-600">Email:</p>
              <p className="text-gray-700">{employee.email || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Phone:</p>
              <p className="text-gray-700">{employee.phone_number || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Address:</p>
              <p className="text-gray-700">{employee.address || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Date of Birth:</p>
              <p className="text-gray-700">{formatDate(employee.dob)}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Emergency Contact</h2>
          <div>
            <p className="font-medium text-gray-600">Phone:</p>
            <p className="text-gray-700">{employee.emergency_contact || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
