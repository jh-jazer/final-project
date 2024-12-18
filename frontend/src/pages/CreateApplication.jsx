import { useState } from "react";
import { Link, Outlet, useNavigate,useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useActiveItem } from "../contexts/CreateAppContext";

const AdmissionsPage = () => {
  const [activeSection, setActiveSection] = useState('First Section');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const { activeItem } = useActiveItem();

  // Handle button click to set the active item
  const navigate = useNavigate();
  const { applicantType, preferredProgram } = useAppContext();

  const icon = activeSection === 'First Section' ? faChevronDown : faChevronUp;

  const toggleSection = () => {
    setActiveSection(prevSection =>
      prevSection === 'First Section' ? 'Second Section' : 'First Section'
    );
  };

  const user = {
    applicantId: "TCS12345",
    preferredProgram: "Computer Science",
    applicantType: "Transfer",
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
    <div className="h-screen flex overflow-auto bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#001800] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <h2
            className="text-xl font-semibold py-3"
            onClick={() => setIsSidebarOpen(false)}
          >
            {user.applicantId}
          </h2>
          <p className="text-sm text-center text-gray-400">{preferredProgram || "Not provided"}</p>
          <p className="text-sm text-center text-gray-400">
            {fullNames[applicantType] || applicantType || "Not provided"}
          </p>
        </div>
        <nav className="flex-1 mt-4 overflow-y-auto">
          <ul className="space-y-2">
            {/* First Section Links */}
            {activeSection === 'First Section' && (
              <>
                <li className={activeItem === '/createapplication' ? 'active' : ''}>
                  <button
                    className=" px-4 py-2 flex items-center space-x-3 rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">1.</span>
                    <span>Application Details</span>
                  </button>
                </li>
                <li className={activeItem === '/personal' ? 'active' : ''}>
                  <button
                    className=" px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">2.</span>
                    <span>Personal Info</span>
                  </button>
                </li>
                <li className={activeItem === '/family' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">3.</span>
                    <span>Family Profile</span>
                  </button>
                </li>
                <li className={activeItem === '/education' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">4.</span>
                    <span>Educational Info</span>
                  </button>
                </li>
                <li className={activeItem === '/requirements' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">5.</span>
                    <span>Upload Requirements</span>
                  </button>
                </li>
                <li className={activeItem === '/appointment' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">6.</span>
                    <span>Schecule Appointment</span>
                  </button>
                </li>
                {/* Other steps */}
              </>
            )}

            {/* Second Section Links */}
            {activeSection === 'Second Section' && (
              <>
                <li className={activeItem === '/document-verification' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">7.</span>
                    <span>Document Verification</span>
                  </button>
                </li>
                <li className={activeItem === '/entrance-examination' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">8.</span>
                    <span>Entrance Examination</span>
                  </button>
                </li>
                <li className={activeItem === '/document-submission' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">9.</span>
                    <span>Document Submission</span>
                  </button>
                </li>
                <li className={activeItem === '/applicant-society-payment' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">10.</span>
                    <span>Society Payment</span>
                  </button>
                </li>
                <li className={activeItem === '/applicant-society-payment' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                   >
                    <span className="text-xl font-semibold">11.</span>
                    <span>Advising</span>
                  </button>
                </li>
                <li className={activeItem === '/enrollment-completed' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">12.</span>
                    <span>Enrollment Completed</span>
                  </button>
                </li>
                {/* Other steps */}
              </>
            )}

            {/* Toggle Button */}
            <div className="flex justify-center items-center">
              <button onClick={toggleSection} className="p-1 text-white">
                <FontAwesomeIcon icon={icon} />
              </button>
            </div>


            {/* Horizontal Line */}
            <hr className="my-11 border-t-2 border-gray-700" />
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-red-600 rounded-lg cursor-default cursor-pointer mt-auto"
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
