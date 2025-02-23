import React, { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [activeInstructor, setActiveInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [newInstructor, setNewInstructor] = useState({
    id: null,
    instructor_name: "",
    department: "",
    email: "",
    phone: "",
    courses: "",
  });

  // Fetch instructors from the backend
  const fetchInstructors = async () => {
    try {
      const response = await fetch('https://cvsu-backend-system.vercel.app/api/get_instructor_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setInstructors(data.instructors);
      } else {
        console.error("Error fetching instructors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };
  useEffect(() => {
    fetchInstructors();
  }, []); // Runs only once after the initial render
  
  const openModal = (instructorData) => {
    setActiveInstructor(instructorData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveInstructor(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (instructorData) => {
    setInstructorToDelete(instructorData); // Correctly setting the instructor to delete
    setShowDeleteModal(true); // Show the delete modal
  };

  const closeDeleteModal = () => {
    setInstructorToDelete(null);
    setShowDeleteModal(false); // Correcting the state variable here
  };

  const handleInputChange = (e) => {
  setNewInstructor((prevInstructor) => ({
    ...prevInstructor,
    [e.target.name]: e.target.value
  }));
};


  const saveInstructor = async (newInstructor) => {
    try {
      if (editingInstructor) {
        // Making API call to update the instructor
        const response = await fetch(`https://cvsu-backend-system.vercel.app/api/update_instructor`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstructor),
        });
        
        if (!response.ok) {
            throw new Error("Failed to update instructor");
          }
          
          const updatedInstructor = await response.json();
          
          // Update the local state with the updated instructor
          await fetchInstructors();
          
      } else {
        // Making API call to add a new instructor
        const response = await fetch("https://cvsu-backend-system.vercel.app/api/add_instructor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInstructor),
        });
  
        if (!response.ok) {
          throw new Error("Failed to add instructor");
        }
  
        const addedInstructor = await response.json();
  
        // Update the local state with the new instructor
        setInstructors([...instructors, addedInstructor]);
        console.log("Added instructor:", addedInstructor);
      }
  
      // Reset the form
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const resetForm = () => {
    setNewInstructor({
      id: null,
      name: "",
      department: "",
      email: "",
      phone: "",
      courses: [],
    });
    setEditingInstructor(null);
  };

  const deleteInstructor = async () => {
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/delete_instructor?id=${instructorToDelete.instructor_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log("Instructor deleted successfully");
  
        // Refresh the instructor list and close the modal
        await fetchInstructors();
        closeDeleteModal();
      } else {
        const data = await response.json();
        console.error("Error deleting instructor:", data.message);
      }
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };
  
  
  
  

  const startEditing = (instructorData) => {
    setEditingInstructor(instructorData);
    setNewInstructor({ ...instructorData });
  };

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Instructor Management</h2>

        {/* Add/Edit Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-600">
            {editingInstructor ? "Edit Instructor" : "Add New Instructor"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="instructor_name"
              placeholder="Instructor Name"
              value={newInstructor.instructor_name}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newInstructor.department}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newInstructor.email}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={newInstructor.phone}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="courses"
              placeholder="Courses (comma separated)"
              value={newInstructor.courses}
              onChange={(e) => handleInputChange({ target: { name: "courses", value: e.target.value } })}
              className="border px-3 py-2 rounded-md"
            />
            <div className="col-span-2 flex gap-4">
              <button
                onClick={() => saveInstructor(newInstructor)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {editingInstructor ? "Save Changes" : "Add Instructor"}
              </button>
              {editingInstructor && (
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
                <th className="px-4 py-2 text-left border border-gray-300">Instructor Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Department</th>
                <th className="px-4 py-2 text-left border border-gray-300">Email</th>
                <th className="px-4 py-2 text-left border border-gray-300">Phone</th>
                <th className="px-4 py-2 text-left border border-gray-300">Courses</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructorData) => (
                <tr key={instructorData.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{instructorData.instructor_name}</td>
                  <td className="px-4 py-2 border border-gray-300">{instructorData.department}</td>
                  <td className="px-4 py-2 border border-gray-300">{instructorData.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{instructorData.phone}</td>
                  <td className="px-4 py-2 border border-gray-300">{instructorData.courses}</td>
                  <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                    <button onClick={() => openModal(instructorData)}>
                      <EyeIcon className="h-6 w-6 text-green-500" />
                    </button>
                    <button onClick={() => startEditing(instructorData)}>
                      <PencilSquareIcon className="h-6 w-6 text-yellow-500" />
                    </button>
                    <button onClick={() => openDeleteModal(instructorData)}>
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
                Instructor: {activeInstructor.name}
              </h3>
              <ul className="list-disc ml-6">
                <li>Department: {activeInstructor.department}</li>
                <li>Email: {activeInstructor.email}</li>
                <li>Phone: {activeInstructor.phone}</li>
                <li>
                  Courses: {activeInstructor.courses}
                </li>
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
                <p>Are you sure you want to delete this instructor?</p>
                <div className="flex space-x-4 justify-center">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={deleteInstructor}
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

export default InstructorManagement;
