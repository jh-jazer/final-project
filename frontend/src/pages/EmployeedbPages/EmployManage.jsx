import React, { useState, useEffect } from 'react';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([
    {
      applicantID: '1',
      applicantName: 'John Doe',
      course: 'Computer Science',
      submittedDate: '2024-11-10',
      applicantType: 'Grade 12 Student',
      requirementsValidation: 'Pending',
      evaluationResults: 'Pending',
      requirementsSubmission: 'Pending',
      societyPayment: 'Pending',
      applicantStatus: 'Pending',


    },
    {
      applicantID: '2',
      applicantName: 'Jane Smith',
      course: 'Information Technology',
      submittedDate: '2024-11-12',
      applicantType: 'Senior High Graduate',
      requirementsValidation: 'Pending',
      evaluationResults: 'Pending',
      requirementsSubmission: 'Pending',
      societyPayment: 'Pending',
      applicantStatus: 'Pending',

    },
    {
      applicantID: '3',
      applicantName: 'Mark Lee',
      course: 'Computer Science',
      submittedDate: '2024-11-15',
      applicantType: 'ALS Passer',
      requirementsValidation: 'Pending',
      evaluationResults: 'Pending',
      requirementsSubmission: 'Pending',
      societyPayment: 'Pending',
      applicantStatus: 'Pending',



    },
    {
      applicantID: '4',
      applicantName: 'Alice Johnson',
      course: 'Information Technology',
      submittedDate: '2024-11-18',
      applicantType: 'Bachelor\'s Degree Graduate',
      requirementsValidation: 'Pending',
      evaluationResults: 'Pending',
      requirementsSubmission: 'Pending',
      societyPayment: 'Pending',
      applicantStatus: 'Pending',



    },
    {
      applicantID: '5',
      applicantName: 'Tom White',
      course: 'Electrical Engineering',
      submittedDate: '2024-11-20',
      applicantType: 'Transferee',
      requirementsValidation: 'Pending',
      evaluationResults: 'Pending',
      requirementsSubmission: 'Pending',
      societyPayment: 'Pending',
      applicantStatus: 'Pending',

    },
  ]);

  // Course abbreviations map
  const courseAbbreviations = {
    'Computer Science': 'BSCS',
    'Information Technology': 'BSIT',
    'Electrical Engineering': 'BSEE',
  };

  // Applicant type abbreviations map
  const applicantTypeAbbreviations = {
    'Grade 12 Student': 'G12',
    'Senior High Graduate': 'SHG',
    'ALS Passer': 'ALS',
    'Bachelor\'s Degree Graduate': 'BDG',
    'Transferee': 'TF',
  };

  const [search, setSearch] = useState('');
  const [applicantTypeFilter, setApplicantTypeFilter] = useState('All');
  const [selectedTab, setSelectedTab] = useState('requirementValidation');

  useEffect(() => {
    // Fetch application data from an API or database
    // Example: setApplications(fetchedData);
  }, []);

  const handleApproval = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              requirementsValidation: 'Approved', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleRejection = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              evaluationResults: 'Passed', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleEvaluationApproval = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              evaluationResults: 'Passed', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleEvaluationRejection = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              evaluationResults: 'Failed', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };
   
  const handleSubmissionApproval = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              requirementsSubmission: 'Submitted', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleSubmissionRejection = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              evaluationResults: 'Rejected', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handlePaymentApproval = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              societyPayment: 'Paid', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handlePaymentRejection = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              societyPayment: 'Rejected', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleEnrollmentApproval = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              applicantStatus: 'Enrolled', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const handleEnrollmentRejection = (applicantID) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.applicantID === applicantID
          ? {
              ...application,
              applicantStatus: 'Rejected', // Updating the requirementsValidation column
            }
          : application
      )
    );
  };

  const filteredApplications = applications
    .filter((application) => {
      return (
        application.applicantID.toString().includes(search) && // Searching by ID
        (applicantTypeFilter === 'All' || application.applicantType === applicantTypeFilter)
      );
    });

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Application Management</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Application ID"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Dropdown for Applicant Type Filter */}
        <div className="mb-4">
          <select
            value={applicantTypeFilter}
            onChange={(e) => setApplicantTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="All">All Applicants</option>
            <option value="Grade 12 Student">Grade 12 Student</option>
            <option value="Senior High Graduate">Senior High Graduate</option>
            <option value="ALS Passer">ALS Passer</option>
            <option value="Bachelor's Degree Graduate">Bachelor's Degree Graduate</option>
            <option value="Transferee">Transferee</option>
          </select>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex space-x-4 border-b border-gray-300 overflow-x-auto">
            <button
              className={`px-4 py-2 text-lg ${selectedTab === 'requirementValidation' ? 'font-semibold border-b-2 border-blue-500' : ''}`}
              onClick={() => setSelectedTab('requirementValidation')}
            >
              Requirement Validation
            </button>
            <button
              className={`px-4 py-2 text-lg ${selectedTab === 'evaluationResults' ? 'font-semibold border-b-2 border-blue-500' : ''}`}
              onClick={() => setSelectedTab('evaluationResults')}
            >
              Evaluation Results
            </button>
            <button
              className={`px-4 py-2 text-lg ${selectedTab === 'requirementsSubmission' ? 'font-semibold border-b-2 border-blue-500' : ''}`}
              onClick={() => setSelectedTab('requirementsSubmission')}
            >
              Requirement Submissions
            </button>
            <button
              className={`px-4 py-2 text-lg ${selectedTab === 'societyPayment' ? 'font-semibold border-b-2 border-blue-500' : ''}`}
              onClick={() => setSelectedTab('societyPayment')}
            >
              Society Payment
            </button>
            <button
              className={`px-4 py-2 text-lg ${selectedTab === 'enrollApplicant' ? 'font-semibold border-b-2 border-blue-500' : ''}`}
              onClick={() => setSelectedTab('enrollApplicant')}
            >
              Enroll Applicant
            </button>
          </div>
        </div>

        {/* Conditional Rendering for Selected Tab */}
        {selectedTab === 'requirementValidation' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Requirement Validation Table</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Requirements Validation</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {filteredApplications
                .filter(application => application.requirementsValidation === 'Pending')
                .map((application) => (
                    <tr key={application.applicantID} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border border-gray-300">{application.applicantID}</td>
                      <td className="px-4 py-2 border border-gray-300">{application.applicantName}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        {courseAbbreviations[application.course] || application.course}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        {applicantTypeAbbreviations[application.applicantType] || application.applicantType}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">{application.requirementsValidation}</td>
                      <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleApproval(application.applicantID)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejection(application.applicantID)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
            {selectedTab === 'evaluationResults' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Evaluation Results Table</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>                        
                      <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Evaluation Results</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications
                        .filter(application => application.requirementsValidation === 'Approved'  && application.evaluationResults === 'Pending') // Only show applications that are approved in requirementsValidation
                        .map((application) => (
                          <tr key={application.applicantID} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border border-gray-300">{application.applicantID}</td>
                          <td className="px-4 py-2 border border-gray-300">{application.applicantName}</td>                            
                          <td className="px-4 py-2 border border-gray-300">
                              {courseAbbreviations[application.course] || application.course}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                            <td className="px-4 py-2 border border-gray-300">
                              {applicantTypeAbbreviations[application.applicantType] || application.applicantType}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.evaluationResults}</td>
                            <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              <button
                                onClick={() => handleEvaluationApproval(application.applicantID)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                              >
                                Pass
                              </button>
                              <button
                                onClick={() => handleEvaluationRejection(application.applicantID)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                              >
                                Fail
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
                        {selectedTab === 'requirementsSubmission' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Requirement Submission Table</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>                        
                      <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Requirement Submission</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications
                        .filter(application => application.evaluationResults === 'Passed' && application.requirementsSubmission === 'Pending') // Only show applications that are approved in requirementsValidation
                        .map((application) => (
                          <tr key={application.applicantID} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border border-gray-300">{application.applicantID}</td>
                          <td className="px-4 py-2 border border-gray-300">{application.applicantName}</td>                           
                            <td className="px-4 py-2 border border-gray-300">
                              {courseAbbreviations[application.course] || application.course}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                            <td className="px-4 py-2 border border-gray-300">
                              {applicantTypeAbbreviations[application.applicantType] || application.applicantType}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.requirementsSubmission}</td>
                            <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              <button
                                onClick={() => handleSubmissionApproval(application.applicantID)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleSubmissionRejection(application.applicantID)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

                {selectedTab === 'societyPayment' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Society Payment Table</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>                        
                      <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Society Payment</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications
                        .filter(application => application.requirementsSubmission === 'Submitted' && application.societyPayment === 'Pending') // Only show applications that are approved in requirementsValidation
                        .map((application) => (
                          <tr key={application.applicantID} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border border-gray-300">{application.applicantID}</td>
                            <td className="px-4 py-2 border border-gray-300">{application.applicantName}</td>                            
                            <td className="px-4 py-2 border border-gray-300">
                              {courseAbbreviations[application.course] || application.course}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                            <td className="px-4 py-2 border border-gray-300">
                              {applicantTypeAbbreviations[application.applicantType] || application.applicantType}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.societyPayment}</td>
                            <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              <button
                                onClick={() => handlePaymentApproval(application.applicantID)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                              >
                                Paid
                              </button>
                              <button
                                onClick={() => handlePaymentRejection(application.applicantID)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            
                      {selectedTab === 'enrollApplicant' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Applicant Enrollment Table</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant ID</th>
                      <th className="px-4 py-2 text-left border border-gray-300">Applicant Name</th>                        
                      <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Submitted Date</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Applicant Type</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Applicant Status</th>
                        <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications
                        .filter(application => application.societyPayment === 'Paid' && application.applicantStatus === 'Pending') // Only show applications that are approved in requirementsValidation
                        .map((application) => (
                          <tr key={application.applicantID} className="hover:bg-gray-100">
                              <td className="px-4 py-2 border border-gray-300">{application.applicantID}</td>
                              <td className="px-4 py-2 border border-gray-300">{application.applicantName}</td>                            
                              <td className="px-4 py-2 border border-gray-300">
                              {courseAbbreviations[application.course] || application.course}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.submittedDate}</td>
                            <td className="px-4 py-2 border border-gray-300">
                              {applicantTypeAbbreviations[application.applicantType] || application.applicantType}
                            </td>
                            <td className="px-4 py-2 border border-gray-300">{application.applicantStatus}</td>
                            <td className="px-4 py-2 border border-gray-300 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                              <button
                                onClick={() => handleEnrollmentApproval(application.applicantID)}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full sm:w-auto"
                              >
                                Enroll
                              </button>
                              <button
                                onClick={() => handleEnrollmentRejection(application.applicantID)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}



      </div>
    </div>
  );
};

export default ApplicationManagement;
