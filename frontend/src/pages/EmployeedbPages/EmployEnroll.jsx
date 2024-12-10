import React, { useState, useEffect } from 'react';

const SocietyPayments = () => {
  const [enrollments, setEnrollments] = useState([
    {
      id: 1,
      enrolleeID: '202212345',
      enrolleeName: 'John Doe',
      course: 'Computer Science',
      year: '2nd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Paid',
      advisingStatus: 'Advised',
      requirementsComplete: 'Complete',
      enrolleeType: 'Regular',
    },
    {
      id: 2,
      enrolleeID: '202212346',
      enrolleeName: 'Jane Smith',
      course: 'Information Technology',
      year: '3rd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Not Paid',
      advisingStatus: 'Not Advised',
      requirementsComplete: 'Incomplete',
      enrolleeType: 'Irregular',
    },
    {
      id: 3,
      enrolleeID: '202212347',
      enrolleeName: 'Mark Lee',
      course: 'Computer Science',
      year: '1st Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Paid',
      advisingStatus: 'Not Advised',
      requirementsComplete: 'Incomplete',
      enrolleeType: 'Regular',
    },
    {
      id: 4,
      enrolleeID: '202212348',
      enrolleeName: 'Alice Johnson',
      course: 'Information Technology',
      year: '2nd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Not Paid',
      advisingStatus: 'Advised',
      requirementsComplete: 'Incomplete',
      enrolleeType: 'Irregular',
    },
    {
      id: 5,
      enrolleeID: '202212368',
      enrolleeName: 'Alice Gou',
      course: 'Computer Science',
      year: '2nd Year',
      checklistValid: 'Yes',
      societyFeePaid: 'Not Paid',
      advisingStatus: 'Advised',
      requirementsComplete: 'Incomplete',
      enrolleeType: 'Irregular',
    },
  ]);

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('payment');

  useEffect(() => {
    // Fetch enrollment data from an API or database if necessary
  }, []);

  // Update the requirementsComplete based on Society Fee, Advising, and Checklist
  const updateRequirements = (enrollee) => {
    if (enrollee.societyFeePaid === 'Paid' && enrollee.advisingStatus === 'Advised' && enrollee.checklistValid === 'Yes') {
      return 'Complete';
    }
    return 'Incomplete';
  };

  const handlePaymentApproval = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              societyFeePaid: 'Paid',
              requirementsComplete: updateRequirements({ ...enrollee, societyFeePaid: 'Paid' }),
            }
          : enrollee
      )
    );
  };

  const handlePaymentRejection = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              societyFeePaid: 'Not Paid',
              requirementsComplete: updateRequirements({ ...enrollee, societyFeePaid: 'Not Paid' }),
            }
          : enrollee
      )
    );
  };

  const handleAdvisingApproval = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              advisingStatus: 'Advised',
              requirementsComplete: updateRequirements({ ...enrollee, advisingStatus: 'Advised' }),
            }
          : enrollee
      )
    );
  };

  const handleAdvisingRejection = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              advisingStatus: 'Not Advised',
              requirementsComplete: updateRequirements({ ...enrollee, advisingStatus: 'Not Advised' }),
            }
          : enrollee
      )
    );
  };

  const handleEnrollment = (id) => {
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enrollee) =>
        enrollee.id === id
          ? {
              ...enrollee,
              requirementsComplete: 'Enrolled',
            }
          : enrollee
      )
    );
  };

  const filteredEnrollments = enrollments.filter((enrollee) => {
    return enrollee.enrolleeID.toLowerCase().includes(search.toLowerCase());
  });

  // Get the data for the selected tab
  const getTabData = () => {
    switch (activeTab) {
      case 'payment':
      case 'advising':
      case 'requirement':
        return filteredEnrollments;
      default:
        return filteredEnrollments;
    }
  };

  return (
    <div className="p-6 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Enrollment Management
        </h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Enrollee ID"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-4 py-2 rounded-md ${activeTab === 'payment' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Payment Validation
          </button>
          <button
            onClick={() => setActiveTab('advising')}
            className={`px-4 py-2 rounded-md ${activeTab === 'advising' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Advising Validation
          </button>
          <button
            onClick={() => setActiveTab('requirement')}
            className={`px-4 py-2 rounded-md ${activeTab === 'requirement' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Requirement Validation
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border border-gray-300">Enrollee ID</th>
                <th className="px-4 py-2 text-left border border-gray-300">Enrollee Name</th>
                <th className="px-4 py-2 text-left border border-gray-300">Course</th>
                <th className="px-4 py-2 text-left border border-gray-300">Year</th>
                {activeTab === 'payment' && (
                  <>
                    <th className="px-4 py-2 text-left border border-gray-300">Payment Status</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Action</th>
                  </>
                )}
                {activeTab === 'advising' && (
                  <>
                    <th className="px-4 py-2 text-left border border-gray-300">Advising Status</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Action</th>
                  </>
                )}
                {activeTab === 'requirement' && (
                  <>
                    <th className="px-4 py-2 text-left border border-gray-300">Checklist Status</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Advising Status</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Payment Status</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {getTabData().map((enrollee) => (
                <tr key={enrollee.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border border-gray-300">{enrollee.enrolleeID}</td>
                  <td className="px-4 py-2 border border-gray-300">{enrollee.enrolleeName}</td>
                  <td className="px-4 py-2 border border-gray-300">{enrollee.course}</td>
                  <td className="px-4 py-2 border border-gray-300">{enrollee.year}</td>
                  {activeTab === 'payment' && (
                    <>
                      <td className="px-4 py-2 border border-gray-300">{enrollee.societyFeePaid}</td>
                      <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                        <button
                          onClick={() => handlePaymentApproval(enrollee.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Paid
                        </button>
                        <button
                          onClick={() => handlePaymentRejection(enrollee.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Not Paid
                        </button>
                      </td>
                    </>
                  )}
                  {activeTab === 'advising' && (
                    <>
                      <td className="px-4 py-2 border border-gray-300">{enrollee.advisingStatus}</td>
                      <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                        <button
                          onClick={() => handleAdvisingApproval(enrollee.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Advised
                        </button>
                        <button
                          onClick={() => handleAdvisingRejection(enrollee.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Not Advised
                        </button>
                      </td>
                    </>
                  )}
                  {activeTab === 'requirement' && (
                    <>
                      <td className="px-4 py-2 border border-gray-300">{enrollee.requirementsComplete}</td>
                      <td className="px-4 py-2 border border-gray-300">{enrollee.advisingStatus}</td>
                      <td className="px-4 py-2 border border-gray-300">{enrollee.societyFeePaid}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        {enrollee.requirementsComplete === 'Complete' && (
                          <button
                            onClick={() => handleEnrollment(enrollee.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          >
                            Enroll
                          </button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SocietyPayments;
