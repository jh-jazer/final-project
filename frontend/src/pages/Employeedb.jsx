import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaClipboardList,
  FaBook,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal"; // Import the modal

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isApplicationDropdownOpen, setIsApplicationDropdownOpen] = useState(false);
  const [isSocietyDropdownOpen, setIsSocietyDropdownOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user data locally

  const userType = user?.type;

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
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

  const toggleStudentDropdown = () => { 

    setIsApplicationDropdownOpen(false);
    setIsCoursesDropdownOpen(false);
    setIsAdminDropdownOpen(false);
    setIsStudentDropdownOpen((prev) => !prev);
  };

  const toggleApplicationDropdown = () => { 

    setIsStudentDropdownOpen(false);
    setIsCoursesDropdownOpen(false);
    setIsAdminDropdownOpen(false);
    setIsApplicationDropdownOpen((prev) => !prev);
  };
  const toggleCoursesDropdown = () => { 

    setIsApplicationDropdownOpen(false);
    setIsStudentDropdownOpen(false);
    setIsAdminDropdownOpen(false);
    setIsCoursesDropdownOpen((prev) => !prev);
  };
    const toggleAdminDropdown = () => { 

    setIsApplicationDropdownOpen(false);
    setIsCoursesDropdownOpen(false);
    setIsStudentDropdownOpen(false);
    setIsAdminDropdownOpen((prev) => !prev);
  };

  const toggleSocietyDropdown = () => setIsSocietyDropdownOpen((prev) => !prev);



  const handleNavigateToPayment = () => {
    navigate("/employeedb/payment-records", { state: { user: user } });
  };


 // Handle logout confirmation
 const handleLogout = () => setIsModalOpen(true);
 const confirmLogout = () => {
   setIsModalOpen(false);
   localStorage.removeItem("user"); // Remove user data from localStorage
   navigate("/login"); // Redirect to the login page
 };
 const cancelLogout = () => setIsModalOpen(false);

 

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
                {user?.id || "Unknown ID"}  {/* Use optional chaining to prevent errors */}
  </Link>
              <p className="text-sm text-gray-400">
                {user?.other || "Unknown Program"} | {user?.type || "Unknown Employee Type"} 
                
              </p>
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
             {/* Conditionally Render Society Task */}
             {userType === "Society Officer" && (
              <li>
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleSocietyDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isSocietyDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Society Task</span>}
                  </div>
                </button>
                {isSocietyDropdownOpen && (
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

             {/* Conditionally render links based on user role */}
             {userType === "Adviser" && (
              <>
            
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

            <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleApplicationDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isApplicationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Registration</span>}
                  </div>
                </button>

            {isApplicationDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}

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

            
                
                  </ul>
                )}
            </>
            )}
            
            
             {/* Conditionally render links based on user role */}
             {userType === "Registrar" && (
              <>
            
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleStudentDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isStudentDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Students</span>}
                  </div>
                </button>
                {isStudentDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}
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
                {!isSidebarMinimized && <span>Student Informations</span>}
              </Link>
            </li>
                  </ul>
                )}
              </li>
              <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleApplicationDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isApplicationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Registration</span>}
                  </div>
                </button>
                {isApplicationDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}
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
                
                  </ul>
                )}
              </li>
              <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleCoursesDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isCoursesDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Programs</span>}
                  </div>
                </button>
                {isCoursesDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
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
         
        
             {/* Manage Classes Section */}
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
                   
                  </ul>
                )}
              </li>
            </>
            )}
                {/* Conditionally render links based on user role */}
                {userType === "Admin" && (
              <>
            
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleStudentDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isStudentDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Students</span>}
                  </div>
                </button>
                {isStudentDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}
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
                {!isSidebarMinimized && <span>Student Informations</span>}
              </Link>
            </li>
                  </ul>
                )}
              </li>
              <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleApplicationDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isApplicationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Registration</span>}
                  </div>
                </button>
                {isApplicationDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                        {/* Enroll - Use the handler here */}
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
                
                  </ul>
                )}
              </li>
              <li>
            
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleCoursesDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isCoursesDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Programs</span>}
                  </div>
                </button>
                {isCoursesDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
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
         
        
             {/* Manage Classes Section */}
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
                   
                  </ul>
                )}
              </li>
              <li>
                <button
                  className={`w-full px-4 py-2 flex items-center pl-4 justify-between hover:bg-gray-700 rounded-lg cursor-pointer ${
                    isSidebarMinimized ? "justify-center" : ""
                  }`}
                  onClick={toggleAdminDropdown}
                >
                  <div className="flex items-center space-x-3">
                    {isAdminDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    {!isSidebarMinimized && <span>Manage Accounts</span>}
                  </div>
                </button>
                {isAdminDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-4">
                          <li>
              <Link
                to="employee-accounts"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                {!isSidebarMinimized && <span> Employee Accounts</span>}
              </Link>
            </li>
            <li>
              <Link
                to="student-accounts"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                {!isSidebarMinimized && <span> Student Accounts</span>}
              </Link>
            </li>
                
                  </ul>
                )}
              </li>
            </>
            )}

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

export default EmployeeDashboard;
