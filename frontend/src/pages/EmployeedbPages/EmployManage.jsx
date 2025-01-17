import React, { useState, useEffect } from 'react';

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 25;

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

  const handleEnroll = (applicationId) => {
    console.log(`Enrolling application ID: ${applicationId}`);
    // Add enroll logic here
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

  // Filter applications based on the search term (enrollment_id)
  const filteredApplications = applications.filter((application) =>
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
                <th className="px-4 py-2 text-left border border-gray-300">Enrollment ID</th>
                <th className="px-4 py-2 text-left border border-gray-300">Docs Verification</th>
                <th className="px-4 py-2 text-left border border-gray-300">Evaluation Assessment</th>
                <th className="px-4 py-2 text-left border border-gray-300">Docs Submission</th>
                <th className="px-4 py-2 text-left border border-gray-300">Society Payment</th>
                <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
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
                      onClick={() => handleEnroll(application.id)}
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
