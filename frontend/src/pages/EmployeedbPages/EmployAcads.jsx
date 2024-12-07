import React, { useState } from 'react';
import Modal from './GradesModal'; // Import the Modal component

const AcademicRecords = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      course: 'Computer Science',
      year: 'First Year',
      section: '1-1',
      grades: { 'Year 1 Sem 1': 1.5, 'Year 1 Sem 2': 1.25 },
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      course: 'Computer Science',
      year: 'Second Year',
      section: '2-3',
      grades: { 'Year 2 Sem 1': 2.5, 'Year 2 Sem 2': 1.00 },
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mark Lee',
      course: 'Computer Science',
      year: 'Irregular',
      section: 'Irregular',
      grades: { 'Year 3 Sem 1': 1.25, 'Year 3 Sem 2': 2.5 },
      status: 'Inactive',
    },
  ]);

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [yearSectionFilter, setYearSectionFilter] = useState('All');
  
  // State for the selected student and modal visibility
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students
    .filter((student) => {
      return (
        student.name.toLowerCase().includes(search.toLowerCase()) &&
        (yearSectionFilter === 'All' ||
          `${student.year} & Section ${student.section.split('-')[1]}` === yearSectionFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'year') {
        return a.year.localeCompare(b.year);
      }
      return 0;
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
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Academic Records</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Student Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Year & Section Filter Dropdown */}
        <div className="mb-4">
          <select
            value={yearSectionFilter}
            onChange={(e) => setYearSectionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="All">All Years & Sections</option>
            <option value="First Year & Section 1">First Year & Section 1</option>
            <option value="First Year & Section 2">First Year & Section 2</option>
            <option value="First Year & Section 3">First Year & Section 3</option>
            <option value="First Year & Section 4">First Year & Section 4</option>
            <option value="First Year & Section 5">First Year & Section 5</option>
            <option value="Second Year & Section 1">Second Year & Section 1</option>
            <option value="Second Year & Section 2">Second Year & Section 2</option>
            <option value="Second Year & Section 3">Second Year & Section 3</option>
            <option value="Second Year & Section 4">Second Year & Section 4</option>
            <option value="Second Year & Section 5">Second Year & Section 5</option>
            <option value="Irregular">Irregular</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="name">Sort by Student Name</option>
            <option value="year">Sort by Year</option>
          </select>
        </div>

        {/* Table (Mobile-Friendly with Tailwind's Responsive Utilities) */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Student Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                <th className="px-4 py-2 text-left border border-gray-300">Year & Section</th>
                <th className="px-4 py-2 text-left border border-gray-300">Semester Grades</th>
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
                  <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.course}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {`${student.year} & Section ${student.section.split('-')[1]}`}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {Object.keys(student.grades).map((semester) => (
                      <div key={semester}>
                        {semester}: {student.grades[semester]}
                      </div>
                    ))}
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
