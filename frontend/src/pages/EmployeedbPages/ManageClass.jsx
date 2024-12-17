import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
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

  const openModal = (classData) => {
    setActiveClass(classData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveClass(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (classData) => {
    setClassToDelete(classData); // Correctly setting the class to delete
    setShowDeleteModal(true);    // Show the delete modal
  };

  const closeDeleteModal = () => {
    setClassToDelete(null);
    setShowDeleteModal(false);  // Correcting the state variable here
  };

  const handleInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const saveClass = () => {
    if (editingClass) {
      setClasses(classes.map((c) => (c.id === editingClass.id ? newClass : c)));
    } else {
      setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
    }
    resetForm();
  };

  const resetForm = () => {
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

  const deleteClass = () => {
    setClasses(classes.filter((c) => c.id !== classToDelete.id));
    closeDeleteModal();
  };

  const startEditing = (classData) => {
    setEditingClass(classData);
    setNewClass({ ...classData });
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
            <div className="col-span-2 flex gap-4">
              <button
                onClick={saveClass}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {editingClass ? "Save Changes" : "Add Class"}
              </button>
              {editingClass && (
                <button
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Class Code</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course Code</th>
                <th className="px-4 py-2 text-left border border-gray-300">Instructor</th>
                <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                <th className="px-4 py-2 text-left border border-gray-300">Section</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classData) => (
                <tr key={classData.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{classData.classCode}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.courseName}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.courseCode}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.instructor}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.year}</td>
                  <td className="px-4 py-2 border border-gray-300">{classData.section}</td>
                  <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                    <button onClick={() => openModal(classData)}>
                      <EyeIcon className="h-6 w-6 text-green-500" />
                    </button>
                    <button onClick={() => startEditing(classData)}>
                      <PencilSquareIcon className="h-6 w-6 text-yellow-500" />
                    </button>
                    <button onClick={() => openDeleteModal(classData)}>
                      <TrashIcon className="h-6 w-6 text-red-500" />
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

        {/* Animated Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-md p-6 space-y-4"
              >
                <h3 className="text-lg text-center font-semibold">Confirm Deletion</h3>
                <p>Are you sure you want to delete this class?</p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={deleteClass}
                  >
                    Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClassManagement;
