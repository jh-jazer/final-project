import React, { useState } from 'react';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav'; // Import the TopNav component
import { Link } from 'react-router-dom';

const Register = () => {
  const [userType, setUserType] = useState('regular'); // Manage user type state
  const [isSocietyOfficer, setIsSocietyOfficer] = useState(false);


  return (
    <div>
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content */}
      <div
        className="flex justify-center min-h-screen bg-fixed bg-cover bg-center py-[150px]"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        {/* Register Card */}
        <div className="w-full max-w-lg p-8 bg-[#E8E8E8] bg-opacity-95 shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-extrabold text-[#C61A01]">Register</h2>
          </div>

          {/* Registration Form */}
          <form className="space-y-4">
    
      

            {/* Radio Buttons for User Type */}
            <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-700">User Type</p>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  className="mr-2"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Student
              </label>
             
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="employee"
                  className="mr-2"
                  checked={userType === 'employee'}
                  onChange={(e) => setUserType(e.target.value)}
                />
                Employee
              </label>
            </div>
          </div>


            {/* Conditionally Render Fields Based on User Type */}
            {userType === "student" && (
          <div>
            {/* Given Name */}
            <div>
              <label htmlFor="givenName" className="block text-sm font-medium text-gray-700">
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

            {/* Student ID */}
            <div>
              <label htmlFor="studentId" className="block text-sm pt-3 font-medium text-gray-700">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                placeholder="Enter your student ID"
                required
              />
            </div>

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

            {/* Program */}
            <div>
              <label htmlFor="program" className="block text-sm pt-3 font-medium text-gray-700">
                Program <span className="text-red-500">*</span>
              </label>
              <select
                id="program"
                name="program"
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                required
              >
                <option value="">Select your program</option>
                <option value="bscs">Bachelor Science in Computer Science</option>
                <option value="bsit">Bachelor Science in Computer Technology</option>
              </select>
            </div>

            {/* Regular or Irregular */}
            <div>
              <label htmlFor="status" className="block text-sm pt-3 font-medium text-gray-700">
                Regular or Irregular <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                required
              >
                <option value="">Select here</option>
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
              </select>
            </div>

            {/* Is Society Officer */}
            <div className="flex items-center pt-3">
              <input
                type="checkbox"
                id="societyOfficerCheck"
                name="societyOfficerCheck"
                className="w-4 h-4 text-[#C61A01] border-gray-300 rounded focus:ring-[#C61A01]"
                checked={isSocietyOfficer}
                onChange={(e) => setIsSocietyOfficer(e.target.checked)}
              />
              <label htmlFor="societyOfficerCheck" className="ml-2 text-sm font-medium text-gray-700">
                I am a Society Officer
              </label>
            </div>

            {/* Society Officer */}
            {isSocietyOfficer && (
              <div>
                <label htmlFor="societyOffice" className="block text-sm pt-3 font-medium text-gray-700">
                  Society Office <span className="text-red-500">*</span>
                </label>
                <select
                  id="societyOffice"
                  name="societyOffice"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  required
                >
                  <option value="">Select your Society Office</option>
                  <option value="president">President</option>
                  <option value="vicePresident">Vice President</option>
                  <option value="businessManager">Business Manager</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="pro">Public Relations Officer</option>
                  <option value="auditor"> Auditor</option>
                  <option value="assistantpro">Assistant Public Relations Officer</option>
                  <option value="firstchairperson">1st Year Chairperson</option>
                  <option value="secondchairpesron">2nd Year Chairperson</option>
                  <option value="thirdchairperson">3rd Year Chairperson </option>
                  <option value="forthchairperson">4th Year Chairperson </option>
                </select>
              </div>
            )}
          </div>
          )}
            {userType === 'employee' && (
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

              {/* Last Name */}
              <div>
                <label htmlFor="employeeId" className="block text-sm pt-3 font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="EmployeeId"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  placeholder="Enter your Employee ID"
                  required
                />
              </div>

              {/* CVSU Email */}
              <div>
                <label htmlFor="cvsuEmail" className="block text-sm pt-3 font-medium text-gray-700">
                  Personal Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="cvsuEmail"
                  name="cvsuEmail"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  placeholder="Enter your CvSU Email"
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

              {/* Job */}
              <div>
                <label htmlFor="job" className="block text-sm pt-3 font-medium text-gray-700">
                  Program <span className="text-red-500">*</span>
                </label>
                <select
                  id="job"
                  name="job"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  required
                >
                  <option value="">Select your Role</option>
                  <option value="adviser">Adviser </option>
                  <option value="registrar">Registrar </option>
                  <option value="admin">Admin </option>
                 
                  
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
