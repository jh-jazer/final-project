import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaClipboardList,
  FaBook,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal"; // Import the modal

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const user = {
    name: "Admin Doe",
    role: "Adviser", // Employee type (Role/Position)
    avatar: "https://via.placeholder.com/100",
  };

  // Handle logout confirmation
  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal
  };

  const confirmLogout = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/login"); // Redirect to the login page
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#081708] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarMinimized ? "w-[60px]" : "w-64"} transition-all duration-300 lg:relative lg:translate-x-0`}
      >
        {/* Profile Section */}
        <div
          className={`p-6 flex flex-col items-center border-b border-gray-700 ${
            isSidebarMinimized ? "items-center" : "items-start"
          }`}
        >
        
          {!isSidebarMinimized && (
            <>
              <h2
                className="text-xl font-semibold cursor-pointer mt-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                {user.name}
              </h2>
              <p className="text-sm text-gray-400">{user.role}</p> {/* Display employee type */}
            </>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="employee-profile"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                {!isSidebarMinimized && <span>Profile</span>}
              </Link>
            </li>
            
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
              <Link
                to="academic-records"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                {!isSidebarMinimized && <span>Academic Records</span>}
              </Link>
            </li>
            <li>
              <Link
                to="student-informations"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                {!isSidebarMinimized && <span>Student Records</span>}
              </Link>
            </li>
            <li>
              <Link
                to="employee-instructors"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                {!isSidebarMinimized && <span>Manage Instructors</span>}
              </Link>
            </li>
            <li>
              <Link
                to="manage-accounts"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                {!isSidebarMinimized && <span>Manage Accounts</span>}
              </Link>
            </li>
            <li>
              <Link
                to="manage-applications"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                {!isSidebarMinimized && <span>Manage Applications</span>}
              </Link>
            </li>
            {/* Manage Enrollment Section */}
            <li>
              <Link
                to="manage-enrollment"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                {!isSidebarMinimized && <span>Manage Enrollment</span>}
              </Link>
            </li>
             {/* Manage Enrollment Section */}
             <li>
              <Link
                to="manage-classes"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                {!isSidebarMinimized && <span>Manage Classes</span>}
              </Link>
            </li>
             {/* Manage Enrollment Section */}
             <li>
              <Link
                to="manage-sections"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                {!isSidebarMinimized && <span>Manage Sections</span>}
              </Link>
            </li>
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-red-600 rounded-lg cursor-pointer mt-auto"
              >
                <FaSignOutAlt />
                {!isSidebarMinimized && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Button for Minimizing Sidebar */}
      <button
        className="hidden lg:block fixed top-4 left-4 z-50 bg-[#081708] text-white p-2 rounded-md"
        onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
      >
        {isSidebarMinimized ? (
          <FaAngleDoubleLeft size={20} />
        ) : (
          <FaAngleDoubleRight size={20} />
        )}
      </button>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#081708] text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full p-8">
        <Outlet /> {/* This renders the nested route components */}
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default AdminDashboard;
