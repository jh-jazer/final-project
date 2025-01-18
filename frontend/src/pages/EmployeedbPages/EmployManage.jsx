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
  const [activeTab, setActiveTab] = useState('General');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [enrollmentInfo, setEnrollmentInfo] = useState(null); // State for personal info
  const [personalInfo, setPersonalInfo] = useState(null); // State for personal info
  const [familyInfo, setFamilyInfo] = useState(null); // State for family info
  const [educationalInfo, setEducationalInfo] = useState(null); // State for family info
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

    
  // Full names mapping for display
  const fullNames = {
    als: "Alternative Learning System (ALS) Passer",
    foreign: "Foreign Undergraduate Student Applicant",
    shs: "Senior High School Graduate",
    grade12: "Currently Enrolled Grade 12 Student",
    bachelors: "Bachelor's Degree Graduate",
    transferee: "Transferee",
    stem: "Science, Technology, Engineering, and Mathematics (STEM)",
    abm: "Accountancy, Business, and Management (ABM)",
    humss: "Humanities and Social Sciences (HUMSS)",
    gas: "General Academic Strand (GAS)",
    afa: "Agri-Fishery Arts (AFA)",
    he: "Home Economics (HE)",
    ia: "Industrial Arts (IA)",
    ict: "Information and Communications Technology (ICT)",
    ad: "Arts and Design",
    sports: "Sports",
    it: "Bachelor of Science in Information Technology",
    cs: "Bachelor of Science in Computer Science",
  };

  // Rewrite getSemesterLabel to use the semesterMapping
