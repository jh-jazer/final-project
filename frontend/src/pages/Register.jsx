import React, { useState } from 'react';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav'; // Import the TopNav component
import { Link } from 'react-router-dom';

const Register = () => {
  // State to manage user type (student or employee)
  const [userType, setUserType] = useState("student"); // default to "student"

  return (
    <div>
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center pt-[70px]"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        {/* Register Card */}
        <div className="w-full max-w-md p-8 bg-white bg-opacity-95 shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex items-center gap-4 justify-self-center">
            <img src={Logo} alt="University Logo" className="w-[60px] h-[60px]" />
            <h2 className="text-3xl font-extrabold text-[#C61A01]">Register</h2>
          </div>

          {/* Registration Form */}
          <form className="space-y-4">
            {/* Conditionally Render Fields Based on User Type */}
            {userType === "student" && (
              <div>
                {/* CvSU Email */}
                <div>
                  <label htmlFor="cvsuEmail" className="block text-sm pt-3 font-medium text-gray-700">
                    CvSU Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="cvsuEmail"
                    name="cvsuEmail"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your CvSU email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm pt-3 font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Create Password"
                    required
                  />
                </div>
              </div>
            )}

            {userType === "employee" && (
              <div>
                {/* Given Name */}
                <div>
                  <label htmlFor="givenName" className="block text-sm pt-3 font-medium text-gray-700">
                    Given Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="givenName"
                    name="givenName"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your given name"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label htmlFor="middleName" className="block text-sm pt-3 font-medium text-gray-700">
                    Middle Name <span className="text-gray-500 text-sm">(if applicable)</span>
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your middle name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm pt-3 font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label htmlFor="employeeId" className="block text-sm pt-3 font-medium text-gray-700">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your employee ID"
                    required
                  />
                </div>

                {/* Personal Email */}
                <div>
                  <label htmlFor="personalEmail" className="block text-sm pt-3 font-medium text-gray-700">
                    Personal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="personalEmail"
                    name="personalEmail"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your personal email"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm pt-3 font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Role Selector */}
                <div>
                  <label htmlFor="role" className="block text-sm pt-3 font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="adviser">Adviser</option>
                    <option value="registrar">Registrar</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Link to="/studentdb">
              <button
                type="submit"
                className="w-full py-2 mt-6 text-white bg-[#C61A01] rounded-lg hover:bg-[#C61A01]/90 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
              >
                Register
              </button>
            </Link>
          </form>

          {/* Already have an account? */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C61A01] hover:underline">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
