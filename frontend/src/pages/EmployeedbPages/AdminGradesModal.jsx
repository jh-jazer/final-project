import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

// const csSemesters = [
//   {
//     label: 'First Year, First Semester',
//     courses: [
//       { code: 'GNED 02', name: 'Ethics', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 05', name: 'Purposive Communication', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 11', name: 'Kontekstwalisadong Komunikasyon sa Filipino', instructor: 'TBA', grade: 'N/A' },
//       { code: 'COSC 50', name: 'Discrete Structures', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 21', name: 'Introduction to Computing', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 22', name: 'Computer Programming I', instructor: 'TBA', grade: 'N/A' },
//       { code: 'FITT 1', name: 'Movement Enhancement', instructor: 'TBA', grade: 'N/A' },
//       { code: 'NSTP 1', name: 'National Service Training Program 1', instructor: 'TBA', grade: 'N/A' },
//       { code: 'CvSU 101', name: 'Institutional Orientation', instructor: 'TBA', grade: 'N/A' },
//     ],
//   },
//   {
//     label: 'First Year, Second Semester',
//     courses: [
//       { code: 'GNED 01', name: 'Art Appreciation', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 03', name: 'Mathematics in the Modern World', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 06', name: 'Science, Technology, and Society', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 12', name: 'Dalumat Ng/Sa Filipino', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 23', name: 'Computer Programming II', instructor: 'TBA', grade: 'N/A' },
//       { code: 'ITEC 50', name: 'Web Systems and Technologies', instructor: 'TBA', grade: 'N/A' },
//       { code: 'FITT 2', name: 'Fitness Exercises', instructor: 'TBA', grade: 'N/A' },
//       { code: 'NSTP 2', name: 'National Service Training Program 2', instructor: 'TBA', grade: 'N/A' },
//     ],
//   },
//   {
//     label: 'Second Year, First Semester',
//     courses: [
//       { code: 'GNED 04', name: 'Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas', instructor: 'TBA', grade: 'N/A' },
//       { code: 'MATH 1', name: 'Analytic Geometry', instructor: 'TBA', grade: 'N/A' },
//       { code: 'COSC 55', name: 'Discrete Structures II', instructor: 'TBA', grade: 'N/A' },
//       { code: 'COSC 60', name: 'Digital Logic Design', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 50', name: 'Object Oriented Programming', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 24', name: 'Information Management', instructor: 'TBA', grade: 'N/A' },
//       { code: 'INSY 50', name: 'Fundamentals of Information Systems', instructor: 'TBA', grade: 'N/A' },
//       { code: 'FITT 3', name: 'Physical Activities towards Health and Fitness 1', instructor: 'TBA', grade: 'N/A' },
//     ],
//   },
//   {
//     label: 'Second Year, Second Semester',
//     courses: [
//       { code: 'GNED 08', name: 'Understanding the Self', instructor: 'TBA', grade: 'N/A' },
//       { code: 'GNED 14', name: 'Panitikang Panlipunan', instructor: 'TBA', grade: 'N/A' },
//       { code: 'MATH 2', name: 'Calculus', instructor: 'TBA', grade: 'N/A' },
//       { code: 'COSC 65', name: 'Architecture and Organization', instructor: 'TBA', grade: 'N/A' },
//       { code: 'COSC 70', name: 'Software Engineering', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 25', name: 'Data Structures and Algorithms', instructor: 'TBA', grade: 'N/A' },
//       { code: 'DCIT 55', name: 'Advanced Database Management System', instructor: 'TBA', grade: 'N/A' },
//       { code: 'FITT 4', name: 'Physical Activities towards Health and Fitness 2', instructor: 'TBA', grade: 'N/A' },
//     ],
//   },
//   {
//     label: "Third Year, First Semester",
//     courses: [
//       { code: "MATH 3", name: "Linear Algebra", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 75", name: " Software Engineering II", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 80", name: " Operating Systems", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 85", name: " Networks and Communication", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 101", name: " CS Elective 1 (Computer Graphics and Visual Computing)", instructor: "TBA", grade: 'N/A' },
//       { code: "DCIT 26", name: " Applications Dev’t and Emerging Technologies", instructor: "TBA", grade: 'N/A' },
//       { code: "DCIT 65", name: " Social and Professional Issues", instructor: "TBA", grade: 'N/A' },
//     ]
//   },
//   {
//     label: "Third Year, Second Semester",
//     courses: [
//       { code: "GNED 08", name: " Life and Works of Rizal", instructor: "TBA", grade: 'N/A' },
//       { code: "MATH 4", name: " Experimental Statistics", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 90", name: " Design and Analysis of Algorithm", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 95", name: " Programming Languages", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 106", name: " CS Elective 2 (Introduction to Game Development)", instructor: "TBA", grade: 'N/A' },
//       { code: "DCIT 60", name: " Methods of Research", instructor: "TBA", grade: 'N/A' },
//       { code: "ITEC 85", name: " Information Assurance and Security", instructor: "TBA", grade: 'N/A' },
//     ]
//   },
//   {
//     label: "Third Year, Mid-Year",
//     courses: [
//       { code: "COSC 199", name: " Practicum (240 hours)", instructor: "TBA", grade: 'N/A' },
//     ]
//   },
//   {
//     label: "Fourth Year, First Semester",
//     courses: [
//       { code: "ITEC 80", name: " Human Computer Interaction", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 80", name: " Automata Theory and Formal Languages", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 105", name: " Intelligent Systems", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 111", name: " CS Elective 3 (Internet of Things)", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 200A", name: " Undergraduate Thesis 1", instructor: "TBA", grade: 'N/A' },
//     ]
//   },
//   {
//     label: "Fourth Year, Second Semester",
//     courses: [
//       { code: "GNED 09", name: " The Contemporary World", instructor: "TBA", grade: 'N/A' },
//       { code: "GNED 10", name: " Gender and Society", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 110", name: " Numerical and Symbolic Computation", instructor: "TBA", grade: 'N/A' },
//       { code: "COSC 200B", name: " Undergraduate Thesis II", instructor: "TBA", grade: 'N/A' },
//     ]
//   }
// ];


  // Add similar structure for Third Year and Fourth Year...


  const itSemesters = [
    {
      label: 'First Year, First Semester',
      courses: [
        { code: 'GNED 02', name: 'Ethics', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 05', name: 'Purposive Communication', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 11', name: 'Kontekstwalisadong Komunikasyon sa Filipino', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 50', name: 'Discrete Structures', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 21', name: 'Introduction to Computing', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 22', name: 'Computer Programming I', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 1', name: 'Movement Enhancement', instructor: 'TBA', grade: 'N/A' },
        { code: 'NSTP 1', name: 'National Service Training Program 1', instructor: 'TBA', grade: 'N/A' },
        { code: 'ORNT 1', name: 'Institutional Orientation', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'First Year, Second Semester',
      courses: [
        { code: 'GNED 01', name: 'Art Appreciation', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 06', name: 'Science, Technology, and Society', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 12', name: 'Dalumat Ng/Sa Filipino', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 03', name: 'Mathematics in the Modern World', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 23', name: 'Computer Programming 2', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 50', name: 'Web Systems and Technologies 1', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 2', name: 'Fitness Exercise', instructor: 'TBA', grade: 'N/A' },
        { code: 'NSTP 2', name: 'National Service Training Program 2', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Second Year, First Semester',
      courses: [
        { code: 'GNED 04', name: 'Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 07', name: 'The Contemporary World', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 10', name: 'Gender and Society', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 14', name: 'Panitikang Panlipunan', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 55', name: 'Platform Technologies', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 24', name: 'Information Management', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 50', name: 'Object-Oriented Programming', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 3', name: 'Physical Activities towards Health and Fitness 1', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Second Year, Second Semester',
      courses: [
        { code: 'GNED 08', name: 'Understanding the Self', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 25', name: 'Data Structures and Algorithms', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 60', name: 'Integrated Programming and Technologies 1', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 65', name: 'Open Source Technologies', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 55', name: 'Advanced Database System', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 70', name: 'Multimedia Systems', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 4', name: 'Physical Activities towards Health and Fitness 2', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: "Second Year, Mid-Year",
      courses: [
        { code: "STAT 2", name: "Applied Statistics", instructor: 'TBA', grade: 'N/A' },
        { code: "ITEC 75", name: "System Integration and Architecture 1", instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Third Year, First Semester',
      courses: [
        { code: 'ITEC 80', name: 'Introduction to Human Computer Interaction', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 85', name: 'Information Assurance and Security 1', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 90', name: 'Network Fundamentals', instructor: 'TBA', grade: 'N/A' },
        { code: 'INSY 55 ', name: 'System Analysis and Design', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 26', name: 'Applications Development and Emerging Technologies', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 80', name: 'Methods of Research', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Third Year, Second Semester',
      courses: [
        { code: 'GNED 09', name: 'Rizal; Life, Works and Writings', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 95', name: 'Quantitative Methods (Modeling & Simulation)', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 101', name: 'IT ELECTIVE 1 (Human Computer Interaction 2)', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 106', name: 'IT ELECTIVE 2 (Web System and Technologies)', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 100', name: 'Information Assurance and Security 2', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 105', name: 'Network Management', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 200A', name: 'Capstone Project and Research 1', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Fourth Year, First Semester',
      courses: [
        { code: 'DCIT 65', name: 'Social and Professional Issues', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 111', name: 'Elective 3 (Integrated Programming and Technologies 2)', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 116', name: 'Elective 4 (Systems Integration and Architecture 2)', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 110', name: 'System Administration and Maintenance', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 200B', name: 'Capstone Project and Research 2', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Fourth Year, Second Semester',
      courses: [
        { code: 'ITEC 199', name: 'Practicum (minimum 480 hours)', instructor: 'TBA', grade: 'N/A' },
      ],
    },
  ];
  
  
  const GradesTabPages = ({ student }) => {
    const userId = student?.studentNumber || 0;
    const [csSemesters, setCsSemesters] = useState([
    {
      label: 'First Year, First Semester',
      courses: [
        { code: 'GNED 02', name: 'Ethics', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 05', name: 'Purposive Communication', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 11', name: 'Kontekstwalisadong Komunikasyon sa Filipino', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 50', name: 'Discrete Structures', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 21', name: 'Introduction to Computing', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 22', name: 'Computer Programming I', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 1', name: 'Movement Enhancement', instructor: 'TBA', grade: 'N/A' },
        { code: 'NSTP 1', name: 'National Service Training Program 1', instructor: 'TBA', grade: 'N/A' },
        { code: 'CvSU 101', name: 'Institutional Orientation', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'First Year, Second Semester',
      courses: [
        { code: 'GNED 01', name: 'Art Appreciation', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 03', name: 'Mathematics in the Modern World', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 06', name: 'Science, Technology, and Society', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 12', name: 'Dalumat Ng/Sa Filipino', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 23', name: 'Computer Programming II', instructor: 'TBA', grade: 'N/A' },
        { code: 'ITEC 50', name: 'Web Systems and Technologies', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 2', name: 'Fitness Exercises', instructor: 'TBA', grade: 'N/A' },
        { code: 'NSTP 2', name: 'National Service Training Program 2', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Second Year, First Semester',
      courses: [
        { code: 'GNED 04', name: 'Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas', instructor: 'TBA', grade: 'N/A' },
        { code: 'MATH 1', name: 'Analytic Geometry', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 55', name: 'Discrete Structures II', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 60', name: 'Digital Logic Design', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 50', name: 'Object Oriented Programming', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 24', name: 'Information Management', instructor: 'TBA', grade: 'N/A' },
        { code: 'INSY 50', name: 'Fundamentals of Information Systems', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 3', name: 'Physical Activities towards Health and Fitness 1', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: 'Second Year, Second Semester',
      courses: [
        { code: 'GNED 08', name: 'Understanding the Self', instructor: 'TBA', grade: 'N/A' },
        { code: 'GNED 14', name: 'Panitikang Panlipunan', instructor: 'TBA', grade: 'N/A' },
        { code: 'MATH 2', name: 'Calculus', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 65', name: 'Architecture and Organization', instructor: 'TBA', grade: 'N/A' },
        { code: 'COSC 70', name: 'Software Engineering', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 25', name: 'Data Structures and Algorithms', instructor: 'TBA', grade: 'N/A' },
        { code: 'DCIT 55', name: 'Advanced Database Management System', instructor: 'TBA', grade: 'N/A' },
        { code: 'FITT 4', name: 'Physical Activities towards Health and Fitness 2', instructor: 'TBA', grade: 'N/A' },
      ],
    },
    {
      label: "Third Year, First Semester",
      courses: [
        { code: "MATH 3", name: "Linear Algebra", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 75", name: " Software Engineering II", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 80", name: " Operating Systems", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 85", name: " Networks and Communication", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 101", name: " CS Elective 1 (Computer Graphics and Visual Computing)", instructor: "TBA", grade: 'N/A' },
        { code: "DCIT 26", name: " Applications Dev’t and Emerging Technologies", instructor: "TBA", grade: 'N/A' },
        { code: "DCIT 65", name: " Social and Professional Issues", instructor: "TBA", grade: 'N/A' },
      ]
    },
    {
      label: "Third Year, Second Semester",
      courses: [
        { code: "GNED 08", name: " Life and Works of Rizal", instructor: "TBA", grade: 'N/A' },
        { code: "MATH 4", name: " Experimental Statistics", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 90", name: " Design and Analysis of Algorithm", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 95", name: " Programming Languages", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 106", name: " CS Elective 2 (Introduction to Game Development)", instructor: "TBA", grade: 'N/A' },
        { code: "DCIT 60", name: " Methods of Research", instructor: "TBA", grade: 'N/A' },
        { code: "ITEC 85", name: " Information Assurance and Security", instructor: "TBA", grade: 'N/A' },
      ]
    },
    {
      label: "Third Year, Mid-Year",
      courses: [
        { code: "COSC 199", name: " Practicum (240 hours)", instructor: "TBA", grade: 'N/A' },
      ]
    },
    {
      label: "Fourth Year, First Semester",
      courses: [
        { code: "ITEC 80", name: " Human Computer Interaction", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 80", name: " Automata Theory and Formal Languages", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 105", name: " Intelligent Systems", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 111", name: " CS Elective 3 (Internet of Things)", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 200A", name: " Undergraduate Thesis 1", instructor: "TBA", grade: 'N/A' },
      ]
    },
    {
      label: "Fourth Year, Second Semester",
      courses: [
        { code: "GNED 09", name: " The Contemporary World", instructor: "TBA", grade: 'N/A' },
        { code: "GNED 10", name: " Gender and Society", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 110", name: " Numerical and Symbolic Computation", instructor: "TBA", grade: 'N/A' },
        { code: "COSC 200B", name: " Undergraduate Thesis II", instructor: "TBA", grade: 'N/A' },
      ]
    }
  ]);
  
  useEffect(() => {
    // Declare the fetchGrades function inside the useEffect to avoid issues with async/await
    const fetchGrades = async (enrollmentId) => {
      try {
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
        // console.log(updatedSemesters);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades(userId); // Call the function with userId
  }, [userId]); // Only re-run the effect if userId changes
  console.log("hi", csSemesters);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableGrades, setEditableGrades] = useState({});

  if (!student) return null;
  console.log({student});

  // Set the program and semesters based on the student's program

  // Choose the semester data based on the program
  const semesters = student.program === 'Computer Science' ? csSemesters : itSemesters;
  const currentSemester = semesters[currentIndex];

  // Handle semester navigation
  const goToNextSemester = () => {
    if (currentIndex < semesters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousSemester = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle editing grades
  const handleEditGrades = () => {
    setIsEditing(true);
    const initialGrades = {};
    currentSemester.courses.forEach(course => {
      initialGrades[course.code] = course.grade;
    });
    setEditableGrades(initialGrades);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableGrades({});
  };

  const handleUpdateGrades = () => {
    student.grades = { ...editableGrades };
    setIsEditing(false);
  };

  const handleGradeChange = (code, value) => {
    setEditableGrades(prevGrades => ({
      ...prevGrades,
      [code]: value,
    }));
  };

  return (
    <div className="pt-8 bg-green-500 min-h-screen">
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto'>
        <h2 className="text-2xl font-semibold mb-4">Student Details</h2>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Program:</strong> {student.program}</p>
        <p><strong>Year & Section:</strong> {student.year} - {student.section}</p>
        <p><strong>Status:</strong> {student.status}</p>

        {/* Navigation Row with Arrows and Year/Semester */}
        <div className="flex justify-between items-center my-6">
          <div>
            <button
              onClick={goToPreviousSemester}
              className="text-xl text-blue-500"
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="text-lg font-medium">
            <span>{currentSemester.label}</span>
          </div>
          <div>
            <button
              onClick={goToNextSemester}
              className="text-xl text-blue-500"
              disabled={currentIndex === semesters.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Course Table */}
        <div className='overflow-x-auto'>
<table className="min-w-full overflow-x-autotable-auto border-collapse">
  <thead>
    <tr>
      <th className="px-4 py-2 text-left border-b">Course Name</th>
      <th className="px-4 py-2 text-left border-b">Course Code</th>
      {/* <th className="px-4 py-2 text-left border-b">Instructor</th> */}
      <th className="px-4 py-2 text-left border-b">Grade</th>
    </tr>
  </thead>
  <tbody>
    {currentSemester.courses.map((course) => (
      <tr key={course.code}>
        <td className="px-4 py-2 border-b">{course.name}</td>
        <td className="px-4 py-2 border-b">{course.code}</td>
        {/* <td className="px-4 py-2 border-b">{course.instructor}</td> */}
        <td className="px-4 py-2 border-b">
          {isEditing ? (
            <input
              type="text"
              value={editableGrades[course.code] || ''}
              onChange={(e) => handleGradeChange(course.code, e.target.value)}
              className="border rounded px-2 py-1"
            />
          ) : (
            course.grade
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>


        {/* Edit/Cancel/Update Buttons */}
        {isEditing ? (
          <div className="mt-4">
            <button onClick={handleUpdateGrades} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update Grades</button>
            <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditGrades} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Edit Grades</button>
        )}
      </div>
    </div>
  );
};

export default GradesTabPages;