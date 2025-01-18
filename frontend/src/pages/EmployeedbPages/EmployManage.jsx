import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const apiRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    return response.json();
  } catch (error) {
    console.error('Error with API request:', error);
    throw new Error('API request failed');
  }
};

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 25;
  const [showPassword, setShowPassword] = useState(false);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      student_id: '',
      full_name: '',
      student_type: '',
      program_id: '', // Change to program_id
      email: '',
      semester: '',
      dob: '',
      class_section: '',
      status: '',
      password: '',
      enrollment_id: '', // Added enrollment_id field
    });
    

        // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

     useEffect(() => {
        if (statusMessage) {
          const timer = setTimeout(() => {
            setStatusMessage(''); // Clears the status message after 5 seconds
          }, 5000);
    
          // Cleanup the timeout if the component unmounts or the message changes
          return () => clearTimeout(timer);
        }
      }, [statusMessage]);
    
      const closeModal = () => {
        setModalOpen(false);
        setLoading(false);

      };
      const openModal = (enrollment_id) => {
        // Initialize form for adding a new student
        setFormData({
          student_id: '',
          full_name: '',
          student_type: '',
          program_id: '', // Set program_id to an empty string
          email: '',
          semester: '',
          dob: '',
          class_section: '',
          status: '',
          password: '',
          enrollment_id: enrollment_id, // Added enrollment_id field
        });
        setModalOpen(true); // Open the modal
      };
      
        useEffect(() => {
          fetchApplications();
        }, []);

        // Fetch all applications data from the backend
        const fetchApplications = async () => {
          try {
            const response = await fetch('http://localhost:5005/api/manage-application');
            if (!response.ok) {
              throw new Error('Failed to fetch applications');
            }
            const data = await response.json();
            setApplications(data);
          } catch (error) {
            console.error('Error fetching applications:', error);
          }
        };

        const handleEdit = (application) => {
          setEditingId(application.id);
          setEditedFields({ ...application }); // Initialize edited fields with current row data
        };

        const handleFieldChange = (field, value) => {
          setEditedFields((prev) => ({ ...prev, [field]: value }));
        };

        
    useEffect(() => {
      // Conditionally set semester options based on the selected program_id
      if (formData.program_id === 1) {
        setSemesterOptions([
          { value: 1, label: 'First Year, First Semester' },
          { value: 2, label: 'First Year, Second Semester' },
          { value: 3, label: 'Second Year, First Semester' },
          { value: 4, label: 'Second Year, Second Semester' },
          { value: 5, label: 'Third Year, First Semester' },
          { value: 6, label: 'Third Year, Second Semester' },
          { value: 7, label: 'Third Year, Mid Year' },
          { value: 8, label: 'Fourth Year, First Semester' },
          { value: 9, label: 'Fourth Year, Second Semester' },
        ]);
      } else if (formData.program_id === 2) {
        setSemesterOptions([
          { value: 10, label: 'First Year, First Semester' },
          { value: 11, label: 'First Year, Second Semester' },
          { value: 12, label: 'Second Year, First Semester' },
          { value: 13, label: 'Second Year, Second Semester' },
          { value: 14, label: 'Second Year, Mid Year' },
          { value: 15, label: 'Third Year, First Semester' },
          { value: 16, label: 'Third Year, Second Semester' },
          { value: 17, label: 'Fourth Year, First Semester' },
          { value: 18, label: 'Fourth Year, Second Semester' },
        ]);
      } else {
        setSemesterOptions([]); // Clear options if no program_id is selected
      }
    }, [formData.program_id]);
    

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/applicant_progress/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedFields), // Send edited fields
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update application');
      }

      const result = await response.json();
      console.log(result.message);

      // Update frontend state after successful save
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === editingId ? { ...application, ...editedFields } : application
        )
      );

      setEditingId(null); // Exit edit mode
      setEditedFields({});
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // If a password is provided, hash it; if not, skip hashing
    const hashedPassword = formData.password
      ? await bcrypt.hash(formData.password, 10)
      : null;
  
    // Create the payload with form data
    const payload = { ...formData };
    if (hashedPassword) {
      payload.password = hashedPassword; // Include hashed password
    } else {
      delete payload.password; // Remove password field if it's empty
    }
  
    // Ensure the date of birth is properly formatted
    const formattedDob = new Date(formData.dob).toISOString().slice(0, 10);
    payload.dob = formattedDob;
  
    const url = 'http://localhost:5005/api/students'; // URL for creating a new student
    const method = 'POST'; // Use POST for new student creation
  
    try {
      // Create the student record
      await apiRequest(url, method, payload);
  
      // Update the student_enrollment status in applicant_progress table
      const updateProgressPayload = {
        student_enrollment: 'approved',
      };
      const progressUrl = `http://localhost:5005/api/applicant-progress/${formData.enrollment_id}`; // API endpoint to update applicant progress
      await apiRequest(progressUrl, 'PUT', updateProgressPayload);
  
      setStatusMessage('Applicant Enrolled Successfully');
      setModalOpen(false); // Close the modal after successful action
  
      // Update the students state locally
      setStudents((prevStudents) => {
        return [...prevStudents, payload]; // Add new student to the list
      });
    } catch (error) {
      setStatusMessage('Error saving data'); // Show error message if API request fails
    }
  };
  

  const paginateApplications = (applications) => {
    const startIndex = (currentPage - 1) * applicationsPerPage;
    const endIndex = startIndex + applicationsPerPage;
    return applications.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const filteredApplications = applications.filter((application) =>
    application.student_enrollment !== "approved" &&
    application.enrollment_id &&
    application.enrollment_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Application</h2>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md w-full"
            placeholder="Search by Enrollment ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table for Applications */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">
                Enrollment<br />ID
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Docs<br />Verification
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Evaluation<br />Assessment
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Docs<br />Submission
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Society<br />Payment
              </th>
              <th className="px-4 py-2 text-left border border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
            <tbody>
              {paginateApplications(filteredApplications).map((application) => (
                <tr key={application.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{application.enrollment_id}</td>
                  {['docs_verification', 'eval_assessment', 'docs_submission', 'society_payment'].map(
                    (field) => (
                      <td key={field} className="px-4 py-2 border border-gray-300">
                        {editingId === application.id ? (
                          <select
                            value={editedFields[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                          </select>
                        ) : (
                          application[field]
                        )}
                      </td>
                    )
                  )}
                  <td className="px-4 py-2 border border-gray-300">
                    {editingId === application.id ? (
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(application)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => openModal(application.enrollment_id)}
                      disabled={
                        application.docs_verification !== 'approved' ||
                        application.eval_assessment !== 'approved' ||
                        application.docs_submission !== 'approved' ||
                        application.society_payment !== 'approved'
                      }
                      className={`ml-2 px-4 py-1 rounded-md ${
                        application.docs_verification === 'approved' &&
                        application.eval_assessment === 'approved' &&
                        application.docs_submission === 'approved' &&
                        application.society_payment === 'approved'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      }`}
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

          {/* Modal for adding/editing a student */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl  ml-[250px] w-full">
              <h3 className="text-xl mb-4">Enroll Applicant</h3>
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <input
                    type="text"
                    placeholder="Enrollment ID"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.enrollment_id}
                    onChange={(e) => setFormData({ ...formData, enrollment_id: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Student ID"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.student_id}
                    onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                  <select
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.student_type}
                    onChange={(e) => setFormData({ ...formData, student_type: e.target.value })}
                    required
                  >
                    <option value="">Select Student Type</option>
                    <option value="Regular">Regular</option>
                    <option value="Irregular">Irregular</option>
                  </select>
                  <select
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.program_id}
                    onChange={(e) => setFormData({ ...formData, program_id: parseInt(e.target.value, 10) })}
                    required
                  >
                    <option value="">Select Student Program</option>
                    <option value="1">BSCS</option>
                    <option value="2">BSIT</option>
                  </select>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <select
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value, 10) })}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Class Section"
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.class_section}
                    onChange={(e) => setFormData({ ...formData, class_section: e.target.value })}
                    required
                  />
                  <select
                    className="w-full px-4 py-2 mb-2 border"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                  >
                    <option value="">Select Account Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="w-full px-4 py-2 mb-2 border"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-4 col-span-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-md ${
                      loading ? "bg-blue-400" : "bg-blue-500"
                    } text-white flex items-center justify-center`}
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Enroll Applicant"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Prev
          </button>
          <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageApplication;
