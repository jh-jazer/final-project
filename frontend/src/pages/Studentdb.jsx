import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaClipboardList,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal"; // Import the modal

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const user = {
    id: "202212345", // Change the name to default ID
    course: "BSCS", // Add course information
    status: "Irregular", // Add status information (Regular or Irregular)
    role: "Student", // Update the role as needed
    avatar: "https://via.placeholder.com/100",
  };

  const handleNavigateToEnroll = () => {
    navigate("/studentdb/enroll", { state: { status: user.status } });
  };
  const handleNavigateToPayment = () => {
    navigate("/studentdb/payment-records", { state: { user: user } });
  };
  const handleNavigateToChecklist = () => {
    navigate("/studentdb/checklist", { state: { user: user } });
  };
  
  

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Handle logout confirmation
  const handleLogout = () => setIsModalOpen(true);
  const confirmLogout = () => {
    setIsModalOpen(false);
    navigate("/login"); // Redirect to the login page
  };
  const cancelLogout = () => setIsModalOpen(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#081708] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarMinimized ? "w-16" : "w-64"} transition-all duration-300 lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <Link to="/studentdb">
            <img
              src={user.avatar}
              alt="Profile"
              className={`rounded-full w-20 h-20 mb-3 border-4 border-white cursor-pointer ${
                isSidebarMinimized ? "w-12 h-12" : ""
              }`}
              onClick={() => setIsSidebarOpen(false)}
            />
          </Link>
          {!isSidebarMinimized && (
            <>
              <h2
                className="text-xl font-semibold cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                {user.id}
              </h2>
              <p className="text-sm text-gray-400">
                {user.course} | {user.status} | {user.role}
              </p>
            </>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            {/* Profile */}
            <li>
              <Link
                to="profile"
                className={`px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                  isSidebarMinimized ? "justify-center" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                {!isSidebarMinimized && <span>Profile</span>}
              </Link>
            </li>

            {/* Checklist */}
            <li>
                      <button
                        onClick={handleNavigateToChecklist} 
                        className={`px-4 py-2  w-full flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                          isSidebarMinimized ? "justify-center" : ""
                        }`}
                      >
                        <FaBook />
                        {!isSidebarMinimized && <span>Checklist</span>}
                      </button>
                    </li>

            {/* Enroll - Use the handler here */}
            <li>
              <button
                onClick={handleNavigateToEnroll} 
                className={`px-4 py-2 w-full flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                  isSidebarMinimized ? "justify-center" : ""
                }`}
              >
                <FaClipboardList />
                {!isSidebarMinimized && <span>Enroll</span>}
              </button>
            </li>

            {/* Conditionally Render Society Task */}
            {user.role !== "Student" && (
              <li>
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Society Task</span>}
                  </div>
                </button>
                {isDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}
                    <li>
                      <button
                        onClick={handleNavigateToPayment} 
                        className={`px-4 py-2  w-full flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                          isSidebarMinimized ? "justify-center" : ""
                        }`}
                      >
                        <FaClipboardList />
                        {!isSidebarMinimized && <span>Payment Records</span>}
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}

            <hr className="border-gray-600 my-4" />

            {/* Settings */}
            <li>
              <Link
                to="settings"
                className={`px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                  isSidebarMinimized ? "justify-center" : ""
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaCog />
                {!isSidebarMinimized && <span>Settings</span>}
              </Link>
            </li>

            {/* Logout */}
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

      {/* Sidebar Minimize Button */}
      <button
        className="hidden lg:block fixed top-4 left-4 z-50 bg-[#081708] text-white p-2 rounded-md"
        onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
      >
        {isSidebarMinimized ? <FaAngleDoubleRight size={20} /> : <FaAngleDoubleLeft size={20} />}
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

export default StudentDashboard;
