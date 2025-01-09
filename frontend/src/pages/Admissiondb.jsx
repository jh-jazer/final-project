import React, { useState, useEffect } from "react";
import TopNav from './../components/Topnav';


const Admissiondb = () => {
  const [activeTab, setActiveTab] = useState(0);

  //fetch application
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/application');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  //fetch personalInfo,familybackGround,edudBackground
  const [personalInfo, setPersonalInfo] = useState([]);
  const [familyBackground, setFamilyBackground] = useState([]);
  const [educationalBackground, setEducationalBackground] = useState([]);

  useEffect(() => {
    const fetchOtherInfo = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/otherInfo');
        const data = await response.json();
        setPersonalInfo(data.personalInfo);
        setFamilyBackground(data.familyBackground);
        setEducationalBackground(data.educationalBackground);
      } catch (error) {
        console.error('Error fetching other info:', error);
      }
    };

    fetchOtherInfo();
  }, []);

  const tabs = [
    {
      label: "Application Details",
      content: (
        <div className="p-6 space-y-6">
          {applications.length > 0 ? (
            applications.map((app, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Applicant: {app.application_id}
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email Address:</strong> {app.email}</li>
                  <li><strong>Name:</strong> {app.name}</li>
                  <li><strong>Control Number:</strong> {app.application_id}</li>
                </ul>
              </div>
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      ),
    },
    {
      label: "Application Profile",
      content: (
        <div className="p-6 space-y-6">
          {/* Educational Background */}
          {educationalBackground && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Educational Background</h2>
    
              {educationalBackground.map((education, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-bold">Applicant: {education.id}</h3>
    
                  {/* Elementary */}
                  <div>
                    <strong>Level:</strong> Elementary
                    <ul className="ml-6 list-disc">
                      <li><strong>School:</strong> {education.elementarySchoolName || "Not Provided"}</li>
                      <li><strong>Address:</strong> {education.elementarySchoolAddress || "Not Provided"}</li>
                      <li><strong>Year Graduated:</strong> {education.elementaryYearGraduated || "Not Provided"}</li>
                    </ul>
                  </div>
    
                  {/* High School */}
                  <div>
                    <strong>Level:</strong> High School
                    <ul className="ml-6 list-disc">
                      <li><strong>School:</strong> {education.highSchoolName || "Not Provided"}</li>
                      <li><strong>Address:</strong> {education.highSchoolAddress || "Not Provided"}</li>
                      <li><strong>Year Graduated:</strong> {education.highSchoolYearGraduated || "Not Provided"}</li>
                    </ul>
                  </div>
    
                  {/* Senior High School */}
                  <div>
                    <strong>Level:</strong> Senior High School
                    <ul className="ml-6 list-disc">
                      <li><strong>School:</strong> {education.seniorHighSchoolName || "Not Provided"}</li>
                      <li><strong>Address:</strong> {education.seniorHighSchoolAddress || "Not Provided"}</li>
                      <li><strong>Year Graduated:</strong> {education.seniorHighYearGraduated || "Not Provided"}</li>
                    </ul>
                  </div>
    
                  {/* College */}
                  <div>
                    <strong>Level:</strong> College
                    <ul className="ml-6 list-disc">
                      <li><strong>School:</strong> {education.collegeName || "Not Provided"}</li>
                      <li><strong>Address:</strong> {education.collegeAddress || "Not Provided"}</li>
                      <li><strong>Year Graduated:</strong> {education.collegeYearGraduated || "Not Provided"}</li>
                      <li><strong>Degree:</strong> {education.collegeDegree || "Not Provided"}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
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