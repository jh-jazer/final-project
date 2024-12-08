import React, { useState } from "react";
import TopNav from './../components/Topnav';


const Admissiondb = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Application Details",
      content: (
        <div className="p-6 space-y-6">
          {/* Applicant Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Applicant Details</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Applicant Type:</strong> Senior High School Graduate</li>
              <li><strong>Track:</strong> Academic</li>
              <li><strong>Strand:</strong> Science, Technology, Engineering, and Mathematics</li>
              <li><strong>Program:</strong> BS Computer Science</li>
              <li><strong>Control Number:</strong> 011123</li>
              <li><strong>Email Address:</strong> dummyedyiy@gmail.com</li>
            </ul>
          </div>

          {/* Schedule Details */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedules</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Appointment for Requirement Validation:</strong> March 05, 2025, 08:00 AM - 12:00 PM</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "Application Profile",
      content: (
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Given Name:</strong> Kerry</li>
              <li><strong>Family Name:</strong> Not Applicable</li>
              <li><strong>Middle Name:</strong> Not Applicable</li>
              <li><strong>Suffix :</strong> Not Applicable</li>
              <li><strong>Sex at birth:</strong> Male</li>
              <li><strong>Nationality:</strong> Filipino</li>
              <li><strong>Date of Birth:</strong> February 05, 2004</li>
              <li><strong>Civil Status:</strong> Single</li>
              <li><strong>Religion:</strong> Roman Catholic</li>
              <li><strong>Contact Number:</strong> 09123796420</li>
            </ul>
          </div>

          {/* Residential Address */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Residential Address</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Street Address:</strong> (not provided)</li>
              <li><strong>City:</strong> Taguig</li>
              <li><strong>State/Province/Region:</strong> Metro Manila</li>
              <li><strong>Zip Code:</strong> 1740</li>
              <li><strong>Country:</strong> Philippines</li>
            </ul>
          </div>

          {/* Family Background */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Family Background</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Father's Name:</strong> Not Applicable</li>
              <li><strong>Father's Occupation:</strong> Not Applicable</li>
              <li><strong>Father's Contact Number:</strong> Not Applicable</li>
              <li><strong>Mother's Name:</strong> Not Applicable</li>
              <li><strong>Mother's Occupation:</strong> Not Applicable</li>
              <li><strong>Mother's Contact Number:</strong> Not Applicable</li>
              <li><strong>Guardian's Name:</strong> Joshua</li>
              <li><strong>Guardian's Occupation:</strong> Joshua</li>
              <li><strong>Guardian's Contact Number:</strong> 0948756134</li>
              <li><strong>Number of Siblings:</strong> 1</li>
              <li><strong>Income Bracket:</strong> 22,001 - 43,000</li>
            </ul>
          </div>

          {/* Educational Background */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Educational Background</h2>
            <ul className="space-y-4 text-gray-700">
              <li><strong>Level:</strong> Elementary
                <ul className="ml-6 list-disc">
                  <li><strong>School:</strong> Harvard</li>
                  <li><strong>Address:</strong> Quezon City</li>
                  <li><strong>Year Graduated:</strong> 2012</li>
                </ul>
              </li>
              <li><strong>Level:</strong> High School
                <ul className="ml-6 list-disc">
                  <li><strong>School:</strong> Harvard</li>
                  <li><strong>Address:</strong> Quezon City</li>
                  <li><strong>Year Graduated:</strong> 2012</li>
                </ul>
              </li>
              <li><strong>Level:</strong> Senior High School
                <ul className="ml-6 list-disc">
                  <li><strong>School:</strong> Harvard</li>
                  <li><strong>Address:</strong> Quezon City</li>
                  <li><strong>Year Graduated:</strong> 2018</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "Uploaded Requirements", 
      content: (
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Requirements</h2>
          {/* Image Container Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Example Image Container 1 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Requirement 1" 
                className="w-full h-auto rounded-lg" 
              />
            </div>
    
            {/* Example Image Container 2 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Requirement 2" 
                className="w-full h-auto rounded-lg" 
              />
            </div>
    
            {/* Example Image Container 3 */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Requirement 3" 
                className="w-full h-auto rounded-lg" 
              />
            </div>
    
            {/* Additional Image Containers can be added */}
          </div>
        </div>
      )
    },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-8">
      <div>
        <TopNav/>
      </div>
      <div className="w-full max-w-4xl pt-[7%] mb-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Admission Dashboard</h1>
      </div>
      

      {/* Tabs Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Tab Header */}
        <div className="flex border-b">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-3 text-lg font-medium text-center transition duration-200 ${
                index === activeTab
                  ? "border-b-4 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};

export default Admissiondb;