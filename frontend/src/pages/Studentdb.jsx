import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaClipboardList,
  FaBook,
  FaSignOutAlt,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal";

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user data locally
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Redirect to login if user data is not available
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleNavigateToEnroll = () => {
    navigate("/studentdb/enroll");
  };

  const handleNavigateToChecklist = () => {
    navigate("/studentdb/checklist");
  };

  // Handle logout confirmation
  const handleLogout = () => setIsModalOpen(true);
  const confirmLogout = () => {
    setIsModalOpen(false);
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login"); // Redirect to the login page
  };
  const cancelLogout = () => setIsModalOpen(false);

  if (!user) return null; // Render nothing until user data is loaded

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#081708] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarMinimized ? "w-[60px]" : "w-64"} transition-all duration-300 lg:relative lg:translate-x-0`}
      >
        <div
          className={`p-6 flex flex-col items-center border-b border-gray-700 ${
            isSidebarMinimized ? "items-center" : "items-start"
          }`}
        >
          {!isSidebarMinimized && (
            <>
              <Link
                to="/studentdb"
                className="text-xl font-semibold cursor-pointer mt-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                {user.id || "Unknown ID"}
              </Link>
              <p className="text-sm text-gray-400">
                {user.other || "Unknown Program"} | {user.type || "Unknown Student Type"} |{" "}
                {user.role || "Unknown Role"}
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
                className={`px-4 py-2 w-full flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer ${
                  isSidebarMinimized ? "justify-center" : ""
                }`}
              >
                <FaBook />
                {!isSidebarMinimized && <span>Checklist</span>}
              </button>
            </li>

            {/* Enroll */}
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

            <hr className="border-gray-600 my-4" />

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