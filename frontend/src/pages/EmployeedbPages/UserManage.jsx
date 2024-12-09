import React, { useState } from 'react';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, fullName: 'John Doe', cvsuEmail: 'johndoe@cvsu.edu', phoneNumber: '09123456789', role: 'Admin', status: 'Active' },
    { id: 2, fullName: 'Jane Smith', cvsuEmail: 'janesmith@cvsu.edu', phoneNumber: '09123456780', role: 'Employee', status: 'Active' },
    { id: 3, fullName: 'Mark Lee', cvsuEmail: 'marklee@cvsu.edu', phoneNumber: '09123456781', role: 'Student', status: 'Inactive' },
    { id: 4, fullName: 'Emily Jones', cvsuEmail: 'emilyjones@cvsu.edu', phoneNumber: '09123456782', role: 'Employee', status: 'Pending' },
    { id: 5, fullName: 'William Son', cvsuEmail: 'williamson@cvsu.edu', phoneNumber: '09123456783', role: 'Admin', status: 'Pending' },
    // Add more accounts as needed
  ]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Sign Up');

  // Function to handle account status toggle (Activate/Deactivate)
  const handleStatusToggle = (id) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? { ...account, status: account.status === 'Active' ? 'Inactive' : 'Active' }
          : account
      )
    );
  };

  // Function to handle account deletion
  const handleAccountDeletion = (id) => {
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== id));
  };

  // Filtering function based on the selected status filter
  const filterAccounts = (accounts) => {
    if (statusFilter === 'Sign Up') {
      // Only show 'Pending' accounts in the Sign Up tab
      return accounts.filter((account) => account.status === 'Pending');
    } else if (statusFilter === 'Active') {
      return accounts.filter((account) => account.status === 'Active');
    } else if (statusFilter === 'Inactive') {
      return accounts.filter((account) => account.status === 'Inactive');
    }
    return accounts;
  };

  // Handle search and filtering
  const filteredAccounts = filterAccounts(
    accounts.filter((account) =>
      account.fullName.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Management</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Full Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Tabs for Account Status */}
        <div className="mb-4">
          <div className="flex space-x-4 border-b-2">
            <button
              onClick={() => setStatusFilter('Sign Up')}
              className={`${
                statusFilter === 'Sign Up' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } px-4 py-2`}
            >
              Sign Ups
            </button>
            <button
              onClick={() => setStatusFilter('Active')}
              className={`${
                statusFilter === 'Active' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } px-4 py-2`}
            >
              Active Accounts
            </button>
            <button
              onClick={() => setStatusFilter('Inactive')}
              className={`${
                statusFilter === 'Inactive' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } px-4 py-2`}
            >
              Inactive Accounts
            </button>
          </div>
        </div>

        {/* Table for the selected status */}
        {statusFilter === 'Sign Up' && (
          <div className="overflow-x-auto mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Sign Up Accounts</h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Full Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">CVSU Email</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Phone Number</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Role</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Status</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{account.id}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.fullName}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.cvsuEmail}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.phoneNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.role}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.status}</td>
                    <td className="px-4 py-2 border border-gray-300 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleStatusToggle(account.id)}
                        className={`${
                          account.status === 'Active' ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto`}
                      >
                        {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleAccountDeletion(account.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {statusFilter === 'Active' && (
          <div className="overflow-x-auto mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Active Accounts</h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Full Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">CVSU Email</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Phone Number</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Role</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Status</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{account.id}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.fullName}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.cvsuEmail}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.phoneNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.role}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.status}</td>
                    <td className="px-4 py-2 border border-gray-300 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleStatusToggle(account.id)}
                        className={`${
                          account.status === 'Active' ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto`}
                      >
                        {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleAccountDeletion(account.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {statusFilter === 'Inactive' && (
          <div className="overflow-x-auto mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Inactive Accounts</h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left border border-gray-300">ID</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Full Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">CVSU Email</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Phone Number</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Role</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Status</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border border-gray-300">{account.id}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.fullName}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.cvsuEmail}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.phoneNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.role}</td>
                    <td className="px-4 py-2 border border-gray-300">{account.status}</td>
                    <td className="px-4 py-2 border border-gray-300 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleStatusToggle(account.id)}
                        className={`${
                          account.status === 'Active' ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto`}
                      >
                        {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleAccountDeletion(account.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </td>
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

export default AccountManagement;
