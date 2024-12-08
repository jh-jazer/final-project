import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaUser,
    FaClipboardList,
    FaBook,
    FaBell,
    FaCog,
    FaSignOutAlt,
    FaChevronDown,
    FaChevronUp,
  } from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal"; // Import the modal

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const user = {
    id: "202212345", // Change the name to default ID
    course: "BSCS", // Add course information
    status: "Regular", // Add status information (Regular or Irregular)
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
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <Link to="/studentdb">
            <img
              src={user.avatar}
              alt="Profile"
              className="rounded-full w-20 h-20 mb-3 border-4 border-white cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </Link>

          <h2
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            {user.id} {/* Display the ID instead of name */}
          </h2>
          <p className="text-sm text-gray-400">
            {user.course} | {user.status} {/* Display course and status */}
          </p>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="profile"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="checklist"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                <span>Checklist</span>
              </Link>
            </li>
            <li>
              <Link
                to="enroll"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                <span>Enroll</span>
              </Link>
            </li>
          
            {/* Dropdown Section */}
            <li>
              <button
                className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="flex items-center space-x-3">
                  <FaBell />
                  <span>Society Task</span>
                </span>
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 space-y-2 pl-8">
                  <li>
                    <Link
                      to="payment-records"
                      className="px-2 py-2 flex items-center space-x-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span>Payment Records</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <hr className="border-gray-600 my-4" />
            <li>
              <Link
                to="settings"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-red-600 rounded-lg cursor-pointer mt-auto"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

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

export default StudentDashboard;
