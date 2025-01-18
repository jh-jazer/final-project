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
  const date = new Date(employee.dob);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

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

  return (
    <div className="p-8 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        
          <div>
            <h1 className="display-column text-3xl md:text-3xl xs:text-3xl xs:text-left sm:text-left sm:text-3xl font-semibold text-gray-800">{employee.full_name}</h1>
            <p className="text-xl text-gray-600">{employee.employee_type}</p>
          </div>
      

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="font-semibold text-gray-600">Email:</p>
              <p className="text-gray-500">{employee.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Phone:</p>
              <p className="text-gray-500">{employee.phone_number}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Address:</p>
              <p className="text-gray-500">{employee.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Date of Birth:</p>
              <p className="text-gray-500">{formattedDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Emergency Contact</h2>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Phone:</p>
            <p className="text-gray-500">{employee.emergency_contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
