// src/Courses.jsx

import React from 'react';
import '../StudentpagesCSS/Courses.css'; // Importing CSS for styling

const Courses = () => {
  const courseData = [
    {
      name: "Linear Algebra",
      description:
        "the study of linear combinations. It is the study of vector spaces, lines and planes, and some mappings that are required to perform the linear transformations. It includes vectors, matrices and linear functions.",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      instructor: "John Doe",
    },
    {
      name: "Operating Systems",
      description:
        "The course recommends an appropriate operating system based on given  system requirements. This also covers planning and writing simple assembly-language programs  and performing a cost-benefit analysis for proposed server solutions.",
      duration: "16 weeks",
      level: "Intermediate",
      instructor: "Jane Smith",
    },
    {
      name: "Computer Visual And Computer Graphics",
      description:
        "Networks and communication involve connecting different systems and devices to share data and information.",
      duration: "8 weeks",
      level: "Intermediate to Advanced",
      instructor: "Mark Johnson",
    },
    {
      name: "Networks and Communication",
      description:
        "Understand the principles of digital marketing, including SEO, social media marketing, and content strategy.",
      duration: "6 weeks",
      level: "Beginner",
      instructor: "Emily Clark",
    },
  ];

  return (
    <div className="courses-container">
      <h1>Our Courses</h1>
      <div className="course-list">
        {courseData.map((course, index) => (
          <div key={index} className="course-card">
            <h2>{course.name}</h2>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Level:</strong> {course.level}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
