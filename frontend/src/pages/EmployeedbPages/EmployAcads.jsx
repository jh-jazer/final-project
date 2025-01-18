import React, { useState } from 'react';
import Modal from './GradesModal'; // Import the Modal component

const AcademicRecords = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      studentNumber: '202301234', // 9-digit student number
      name: 'John Doe',
      program: 'Computer Science',
      year: 'First Year',
      section: '1-1',
      grades: { 'Year 1 Sem 1': 1.5, 'Year 1 Sem 2': 1.25 },
      status: 'Active',
    },
    {
      id: 2,
      studentNumber: '202201234',
      name: 'Jane Smith',
      program: 'Computer Science',
      year: 'Second Year',
      section: '2-3',
      grades: { 'Year 2 Sem 1': 2.5, 'Year 2 Sem 2': 1.00 },
      status: 'Active',
    },
    {
      id: 3,
      studentNumber: '202101234',
      name: 'Mark Lee',
      program: 'Information Technology',
      year: 'Irregular',
      section: 'Irregular',
      grades: { 'Year 3 Sem 1': 1.25, 'Year 3 Sem 2': 2.5 },
      status: 'Inactive',
    },
  ]);

  const [search, setSearch] = useState('');

  // State for the selected student and modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter students based on search input (by student number or name)
  const filteredStudents = students.filter((student) => {
    const lowerSearch = search.toLowerCase();
    return (
      student.name.toLowerCase().includes(lowerSearch) ||
      student.studentNumber.includes(lowerSearch)
    );
  });

  const calculateAverageGrade = (grades) => {
    const gradeValues = Object.values(grades);
    const total = gradeValues.reduce((acc, grade) => acc + grade, 0);
    return (total / gradeValues.length).toFixed(2); // Round to 2 decimal places
  };

  // Handle student row click
  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-800 to-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Academic Records</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Student Number or Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Table (Mobile-Friendly with Tailwind's Responsive Utilities) */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Student Number</th>
                <th className="px-4 py-2 text-left border border-gray-300">Student Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Program</th>
                <th className="px-4 py-2 text-left border border-gray-300">Year & Section</th>
                <th className="px-4 py-2 text-left border border-gray-300">Average Grade</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(student)}
                >
                  <td className="px-4 py-2 border border-gray-300">{student.studentNumber}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.program}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {`${student.year} & Section ${student.section.split('-')[1]}`}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {calculateAverageGrade(student.grades)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal student={selectedStudent} onClose={handleCloseModal} />
    </div>
  );
};

export default AcademicRecords;
