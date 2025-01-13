import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useActiveItem } from "../contexts/CreateAppContext";


const AdmissionsPage = () => {
  const location = useLocation(); // Use location before accessing its state
  const { userData } = location.state || {}; // Ensure location.state is handled properly
  const { enrollmentData } = location.state || {}; // Ensure location.state is handled properly
  const storedEmail = localStorage.getItem("email");
  const email = userData?.email || enrollmentData?.email || storedEmail || "No email provided"; // Fallback if email is undefined
  const [activeSection, setActiveSection] = useState("First Section");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userDetails, setUserDetails] = useState(null); // Store entire user data
  const { activeItem } = useActiveItem();
  const navigate = useNavigate();
  const icon = activeSection === "First Section" ? faChevronDown : faChevronUp;

  const toggleSection = () => {
    setActiveSection(prevSection =>
      prevSection === 'First Section' ? 'Second Section' : 'First Section'
    );
  };


  const fullNames = {
    als: "ALS Passer",
    shs: "SHS Graduate",
    grade12: "Enrolled Grade 12",
    bachelors: "Bachelor's Grad",
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

  const handleFocus = () => {
    if (window.innerWidth <= 1024) { // Check if it's a mobile screen
      setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    // Add event listeners to close sidebar when user interacts with form inputs
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
      input.addEventListener("focus", handleFocus);
    });

    // Clean up event listeners when the component is unmounted
    return () => {
      inputs.forEach(input => {
        input.removeEventListener("focus", handleFocus);
      });
    };
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://cvsu-backend-system.vercel.app/api/enrollments?email=${email}`);
        const data = await response.json();

        if (data) {
          setUserDetails(data); 
          
          // Save email in local storage if available
          if (data.email) {
            localStorage.setItem("email", data.email);
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (email) {
      fetchUserDetails();
    }
  }, [email]);

  

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("userData");
      localStorage.removeItem("email");

    navigate("/apply");
    
    }
  };
  

  const applicantType = userDetails?.applicant_type || "Not provided";
  const preferredProgram = userDetails?.preferred_program || "Not provided";

  return (
    <div className="h-screen flex overflow-auto bg-gray-100">
      {/* Sidebar */}
      <aside
  className={`w-64 bg-[#001800] text-white flex flex-col fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:relative ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
>


        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <h2
            className="text-xl font-semibold pt-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            {userDetails?.enrollment_id || "Unknown ID"} {/* Display enrollment ID from user details */}
           
          </h2>
          <h1 className="text-md font-semibold text-gray-400 text-center py-2">
            {email}
          </h1>
          <p className="text-sm text-center text-gray-400">
            {preferredProgram === "Bachelor of Science in Computer Science"
              ? "BSCS"
              : preferredProgram === "Bachelor of Science in Information Technology"
              ? "BSIT"
              : preferredProgram || "Not provided"} |{" "}
          
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
                    <span>Schedule Appointment</span>
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
                    <span>Documents Verification</span>
                  </button>
                </li>
                <li className={activeItem === '/entrance-examination' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">8.</span>
                    <span>Student Evaluation</span>
                  </button>
                </li>
                <li className={activeItem === '/document-submission' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">9.</span>
                    <span>Documents Submission</span>
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
               
                <li className={activeItem === '/enrollment-completed' ? 'active' : ''}>
                  <button
                    className="px-4 py-2 flex items-center space-x-3  rounded-lg cursor-default
                     text-white"
                  >
                    <span className="text-xl font-semibold">11.</span>
                    <span>Enrollment Completion</span>
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
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-red-600 rounded-lg cursor-default mt-auto"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile and Desktop Menu Button */}
      <button
      className="lg:block fixed top-4 left-4 z-50 bg-[#081708] text-white p-2 rounded-md"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle open/close
      >
      {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>



      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto h-full p-8 transition-all duration-300 ${isSidebarOpen ? '' : 'lg:-ml-64'}`}>
      <Outlet context={{ userDetails }} /> {/* Passing userDetails to Outlet */}
      </main>
    </div>
  );
};

export default AdmissionsPage;