import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const SectionManagement = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      department: "Computer Science",
      sectionCode: "CS101A",
      instructor: "Prof. John Smith",
      enrolledStudents: 30,
      students: [
        { id: 1, name: "Alice Brown", program: "Computer Science" },
        { id: 2, name: "Bob Green", program: "Computer Science" },
      ],
    },
    {
      id: 2,
      department: "Information Technology",
      sectionCode: "IT202B",
      instructor: "Prof. Jane Doe",
      enrolledStudents: 25,
      students: [
        { id: 3, name: "Diana White", program: "Information Technology" },
        { id: 4, name: "Edward Blue", program: "Information Technology" },
      ],
    },
  ]);

  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [newSection, setNewSection] = useState({
    id: null,
    department: "",
    sectionCode: "",
    instructor: "",
    enrolledStudents: 0,
    students: [],
  });

  const openModal = (sectionData) => {
    setActiveSection(sectionData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveSection(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (sectionData) => {
    setSectionToDelete(sectionData);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSectionToDelete(null);
    setShowDeleteModal(false);
  };
  const handleStudentInputChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const [studentForm, setStudentForm] = useState({ name: "", program: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  // Add or Edit Student
  const addStudent = () => {
    if (studentForm.name && studentForm.program) {
      const newStudent = {
        id: activeSection.students.length + 1,
        name: studentForm.name,
        program: studentForm.program,
      };
      const updatedSection = {
        ...activeSection,
        students: [...activeSection.students, newStudent],
      };
      setSections(sections.map((section) => (section.id === activeSection.id ? updatedSection : section)));
      setStudentForm({ name: "", program: "" });
    }
  };


  const startEditingStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({ name: student.name, program: student.program });
  };

  const saveStudentEdit = () => {
    if (editingStudent) {
      const updatedStudents = activeSection.students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, name: studentForm.name, program: studentForm.program }
          : student
      );
      const updatedSection = { ...activeSection, students: updatedStudents };
      setSections(sections.map((section) => (section.id === activeSection.id ? updatedSection : section)));
      setEditingStudent(null);
      setStudentForm({ name: "", program: "" });
    }
  };

  const deleteStudent = (studentId) => {
    const updatedStudents = activeSection.students.filter((student) => student.id !== studentId);
    const updatedSection = { ...activeSection, students: updatedStudents };
    setSections(sections.map((section) => (section.id === activeSection.id ? updatedSection : section)));
  };

  const handleInputChange = (e) => {
    setNewSection({ ...newSection, [e.target.name]: e.target.value });
  };

  const saveSection = () => {
    if (editingSection) {
      setSections(sections.map((s) => (s.id === editingSection.id ? newSection : s)));
    } else {
      setSections([...sections, { ...newSection, id: sections.length + 1 }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setNewSection({
      id: null,
      department: "",
      sectionCode: "",
      instructor: "",
      enrolledStudents: 0,
      students: [],
    });
    setEditingSection(null);
  };

  const deleteSection = () => {
    setSections(sections.filter((s) => s.id !== sectionToDelete.id));
    closeDeleteModal();
  };

  const startEditing = (sectionData) => {
    setEditingSection(sectionData);
    setNewSection({ ...sectionData });
  };

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Section Management</h2>

        {/* Add/Edit Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-600">
            {editingSection ? "Edit Section" : "Add New Section"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newSection.department}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="sectionCode"
              placeholder="Section Code"
              value={newSection.sectionCode}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={newSection.instructor}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="number"
              name="enrolledStudents"
              placeholder="Enrolled Students"
              value={newSection.enrolledStudents}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <div className="col-span-2 flex gap-4">
              <button
                onClick={saveSection}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {editingSection ? "Save Changes" : "Add Section"}
              </button>
              {editingSection && (
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
                <th className="px-4 py-2 text-left border border-gray-300">Department</th>
                <th className="px-4 py-2 text-left border border-gray-300">Section Code</th>
                <th className="px-4 py-2 text-left border border-gray-300">Instructor</th>
                <th className="px-4 py-2 text-left border border-gray-300">Enrolled Students</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{section.department}</td>
                  <td className="px-4 py-2 border border-gray-300">{section.sectionCode}</td>
                  <td className="px-4 py-2 border border-gray-300">{section.instructor}</td>
                  <td className="px-4 py-2 border border-gray-300">{section.enrolledStudents}</td>
                  <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                    <button onClick={() => openModal(section)}>
                      <EyeIcon className="h-6 w-6 text-green-500" />
                    </button>
                    <button onClick={() => startEditing(section)}>
                      <PencilSquareIcon className="h-6 w-6 text-yellow-500" />
                    </button>
                    <button onClick={() => openDeleteModal(section)}>
                      <TrashIcon className="h-6 w-6 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        {/* Modal for Viewing and Managing Students */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-semibold mb-4">
                Students in Section: {activeSection.sectionCode}
              </h3>

              {/* Student Form for Adding or Editing */}
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={handleStudentInputChange}
                  placeholder="Student Name"
                  className="border px-3 py-2 rounded-md w-full mb-2"
                />
                <input
                  type="text"
                  name="program"
                  value={studentForm.program}
                  onChange={handleStudentInputChange}
                  placeholder="Program"
                  className="border px-3 py-2 rounded-md w-full"
                />
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={editingStudent ? saveStudentEdit : addStudent}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    {editingStudent ? "Save" : "Add Student"}
                  </button>
                  {editingStudent && (
                    <button
                      onClick={() => {
                        setEditingStudent(null);
                        setStudentForm({ name: "", program: "" });
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Students List in Table Format */}
              <table className="min-w-full table-auto border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border border-gray-300">Student Name</th>
                    <th className="px-4 py-2 border border-gray-300">Program</th>
                    <th className="px-4 py-2 border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSection.students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                      <td className="px-4 py-2 border border-gray-300">{student.program}</td>
                      <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                        <button
                          onClick={() => startEditingStudent(student)}
                          className="text-yellow-500"
                        >
                          <PencilSquareIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="text-red-500"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
                <p>Are you sure you want to delete this section?</p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={deleteSection}
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

export default SectionManagement;
