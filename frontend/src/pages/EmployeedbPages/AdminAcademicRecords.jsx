import React, { useState, useEffect } from 'react';
import Modal from './AdminGradesModal'; // Import the Modal component

const AcademicRecords = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        
        const response = await fetch('https://cvsu-backend-system.vercel.app/api/students'); // Replace with your API endpoint
        const data = await response.json();

        const getAverageGrade = async (student_id) => {
          const avgGradeResponse = await fetch(`https://cvsu-backend-system.vercel.app/api/getAverageGrade/${student_id}`); // Corrected string interpolation
          const avgGrade = await avgGradeResponse.json();  // Use avgGradeResponse here
          if (avgGrade){
            return avgGrade;
          }
          else{
            return "Nothing here"
          };
      };
      

      const transformedData = await Promise.all(data.map(async (student, index) => {
        const grades = await getAverageGrade(student.student_id); // Wait for the grade to be fetched

        return {
          id: student.student_id,
          studentNumber: student.student_id.toString(),
          name: student.full_name,
          program: student.program_id === 1 ? 'Computer Science' : 'Unknown Program', // Example mapping
          year: `${student.year}`, // Example: using semester to define year
          section: `${student.class_section}`, // Assuming the class_section represents the section
          grades: grades[0].average_grade, // Set the fetched grades
          status: student.status,
        };
      }));
      
        setStudents(transformedData); // Set the fetched students data to state
        // setFilteredStudents(data); // You can apply any filtering logic here
      } catch (error) {
        console.error("Error fetching students data:", error);
      }
    };

    fetchStudents();
  }, []);

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
    <div className="p-6 bg-green-500 min-h-screen">
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
                    {`${student.year}-${student.section}`}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {student.grades}
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