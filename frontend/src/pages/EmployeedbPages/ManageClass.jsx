import React, { useState } from "react";

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      classCode: "CS101A",
      courseName: "Introduction to Computer Science",
      courseCode: "CS101",
      instructor: "Prof. John Smith",
      year: "1st Year",
      section: "A",
      enrolledRegular: 25,
      enrolledIrregular: 5,
      students: [
        { id: 1, name: "Alice Brown", enrollmentType: "Regular" },
        { id: 2, name: "Bob Green", enrollmentType: "Irregular" },
        { id: 3, name: "Charlie Black", enrollmentType: "Regular" },
      ],
    },
    {
      id: 2,
      classCode: "IT202B",
      courseName: "Data Structures",
      courseCode: "IT202",
      instructor: "Prof. Jane Doe",
      year: "2nd Year",
      section: "B",
      enrolledRegular: 20,
      enrolledIrregular: 7,
      students: [
        { id: 4, name: "Diana White", enrollmentType: "Regular" },
        { id: 5, name: "Edward Blue", enrollmentType: "Irregular" },
        { id: 6, name: "Fiona Gray", enrollmentType: "Regular" },
      ],
    },
  ]);

  const [activeClass, setActiveClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [newClass, setNewClass] = useState({
    id: null,
    classCode: "",
    courseName: "",
    courseCode: "",
    instructor: "",
    year: "",
    section: "",
    enrolledRegular: 0,
    enrolledIrregular: 0,
    students: [],
  });

  // Handle opening and closing the modal
  const openModal = (classData) => {
    setActiveClass(classData);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setActiveClass(null);
    setIsModalOpen(false);
  };

  // Handle adding and editing a class
  const handleInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };
  const saveClass = () => {
    if (editingClass) {
      setClasses(classes.map((c) => (c.id === editingClass.id ? newClass : c)));
    } else {
      setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
    }
    setNewClass({
      id: null,
      classCode: "",
      courseName: "",
      courseCode: "",
      instructor: "",
      year: "",
      section: "",
      enrolledRegular: 0,
      enrolledIrregular: 0,
      students: [],
    });
    setEditingClass(null);
  };

  // Handle deleting a class
  const deleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Class Management</h2>
        {/* Add/Edit Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-600">
            {editingClass ? "Edit Class" : "Add New Class"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="classCode"
              placeholder="Class Code"
              value={newClass.classCode}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={newClass.courseName}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="courseCode"
              placeholder="Course Code"
              value={newClass.courseCode}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={newClass.instructor}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={newClass.year}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={newClass.section}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <button
              onClick={saveClass}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 col-span-2"
            >
              {editingClass ? "Save Changes" : "Add Class"}
            </button>
          </div>
        </div>

        {/* Table for Classes */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Class Code</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Instructor</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classData) => (
                <tr key={classData.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{classData.classCode}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.courseName}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.instructor}</td>
                  <td className="px-4 py-2 border border-gray-300 space-x-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={() => openModal(classData)}
                    >
                      View Students
                    </button>
                    <button
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      onClick={() => setEditingClass(classData)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => deleteClass(classData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Students in Class: {activeClass.classCode}
              </h3>
              <ul className="list-disc ml-6">
                {activeClass.students.map((student) => (
                  <li key={student.id}>
                    {student.name} ({student.enrollmentType})
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
