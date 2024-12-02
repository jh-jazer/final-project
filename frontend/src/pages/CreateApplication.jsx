import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";


const AdmissionsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { applicantType, preferredProgram } = useAppContext();

  const user = {
    name: "Jane Applicant",
    preferredProgram: "Computer Science",
    applicantType: "Transfer",
    avatar: "https://via.placeholder.com/100",
  };

  const fullNames = {
    als: "Alternative Learning System (ALS) Passer",
    shs: "Senior High School Graduate",
    grade12: "Currently Enrolled Grade 12 Student",
    bachelors: "Bachelor's Degree Graduate",
    transferee: "Transferee",
    stem: "Science, Technology, Engineering, and Mathematics (STEM)",
    abm: "Accountancy, Business, and Management (ABM)",
    humss: "Humanities and Social Sciences (HUMSS)",
    gas: "General Academic Strand (GAS)",
    afa: "Agri-Fishery Arts (AFA)",
    he: "Home Economics (HE)",
    ia: "Industrial Arts (IA)",
    ict: "Information and Communications Technology (ICT)",
    ad: "Arts and Design",
    sports: "Sports",
    it: "Bachelor of Science in Information Technology",
    cs: "Bachelor of Science in Computer Science",
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      navigate("/apply");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#001800] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <img
            src={user.avatar}
            alt="Profile"
            className="rounded-full w-20 h-20 mb-3 border-4 border-white cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
          <h2
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            {user.name}
          </h2>
          <p className="text-sm text-gray-400">{preferredProgram || "Not provided"}</p>
          <p className="text-sm text-gray-400"> {fullNames[applicantType] || applicantType || "Not provided"}</p>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/createapplication"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">1.</span>
                <span>Application Details</span>
              </Link>
            </li>
            <li>
              <Link
                to="personal"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">2.</span>
                <span>Personal Info</span>
              </Link>
            </li>
            <li>
              <Link
                to="family"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">3.</span>
                <span>Family Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="education"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">4.</span>
                <span>Educational Info</span>
              </Link>
            </li>
            <li>
              <Link
                to="requirements"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">5.</span>
                <span>Upload Requirements</span>
              </Link>
            </li>
            <li>
              <Link
                to="appointment"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-xl font-semibold">6.</span>
                <span>Schedule Appointment</span>
              </Link>
            </li>
            {/* Thin Horizontal Line */}
            <hr className="my-11 border-t-2 border-gray-700" />
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
    </div>
  );
};

export default AdmissionsPage;
