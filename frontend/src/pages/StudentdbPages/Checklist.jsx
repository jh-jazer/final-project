import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';

const Checklist = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [course, setCourse] = useState('BSCS'); // Add state to determine the course (CS or IT)
  const location = useLocation();
  const { user } = location.state || {};  // Safely access user data
  const dataFromParent = useOutletContext();
  const userId = dataFromParent.user.id;

  
  const getGrades = async (enrollmentId, courseCode) => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getGrades/${enrollmentId}/${courseCode}`);
      
      if (response.ok) {
        const grades = await response.json();
        return grades[0].grade;
      } else {
        return "N/A";
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  
  const [csSemesters, setCsSemesters] = useState([
    {
      label: 'First Year, First Semester',
      courses: [
        { code: 'GNED 02', name: 'Ethics', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 05', name: 'Purposive Communication', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 11', name: 'Kontekstwalisadong Komunikasyon sa Filipino', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 50', name: 'Discrete Structures', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 21', name: 'Introduction to Computing', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 22', name: 'Computer Programming I', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 1', name: 'Movement Enhancement', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'NSTP 1', name: 'National Service Training Program 1', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'CvSU 101', name: 'Institutional Orientation', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'First Year, Second Semester',
      courses: [
        { code: 'GNED 01', name: 'Art Appreciation', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 03', name: 'Mathematics in the Modern World', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 06', name: 'Science, Technology, and Society', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 12', name: 'Dalumat Ng/Sa Filipino', prerequisite: 'GNED 11', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 23', name: 'Computer Programming II', prerequisite: 'DCIT 22', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 50', name: 'Web Systems and Technologies', prerequisite: 'DCiT 21', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 2', name: 'Fitness Exercises', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'NSTP 2', name: 'National Service Training Program 2', prerequisite: 'NSTP 1', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Second Year, First Semester',
      courses: [
        { code: 'GNED 04', name: 'Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'MATH 1', name: 'Analytic Geometry', prerequisite: 'GNED 03', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 55', name: 'Discrete Structures II', prerequisite: 'COSC 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 60', name: 'Digital Logic Design', prerequisite: 'COSC 50, DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 50', name: 'Object Oriented Programming', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 24', name: 'Information Management', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'INSY 50', name: 'Fundamentals of Information Systems', prerequisite: 'DCIT 21', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 3', name: 'Physical Activities towards Health and Fitness 1', prerequisite: 'FITT 1', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Second Year, Second Semester',
      courses: [
        { code: 'GNED 08', name: 'Understanding the Self', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 14', name: 'Panitikang Panlipunan', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'MATH 2', name: 'Calculus', prerequisite: 'MATH 1', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 65', name: 'Architecture and Organization', prerequisite: 'COSC 60', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 70', name: 'Software Engineering', prerequisite: 'DCIT 50, DCIT 24', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 25', name: 'Data Structures and Algorithms', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 55', name: 'Advanced Database Management System', prerequisite: 'DCIT 24', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 4', name: 'Physical Activities towards Health and Fitness 2', prerequisite: 'FITT 1', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Third Year, First Semester',
      courses: [
        { code: 'MATH 3', name: 'Linear Algebra', prerequisite: 'MATH 2', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 75', name: 'Software Engineering II', prerequisite: 'COSC 70', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 80', name: 'Operating Systems', prerequisite: 'DCIT 25', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 85', name: 'Networks and Communication', prerequisite: 'ITEC 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 101', name: 'CS Elective 1 (Computer Graphics and Visual Computing)', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 26', name: 'Applications Dev’t and Emerging Technologies', prerequisite: 'ITEC 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 65', name: 'Social and Professional Issues', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Third Year, Second Semester',
      courses: [
        { code: 'GNED 08', name: 'Life and Works of Rizal', prerequisite: 'GNED 04', grade: 'Loading...', instructor: 'TBA' },
        { code: 'MATH 4', name: 'Experimental Statistics', prerequisite: 'MATH 2', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 90', name: 'Design and Analysis of Algorithm', prerequisite: 'DCIT 25', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 95', name: 'Programming Languages', prerequisite: 'DCIT 25', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 106', name: 'CS Elective 2 (Introduction to Game Development)', prerequisite: 'MATH 3, COSC 101', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 60', name: 'Methods of Research', prerequisite: 'Third Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 85', name: 'Information Assurance and Security', prerequisite: 'DCIT 24', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Third Year, Mid-Year',
      courses: [
        { code: 'COSC 199', name: 'Practicum (240 hours)', prerequisite: 'Incoming Fourth Year', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Fourth Year, First Semester',
      courses: [
        { code: 'ITEC 80', name: 'Human Computer Interaction', prerequisite: 'ITEC 85', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 80', name: 'Automata Theory and Formal Languages', prerequisite: 'COSC 90', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 105', name: 'Intelligent Systems', prerequisite: 'MATH 4, COSC 55, DICT 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 111', name: 'CS Elective 3 (Internet of Things)', prerequisite: 'COSC 60', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 200A', name: 'Undergraduate Thesis 1', prerequisite: 'Fourth Year Standing', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Fourth Year, Second Semester',
      courses: [
        { code: 'GNED 09', name: 'The Contemporary World', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 10', name: 'Gender and Society', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 110', name: 'Numerical and Symbolic Computation', prerequisite: 'COSC 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 200B', name: 'Undergraduate Thesis II', prerequisite: 'COSC 200A', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    
  ]);
  
    // update all grade for comsci
    useEffect(() => { 
      const fetchGrades = async (enrollmentId) => {
        const updatedSemesters = await Promise.all(
          csSemesters.map(async (semester) => {
            const updatedCourses = await Promise.all(
              semester.courses.map(async (course) => {
                const grade = await getGrades(enrollmentId, course.code);
                return { ...course, grade };
              })
            );
            return { ...semester, courses: updatedCourses };
          })
        );
        setCsSemesters(updatedSemesters);
      };
  
      fetchGrades(userId);
    }, [userId]);

  // List of IT semesters and their courses
  const [itSemesters, setItSemesters] = useState([
    {
      label: 'First Year, First Semester',
      courses: [
        { code: 'GNED 02', name: 'Ethics', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 05', name: 'Purposive Communication', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 11', name: 'Kontekstwalisadong Komunikasyon sa Filipino', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'COSC 50', name: 'Discrete Structures', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 21', name: 'Introduction to Computing', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 22', name: 'Computer Programming I', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 1', name: 'Movement Enhancement', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'NSTP 1', name: 'National Service Training Program 1', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ORNT 1', name: 'Institutional Orientation', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'First Year, Second Semester',
      courses: [
        { code: 'GNED 01', name: 'Art Appreciation', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 06', name: 'Science, Technology, and Society', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 12', name: 'Dalumat Ng/Sa Filipino', prerequisite: 'GNED 10', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 03', name: 'Mathematics in the Modern World', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 23', name: 'Computer Programming 2', prerequisite: 'DCIT 22', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 50', name: 'Web Systems and Technologies 1', prerequisite: 'DCIT 21', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 2', name: 'Fitness Exercise', prerequisite: 'FITT 1', grade: 'Loading...', instructor: 'TBA' },
        { code: 'NSTP 2', name: 'National Service Training Program 2', prerequisite: 'NSTP 1', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Second Year, First Semester',
      courses: [
        { code: 'GNED 04', name: 'Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 07', name: 'The Contemporary World', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 10', name: 'Gender and Society', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'GNED 14', name: 'Panitikang Panlipunan', prerequisite: 'GNED 10', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 55', name: 'Platform Technologies', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 24', name: 'Information Management', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 50', name: 'Object-Oriented Programming', prerequisite: 'DCIT 23', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 3', name: 'Physical Activities towards Health and Fitness 1', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Second Year, Second Semester',
      courses: [
        { code: 'GNED 08', name: 'Understanding the Self', prerequisite: 'None', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 25', name: 'Data Structures and Algorithms', prerequisite: 'DCIT 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 60', name: 'Integrated Programming and Technologies 1', prerequisite: 'DCIT 50, ITEC 55', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 65', name: 'Open Source Technologies', prerequisite: 'Second Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 55', name: 'Advanced Database System', prerequisite: 'DCIT 24', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 70', name: 'Multimedia Systems', prerequisite: 'Second Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'FITT 4', name: 'Physical Activities towards Health and Fitness 2', prerequisite: '', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: "Second Year, Mid-Year",
      courses: [
        { code: "STAT 2", name: " Applied Statistics", prerequisite: "Second Year Standing", grade: 'Loading...', instructor: 'TBA' },
        { code: "ITEC 75", name: " System Integration and Architecture 1", prerequisite: "ITEC 60", grade: 'Loading...', instructor: 'TBA' },
      ]
    },
    {
      label: 'Third Year, First Semester',
      courses: [
        { code: 'ITEC 80', name: 'Introduction to Human Computer Interaction', prerequisite: 'Third Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 85', name: 'Information Assurance and Security 1', prerequisite: 'ITEC 75', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 90', name: 'Network Fundamentals', prerequisite: 'ITEC 55', grade: 'Loading...', instructor: 'TBA' },
        { code: 'INSY 55 ', name: 'System Analysis and Design', prerequisite: 'Third Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 26', name: 'Applications Development and Emerging Technologies', prerequisite: 'DCIT 55', grade: 'Loading...', instructor: 'TBA' },
        { code: 'DCIT 80', name: 'Methods of Research', prerequisite: 'Third Year Standing', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Third Year, Second Semester',
      courses: [
        { code: 'GNED 09', name: 'Rizal; Life, Works and Writings', prerequisite: 'GNED 4', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 95', name: 'Quantitative Methods (Modeling & Simulation', prerequisite: 'COSC 50, STAT 2', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 101', name: 'IT ELECTIVE 1 (Human Computer Interaction 2)', prerequisite: 'ITEC 60', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 106', name: 'IT ELECTIVE 2 (Web System and Technologies)', prerequisite: 'ITEC 50', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 100', name: 'Information Assurance and Security 2', prerequisite: 'ITEC 85', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 105', name: 'Network Management', prerequisite: 'ITEC 90', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 200A', name: 'Capstone Project and Research 1', prerequisite: 'DCIT 80, DCIT 26, ITEC 85, 70% total units taken', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Fourth Year, First Semester',
      courses: [
        { code: 'DCIT 65', name: 'Social and Professional Issues', prerequisite: 'Third Year Standing', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 111', name: 'Elective 3 (Integrated Programming and Technologies 2)', prerequisite: 'ITEC 60', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 116', name: 'Elective 4 (Systems Integration and Architecture 2)', prerequisite: 'ITEC 75', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 110', name: 'System Administration and Maintenance', prerequisite: 'ITEC 100', grade: 'Loading...', instructor: 'TBA' },
        { code: 'ITEC 200B', name: 'Capstone Project and Research 2', prerequisite: 'ITEC 200A', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
    {
      label: 'Fourth Year, Second Semester',
      courses: [
        { code: 'ITEC 199', name: 'Practicum (minimum 480 hours)', prerequisite: 'DCIT 80, DCIT 26, ITEC 85, 70% total units taken', grade: 'Loading...', instructor: 'TBA' },
      ],
    },
  ]);

  useEffect(() => { 
    const fetchGrades = async (enrollmentId) => {
      const updatedSemesters = await Promise.all(
        itSemesters.map(async (semester) => {
          const updatedCourses = await Promise.all(
            semester.courses.map(async (course) => {
              const grade = await getGrades(enrollmentId, course.code);
              return { ...course, grade };
            })
          );
          return { ...semester, courses: updatedCourses };
        })
      );
      setItSemesters(updatedSemesters);
    };

    fetchGrades(userId);
  }, [userId]);
  
  const currentSemester = course === 'BSCS' ? csSemesters[currentIndex] : itSemesters[currentIndex];

  // Function to handle semester navigation
  const goToNextSemester = () => {
    if (currentIndex < (course === 'BSCS' ? csSemesters.length : itSemesters.length) - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousSemester = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl overflow-x-auto">
      
      {/* Student Basic Information Section */}
      {user && (
        <div className="student-info" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Student Information</h3>
          <p><strong>Name:</strong> {user.full_name}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Course:</strong> {user.program}</p>
        </div>
      )}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{currentSemester.label}</h2>
          <div>
            <button
              onClick={goToPreviousSemester}
              disabled={currentIndex === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-4 disabled:bg-gray-300"
            >
              Previous
            </button>
            <button
              onClick={goToNextSemester}
              disabled={currentIndex === (course === 'BSCS' ? csSemesters.length : itSemesters.length) - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Course Name</th>
              <th className="px-4 py-2 border">Prerequisite</th>
              <th className="px-4 py-2 border">Grade</th>
              <th className="px-4 py-2 border">Instructor</th>
            </tr>
          </thead>
          <tbody>
            {currentSemester.courses.map((course, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{course.code}</td>
                <td className="px-4 py-2 border">{course.name}</td>
                <td className="px-4 py-2 border">{course.prerequisite}</td>
                <td className="px-4 py-2 border">{course.grade}</td>
                <td className="px-4 py-2 border">{course.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checklist;