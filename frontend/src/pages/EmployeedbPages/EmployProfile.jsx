import React, { useState, useEffect } from 'react';

const EmployeeProfile = () => {
  // Sample data to simulate employee information
  const [employee, setEmployee] = useState({
    name: 'Jane Doe',
    jobTitle: 'Enrollment Officer',
    department: 'Admissions',
    email: 'janedoe@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, Country',
    dateOfBirth: '1990-01-01',
    emergencyContact: '555-987-6543',
    profilePicture: 'https://via.placeholder.com/150',
  });

  useEffect(() => {
    // Fetch employee data from an API or database here if needed
    // Example: setEmployee(fetchedData);
  }, []);

  return (
    
    <div className="p-8 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          <img
            src={employee.profilePicture}
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-green-600"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{employee.name}</h1>
            <p className="text-xl text-gray-600">{employee.jobTitle}</p>
            <p className="text-md text-gray-500">{employee.department}</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="font-semibold text-gray-600">Email:</p>
              <p className="text-gray-500">{employee.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Phone:</p>
              <p className="text-gray-500">{employee.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Address:</p>
              <p className="text-gray-500">{employee.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Date of Birth:</p>
              <p className="text-gray-500">{employee.dateOfBirth}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Emergency Contact</h2>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Phone:</p>
            <p className="text-gray-500">{employee.emergencyContact}</p>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-8 text-right">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => alert('Edit Profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
