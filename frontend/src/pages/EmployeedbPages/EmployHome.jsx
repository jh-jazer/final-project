import React, { useState, useEffect } from 'react';

const EmployHome = () => {
  // Simulating fetching data (you can replace this with API calls)
  const [statistics, setStatistics] = useState({
    applicants: 0,
    students: 0,
    employees: 0,
  });

  useEffect(() => {
      const numberOfPeoplePerRole = async () => {
        try {
          const response = await fetch('https://cvsu-backend-system.vercel.app/api/numberOfPeoplePerRoles');
          const data = await response.json();
          setStatistics({
            applicants: data.numOfApplicants[0]["COUNT(*)"],
            students: data.numOfStudents[0]["COUNT(*)"],
            employees: data.numOfEmployees[0]["COUNT(*)"],
          });          
        } catch (error) {
          console.error('Error fetching other info:', error);
        }
      };
  
      numberOfPeoplePerRole();
    }, []);

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-500 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <p className="mt-2 text-lg">
          Welcome to your dashboard! Here you can view the current statistics.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Applicants */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Applicants</h2>
            <p className="text-2xl font-bold text-green-600">{statistics.applicants}</p>
          </div>
        </div>

        {/* Students */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Students</h2>
            <p className="text-2xl font-bold text-blue-600">{statistics.students}</p>
          </div>
        </div>

        {/* Employees */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Employees</h2>
            <p className="text-2xl font-bold text-orange-600">{statistics.employees}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployHome;
