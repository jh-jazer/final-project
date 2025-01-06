import React, { useState, useEffect } from 'react';

const StudentInformation = () => {
  // Sample data to simulate all student information
  const [students, setStudents] = useState([
    // Enrolled Students
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '09123456789',
      address: '123 Main St, Cavite',
      year: '3rd Year',
      section: 'A',
      course: 'Computer Science',
      enrollmentStatus: 'Enrolled',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '09123456788',
      address: '456 Oak St, Cavite',
      year: '2nd Year',
      section: 'B',
      course: 'Information Technology',
      enrollmentStatus: 'Graduated',
    },
  ]);
  
  const [applicants, setApplicants] = useState([
    {
      applicantId: 1,
      applicantName: 'Emily Johnson',
      applicantType: 'Transfer',
      preferredPrograms: 'Computer Science, Software Engineering',
      proofOfRequirements: 'Completed',
      enrollmentStatus: 'Applicant',
    },
    {
      applicantId: 2,
      applicantName: 'Michael Brown',
      applicantType: 'Freshman',
      preferredPrograms: 'Information Technology',
      proofOfRequirements: 'Pending',
      enrollmentStatus: 'Applicant',
    },
  ]);

  const [activeTab, setActiveTab] = useState('Applicants');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Separate states for filtered data
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [filteredEnrolled, setFilteredEnrolled] = useState([]);
  const [filteredGraduated, setFilteredGraduated] = useState([]);

  // Filter applicants, enrolled, and graduated students based on search term
  const filterData = () => {
    // Filter applicants based on search term
    const filteredApplicants = applicants.filter(
      (applicant) =>
        applicant.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.phone?.includes(searchTerm)
    );

    // Filter students based on search term
    const filteredEnrolled = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.includes(searchTerm)
    );
    
    // Filter graduated students based on search term
    const filteredGraduated = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.phone?.includes(searchTerm)
    );

    // Set filtered data based on active tab
    setFilteredApplicants(filteredApplicants);
    setFilteredEnrolled(filteredEnrolled.filter((student) => student.enrollmentStatus === 'Enrolled'));
    setFilteredGraduated(filteredGraduated.filter((student) => student.enrollmentStatus === 'Graduated'));
  };

  // Trigger filter function when searchTerm or any of the data changes
  useEffect(() => {
    filterData();
  }, [searchTerm, students, applicants]);

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-full sm:max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Student Information</h2>

        {/* Search bar */}
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md w-full mb-4"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tabs for Applicant, Enrolled, and Alumni */}
        <div className="mb-4 flex flex-wrap">
          <div className="space-x-1 sm:space-x-6 md:space-x-8">
            <button
              onClick={() => setActiveTab('Applicants')}
              className={`${activeTab === 'Applicants' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-4 py-2 flex-wrap`}
            >
              Applicants
            </button>
            <button
              onClick={() => setActiveTab('Enrolled')}
              className={`${activeTab === 'Enrolled' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-4 py-2 flex-wrap`}
            >
              Enrolled Students
            </button>
            <button
              onClick={() => setActiveTab('Graduated')}
              className={`${activeTab === 'Graduated' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-4 py-2 flex-wrap`}
            >
              Alumni
            </button>
          </div>
        </div>

        {/* Table for Applicants */}
        {activeTab === 'Applicants' && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Preferred Programs</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Proof of Requirements</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Enrollment Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.applicantId} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantId}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantName}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.applicantType}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.preferredPrograms}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.proofOfRequirements}</td>
                    <td className="px-4 py-2 border border-gray-300">{applicant.enrollmentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table for Enrolled and Graduated Students */}
        {(activeTab === 'Enrolled' || activeTab === 'Graduated') && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">Student Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Email</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Phone</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Address</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Section</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Enrollment Status</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'Enrolled' ? filteredEnrolled : filteredGraduated).map((student) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{student.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.email}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.phone}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.address}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.year}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.section}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.course}</td>
                    <td className="px-4 py-2 border border-gray-300">{student.enrollmentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInformation;
