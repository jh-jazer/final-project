import React, { useState } from "react";

const SectionManagement = () => {
  const [sections, setSections] = useState([
    {
      department: "Computer Science",
      year: "1st Year",
      sections: [
        {
          id: 1,
          sectionName: "A",
          instructor: "Prof. John Smith",
          enrolledStudents: 30,
        },
        {
          id: 2,
          sectionName: "B",
          instructor: "Prof. Alice Doe",
          enrolledStudents: 28,
        },
      ],
    },
    {
      department: "Information Technology",
      year: "2nd Year",
      sections: [
        {
          id: 3,
          sectionName: "A",
          instructor: "Prof. Jane Roe",
          enrolledStudents: 35,
        },
        {
          id: 4,
          sectionName: "B",
          instructor: "Prof. Mark Lee",
          enrolledStudents: 25,
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [newSection, setNewSection] = useState({
    department: "",
    year: "",
    sectionName: "",
    instructor: "",
    enrolledStudents: 0,
  });

  // Handle modal toggling
  const openModal = (section) => {
    setActiveSection(section);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setActiveSection(null);
    setIsModalOpen(false);
  };

  // Handle input changes for new section
  const handleInputChange = (e) => {
    setNewSection({ ...newSection, [e.target.name]: e.target.value });
  };

  // Add a new section
  const addSection = () => {
    const updatedSections = [...sections];
    const departmentIndex = updatedSections.findIndex(
      (dep) =>
        dep.department === newSection.department &&
        dep.year === newSection.year
    );

    if (departmentIndex !== -1) {
      updatedSections[departmentIndex].sections.push({
        ...newSection,
        id: Date.now(),
      });
    } else {
      updatedSections.push({
        department: newSection.department,
        year: newSection.year,
        sections: [{ ...newSection, id: Date.now() }],
      });
    }

    setSections(updatedSections);
    setNewSection({
      department: "",
      year: "",
      sectionName: "",
      instructor: "",
      enrolledStudents: 0,
    });
  };

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Section Management</h2>

        {/* Add Section Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-600">Add New Section</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="department"
              placeholder="Department (e.g., Computer Science)"
              value={newSection.department}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="year"
              placeholder="Year (e.g., 1st Year)"
              value={newSection.year}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="sectionName"
              placeholder="Section Name (e.g., A)"
              value={newSection.sectionName}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor Name"
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
            <button
              onClick={addSection}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 col-span-2"
            >
              Add Section
            </button>
          </div>
        </div>

        {/* Section Table */}
        {sections.map((department) => (
          <div key={department.department} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-600">
              {department.department} - {department.year}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left border border-gray-300">
                      Section Name
                    </th>
                    <th className="px-4 py-2 text-left border border-gray-300">
                      Instructor
                    </th>
                    <th className="px-4 py-2 text-left border border-gray-300">
                      Enrolled Students
                    </th>
                    <th className="px-4 py-2 text-left border border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {department.sections.map((section) => (
                    <tr key={section.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">
                        {section.sectionName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {section.instructor}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {section.enrolledStudents}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 space-x-2">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          onClick={() => openModal(section)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && activeSection && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Section Details: {activeSection.sectionName}
              </h3>
              <p>Instructor: {activeSection.instructor}</p>
              <p>Enrolled Students: {activeSection.enrolledStudents}</p>
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

export default SectionManagement;
