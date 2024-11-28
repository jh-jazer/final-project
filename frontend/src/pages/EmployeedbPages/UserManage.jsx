import React, { useState, useEffect } from 'react';

const AccountManagement = () => {
  // Sample data for user accounts
  const [accounts, setAccounts] = useState([
    { id: 1, username: 'johndoe', role: 'Admin', status: 'Active' },
    { id: 2, username: 'janesmith', role: 'Employee', status: 'Active' },
    { id: 3, username: 'marklee', role: 'Student', status: 'Inactive' },
    // Add more accounts as needed
  ]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('username'); // Default sort by username
  const [statusFilter, setStatusFilter] = useState('All'); // All, Student, Employee

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

  // Sorting function
  const sortAccounts = (accounts) => {
    return accounts.sort((a, b) => {
      if (sortBy === 'username') {
        return a.username.localeCompare(b.username);
      } else if (sortBy === 'role') {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });
  };

  // Filtering function based on role
  const filterAccounts = (accounts) => {
    return accounts.filter((account) => {
      if (statusFilter === 'All') return true;
      return account.role.toLowerCase() === statusFilter.toLowerCase();
    });
  };

  // Handle search and filtering
  const filteredAccounts = filterAccounts(
    sortAccounts(
      accounts.filter((account) =>
        account.username.toLowerCase().includes(search.toLowerCase())
      )
    )
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Management</h2>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Username"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Radio Buttons for Account Type */}
        <div className="mb-4 flex space-x-6">
          <label>
            <input
              type="radio"
              name="statusFilter"
              value="All"
              checked={statusFilter === 'All'}
              onChange={() => setStatusFilter('All')}
              className="mr-2"
            />{' '}
            All Accounts
          </label>
          <label>
            <input
              type="radio"
              name="statusFilter"
              value="Student"
              checked={statusFilter === 'Student'}
              onChange={() => setStatusFilter('Student')}
              className="mr-2"
            />{' '}
            Student Accounts
          </label>
          <label>
            <input
              type="radio"
              name="statusFilter"
              value="Employee"
              checked={statusFilter === 'Employee'}
              onChange={() => setStatusFilter('Employee')}
              className="mr-2"
            />{' '}
            Employee Accounts
          </label>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="username">Sort by Username</option>
            <option value="role">Sort by Role</option>
          </select>
        </div>

        {/* Table */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left border border-gray-300">Username</th>
              <th className="px-4 py-2 text-left border border-gray-300">Role</th>
              <th className="px-4 py-2 text-left border border-gray-300">Status</th>
              <th className="px-4 py-2 text-left border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">{account.username}</td>
                <td className="px-4 py-2 border border-gray-300">{account.role}</td>
                <td className="px-4 py-2 border border-gray-300">{account.status}</td>
                <td className="px-4 py-2 border border-gray-300 flex space-x-2">
                  <button
                    onClick={() => handleStatusToggle(account.id)}
                    className={`${
                      account.status === 'Active' ? 'bg-yellow-500' : 'bg-green-500'
                    } text-white px-4 py-2 rounded-md hover:bg-opacity-80`}
                  >
                    {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleAccountDeletion(account.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-80"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;