const getFullName = (Value) => {
  return fullNames[Value] || 'Unknown Semester';
};

    
  const handleRowClick = (application) => {
    setSelectedStudent(application);
    if (application.enrollment_id) {
      // Fetch both Personal Info and Family Info when a student is selected
      fetchEnrollmentInfo(application.enrollment_id);
      fetchPersonalInfo(application.enrollment_id);
      fetchFamilyInfo(application.enrollment_id);
      fetchEducationalInfo(application.enrollment_id);

    }
  };
  
  const fetchPersonalInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getPersonalInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch personal data");
      }
  
      const data = await response.json();
  
      // Format date fields if present
      const formattedData = {
        ...data,
        dob: data.dob ? formatDateForInput(data.dob) : "",
      };
  
      setPersonalInfo(formattedData);
    } catch (error) {
      console.error("Error fetching personal data:", error);
      setPersonalInfo(null); // Clear previous data on error
    }
  };

  
  const fetchEnrollmentInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/getEnrollmentInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch family information');
      }
  
      const data = await response.json();
  
      setEnrollmentInfo(data); // Store the fetched family information
    } catch (error) {
      console.error("Error fetching family info:", error);
      setEnrollmentInfo(null); // Clear previous data on error
    }
  };
  
  const fetchFamilyInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getFamilyInfo?enrollment_id=${enrollment_id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch family information');
      }
  
      const data = await response.json();
  
      setFamilyInfo(data); // Store the fetched family information
    } catch (error) {
      console.error("Error fetching family info:", error);
      setFamilyInfo(null); // Clear previous data on error
    }
  };

  const fetchEducationalInfo = async (enrollment_id) => {
    try {
      const response = await fetch(
        `https://cvsu-backend-system.vercel.app/api/getEducationInfo?enrollment_id=${enrollment_id}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch family information');
      }
  
      const data = await response.json();
  
      setEducationalInfo(data); // Store the fetched family information
    } catch (error) {
      console.error("Error fetching family info:", error);
      setEducationalInfo(null); // Clear previous data on error
    }
  };
  
    

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

    const openModal = async (enrollment_id) => {
  try {
    // Fetch student personal info based on the enrollment_id
    const response = await fetch(
      `https://cvsu-backend-system.vercel.app/api/getPersonalInfo?enrollment_id=${enrollment_id}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch student personal info');
    }

    const data = await response.json();

    // Construct the full name from the response
    const fullName = `${data.familyName}, ${data.givenName} ${data.middleName || ''}`.trim();

    // Initialize form with fetched full name and enrollment_id
    setFormData({
      student_id: '',
      full_name: fullName, // Set the full name from the fetched data
      student_type: '',
      program_id: '', // Set program_id to an empty string
      email: '',
      semester: '',
      dob: '',
      class_section: '',
      status: '',
      password: '',
      enrollment_id: enrollment_id, // Keep the enrollment_id
    });

    setModalOpen(true); // Open the modal
  } catch (error) {
    console.error('Error fetching personal info:', error);
    // Optionally display an error message or handle the error as needed
  }
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

    const formatDateForInput = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    };
    

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
    <div className="p-6 bg-gradient-to-r from-green-800 to-green-500 min-h-screen">
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
                <tr key={application.id} 
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(application)}
                >
                  <td className="px-4 py-2 border border-gray-300">{application.enrollment_id}</td>
                  {['docs_verification', 'eval_assessment', 'docs_submission', 'society_payment'].map(
                    (field) => (
                      <td key={field} className="px-4 py-2 border border-gray-300">
                        {editingId === application.id ? (
                          <select
                            value={editedFields[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            onClick={(e) => e.stopPropagation()} // Prevent row click
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
      onClick={(e) => {
        e.stopPropagation(); // Prevent the row's onClick
        handleSave();
      }}
      className="bg-blue-500 text-white px-4 py-1 rounded-md"
    >
      Save
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent the row's onClick
        handleEdit(application);
      }}
      className="bg-yellow-500 text-white px-4 py-1 rounded-md"
    >
      Edit
    </button>
  )}
  <button
    onClick={(e) => {
      e.stopPropagation(); // Prevent the row's onClick
      openModal(application.enrollment_id);
    }}
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


        {/* Student Detail Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 h-[90%] rounded-lg shadow-lg relative overflow-hidden"
              style={{ marginLeft: '250px' }}> {/* Adjust this value based on the sidebar's width */}
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => {
                  setSelectedStudent(null);
                  setPersonalInfo(null);
                }}
              >
                ✕
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-6 text-white">
                <h2 className="text-2xl font-semibold">Student Details</h2>
                <p className="text-sm opacity-90">Manage and review information for {selectedStudent.full_name}</p>
              </div>

              {/* Tab Navigation */}
              <div className="flex justify-between bg-gray-100 px-6 py-3 border-b">
                {['General', 'Personal', 'Family', 'Educational', 'Documents'].map((tab, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-t-md ${activeTab === tab ? 'bg-white border-t-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 overflow-y-auto h-[calc(100%-150px)]">

                {activeTab === 'General' && enrollmentInfo ? (

                  <>
                  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">General Information</h3>
                  <div className="grid grid-cols-1 text-center gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="mb-2 text-gray-700"><strong>Enrollment ID:</strong> {enrollmentInfo.enrollment_id}</p>
                      <p className="mb-2 text-gray-700"><strong>Applicant Type:</strong> {getFullName(enrollmentInfo.applicant_type)}</p>
                      <p className="mb-2 text-gray-700"><strong>Email:</strong> {enrollmentInfo.email}</p>
                      <p className="mb-2 text-gray-700"><strong>Preferred Program :</strong> {enrollmentInfo.preferred_program}</p>
                      <p className="mb-2 text-gray-700"><strong>Senior High Track:</strong> {enrollmentInfo.senior_high_track}</p>
                      <p className="mb-2 text-gray-700"><strong>Strand:</strong> {getFullName(enrollmentInfo.strand)}</p>
                    </div>
                  </div>
                </>
                
              ) : (
                activeTab === 'General' && <p className="text-gray-500">Loading personal information...</p>
              )}

                {activeTab === 'Personal' && personalInfo ? (
                 <>
                 <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">Personal Information</h3>
                 <div className="grid grid-cols-1 text-center  gap-6">
                   <div className="bg-white p-4 rounded-lg shadow-md">
                     <p className="mb-2 text-gray-700"><strong>Full Name:</strong> {personalInfo.familyName}, {personalInfo.givenName} {personalInfo.middleName}</p>
                     <p className="mb-2 text-gray-700"><strong>LRN:</strong> {personalInfo.lrn}</p>
                     <p className="mb-2 text-gray-700"><strong>Sex</strong> {personalInfo.sex}</p>
                     <p className="mb-2 text-gray-700"><strong>Birthday:</strong> {personalInfo.dob}</p>
                     <p className="mb-2 text-gray-700"><strong>Civil Status:</strong> {personalInfo.civilStatus}</p>
                     <p className="mb-2 text-gray-700"><strong>Religion:</strong> {personalInfo.religion}</p>
                     <p className="mb-2 text-gray-700"><strong>Contact Number:</strong> {personalInfo.contactNumber}</p>
                     <p className="mb-2 text-gray-700">
                       <strong>Address:</strong> {personalInfo.houseNumber} {personalInfo.streetAddress},
                       {personalInfo.municipality}, {personalInfo.province}, {personalInfo.zipCode},
                       {personalInfo.country}
                     </p>
                   </div>
                 </div>
               </>
               
                ) : (
                  activeTab === 'Personal' && <p className="text-gray-500">Loading personal information...</p>
                )}

                    {activeTab === 'Family' && familyInfo ? (
                      <>
                        <h3 className="text-xl font-semibold text-center mb-4">Family Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Father Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Father's Name:</strong> {familyInfo.fatherName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Father's Occupation:</strong> {familyInfo.fatherOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Father's Contact:</strong> {familyInfo.fatherContact || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Is Father Not Applicable:</strong> {familyInfo.isFatherNotApplicable ? "Yes" : "No"}</p>
                          </div>

                          {/* Mother Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Mother's Name:</strong> {familyInfo.motherName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Mother's Occupation:</strong> {familyInfo.motherOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Mother's Contact:</strong> {familyInfo.motherContact || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Is Mother Not Applicable:</strong> {familyInfo.isMotherNotApplicable ? "Yes" : "No"}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          {/* Guardian Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Guardian's Name:</strong> {familyInfo.guardianName || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Guardian's Occupation:</strong> {familyInfo.guardianOccupation || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Guardian's Contact:</strong> {familyInfo.guardianContact || "Not provided"}</p>
                          </div>

                          {/* Siblings Information */}
                          <div className="bg-white p-4 rounded-lg shadow-md">
                            <p className="mb-2 text-gray-700"><strong>Number of Siblings:</strong> {familyInfo.numOfSiblings || "Not provided"}</p>
                            <p className="mb-2 text-gray-700"><strong>Family's Annual Income:</strong> {familyInfo.familyIncome || "Not provided"}</p>
                          </div>
                        </div>

                      </>
                    ) : (
                      activeTab === 'Family' && <p className="text-gray-500">Loading family information...</p>
                    )}


                  {activeTab === 'Educational' && educationalInfo ? (
                    <>
                      <h3 className="text-xl font-semibold mb-4">Educational Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Elementary School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>Elementary School Name:</strong> {educationalInfo.elementarySchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Elementary School Address:</strong> {educationalInfo.elementarySchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Elementary School Year Graduated:</strong> {educationalInfo.elementarySchoolYearGraduated || "Not provided"}</p>
                        </div>

                        {/* High School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>High School Name:</strong> {educationalInfo.highSchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>High School Address:</strong> {educationalInfo.highSchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>High School Year Graduated:</strong> {educationalInfo.highSchoolYearGraduated || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Senior High School Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>Senior High School Name:</strong> {educationalInfo.seniorHighSchoolName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Senior High School Address:</strong> {educationalInfo.seniorHighSchoolAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>Senior High School Year Graduated:</strong> {educationalInfo.seniorHighSchoolYearGraduated || "Not provided"}</p>
                        </div>

                        {/* College Information */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                          <p className="mb-2 text-gray-700"><strong>College Name:</strong> {educationalInfo.collegeName || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>College Address:</strong> {educationalInfo.collegeAddress || "Not provided"}</p>
                          <p className="mb-2 text-gray-700"><strong>College Year Graduated:</strong> {educationalInfo.collegeYearGraduated || "Not provided"}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    activeTab === 'Educational' && <p className="text-gray-500">Loading educational information...</p>
                  )}



                {activeTab === 'Documents' && (
                  <>
                    <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                    <p className="mb-2 text-gray-500 italic">This section can contain custom data about the student, such as academic achievements, extracurricular activities, or disciplinary actions.</p>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-100 p-4 border-t flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  onClick={() => {
                    setSelectedStudent(null);
                    setPersonalInfo(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default ManageApplication;
