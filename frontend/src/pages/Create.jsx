import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/cvsulogo.png";
import { Link } from "react-router-dom";
import Laya from "../assets/laya.png";
import { useActiveItem } from "../contexts/CreateAppContext";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

const Create = () => {
  const {
    applicantType,
    setApplicantType,
    seniorHighTrack,
    setSeniorHighTrack,
    strand,
    setStrand,
    preferredProgram,
    setPreferredProgram,
  } = useAppContext();

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { setActiveItem } = useActiveItem();

  const { userData } = location.state || {};

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => setDropdownVisible(prev => !prev);

  useEffect(() => {
    if (applicantType && preferredProgram) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [applicantType, preferredProgram]);
  
// Check if email exists on component load
useEffect(() => {
  const checkExistingEmail = async () => {
    if (userData?.email) {
      const emailExists = await checkEmailExists(userData.email);
      if (emailExists) {
        // Navigate to createapplication page with the email
        navigate("/createapplication", { state: { email: userData.email } });
      }
    }
  };
  checkExistingEmail();
}, [userData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setApplicantType("");
    setSeniorHighTrack("");
    setStrand("");
    setPreferredProgram("");
    navigate("/apply");
  };

  const strandOptions = {
    Academic: [
      { value: "stem", label: "Science, Technology, Engineering, and Mathematics (STEM)" },
      { value: "abm", label: "Accountancy, Business, and Management (ABM)" },
      { value: "humss", label: "Humanities and Social Sciences (HUMSS)" },
      { value: "gas", label: "General Academic Strand (GAS)" },
    ],
    "Technical-Vocational": [
      { value: "afa", label: "Agri-Fishery Arts (AFA)" },
      { value: "he", label: "Home Economics (HE)" },
      { value: "ia", label: "Industrial Arts (IA)" },
      { value: "ict", label: "Information and Communications Technology (ICT)" },
    ],
    "Arts and Design": [{ value: "ad", label: "Arts and Design" }],
    Sports: [{ value: "sports", label: "Sports" }],
  };

  const programOptions = {
    stem: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    abm: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    humss: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    gas: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    afa: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    he: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    ia: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    ict: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    ad: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
    sports: ["Bachelor of Science in Computer Science", "Bachelor of Science in Information Technology"],
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch("https://cvsu-backend-system.vercel.app/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const saveEnrollmentData = async (enrollmentData) => {
    try {
      const response = await fetch("https://cvsu-backend-system.vercel.app/save-enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollmentData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving enrollment data:", error);
      return { success: false };
    }
  };

  const generateUniqueEnrollmentId = (applicantType, preferredProgram) => {
    // Get initials from applicantType (first 2 characters) and program (first 3 characters)
    const applicantTypeInitial = applicantType.slice(0, 2).toUpperCase(); // First 2 letters of applicant type
    const programInitialValue = programInitial(preferredProgram); // Get program initials based on custom logic
    
    // Get the current timestamp in milliseconds
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of the timestamp (for uniqueness)
  
    // Generate random string of digits (e.g., 4 digits)
    const randomPart = Math.floor(Math.random() * 10000); // Random 4-digit number
  
    // Combine everything into a single enrollment ID
    return `${applicantTypeInitial}${programInitialValue}${timestamp}${randomPart}`;
  };

  const programInitial = preferredProgram => {
    if (preferredProgram === "Bachelor of Science in Computer Science") {
      return "CS"; // For Computer Science
    } else if (preferredProgram === "Bachelor of Science in Information Technology") {
      return "IT"; // For Information Technology
    } else {
      return preferredProgram ? preferredProgram.split(" ")[0].slice(0, 3).toUpperCase() : ""; // Default behavior
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    if (["shs", "grade12"].includes(applicantType) && !["stem", "ict"].includes(strand)) {
      setErrorMessage("You must be a STEM or ICT student to choose the selected program.");
      setLoading(false);
      return;
    }

    const enrollmentId = await generateUniqueEnrollmentId(applicantType, preferredProgram);
    const emailExists = await checkEmailExists(userData.email);

    if (emailExists) {
      setErrorMessage("This email is already registered. Redirecting...");
      setLoading(false);
      navigate("/createapplication", { state: { email: userData.email } });
      return;
    }

    const enrollmentData = {
      email: userData.email,
      enrollmentId,
      applicantType,
      preferredProgram,
      strand,
      seniorHighTrack,
    };

    const result = await saveEnrollmentData(enrollmentData);

    if (result.success) {
      alert("Application successfully created!");

       // Reset the form
    setApplicantType("");
    setSeniorHighTrack("");
    setStrand("");
    setPreferredProgram("");

      navigate("/createapplication", { state: { enrollmentData } });
    } else {
      setErrorMessage("An error occurred while creating your application. Please try again.");
    }

    setLoading(false);
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center pb-[70px] pt-[70px]"
      style={{
        backgroundImage: `url(${Laya})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
      <nav className="bg-white bg-opacity-20 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center pr-5 py-3 bg-[#E8E8E8] shadow-lg">
          {/* Logo Section */}
          <div className="logo transition-transform duration-300 hover:scale-110">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-[80px]" />
            </Link>
          </div>

          {/* User Profile Section */}
          <div className="relative flex items-center space-x-4"> {/* Added relative positioning here */}
              {userData ? (
                <>
                  {/* Profile Picture */}
                  {userData.picture && (
                    <img
                      src={userData.picture}
                      alt="User Profile"
                      className="w-12 h-12 rounded-full border-2 border-[#C61A01] cursor-pointer"
                      onClick={toggleDropdown} // Toggle dropdown on click
                    />
                  )}

                  {/* Dropdown Menu */}
                  {dropdownVisible && (
              <div className="profile-dropdown absolute  left-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#C61A01] hover:text-white transition-colors duration-200 rounded-lg"
                    >
                      <FaSignOutAlt className="mr-2 inline" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}


                  {/* User Welcome Message */}
                  <div className="hidden md:block text-sm pr-6">
                    <h2 className="font-semibold text-[#C61A01]">Welcome,</h2>
                    <p className="text-gray-500">{userData.email}</p>
                  </div>
                </>
              ) : (
                <p>No user data found</p>
              )}

          </div>
        </div>
      </nav>

      </div>
      <div className="top-0 left-0 w-full h-full  bg-[#081708]/80 flex fixed items-center justify-center z-10"></div>
      <div className="w-full max-w-2xl mx-7 bg-white mt-[5%] p-8 shadow-lg rounded-lg z-30">
        <div className="flex justify-center  items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#C61A01] text-center mb-2">
              Admission Application
            </h1>
            <h2 className="text-lg font-bold text-gray-700 text-center">
              CSD - First Semester, 2025-2026
            </h2>
          </div>
        </div>

        {/* Applicant Type Selection */}
        <div className="mb-6">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            What type of applicant are you?
          </p>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
            value={applicantType}
            onChange={(e) => {
              const value = e.target.value;
              setApplicantType(value);

              // Reset other fields based on applicant type
              if (["als", "transferee"].includes(value)) {
                setStrand("null");
                setSeniorHighTrack("null");
                setPreferredProgram("");
              } else {
                setStrand("");
                setSeniorHighTrack("");
                setPreferredProgram("");
              }
            }}
          >
            <option value="" disabled>
              Choose a type of applicant
            </option>
            <option value="grade12">Currently Enrolled Grade 12 Student</option>
            <option value="shs">Senior High School Graduate</option>  
            <option value="als">Alternative Learning System (ALS) Passer</option>
            <option value="transferee">Transferee</option>
          </select>
        </div>

        {/* Preferred Program */}
        {["als", "transferee"].includes(applicantType) && (
          <div className="mb-6">
            <p className="text-gray-700 text-lg font-semibold mb-2">
              Choose your preferred program:
            </p>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
              value={preferredProgram}
              onChange={(e) => setPreferredProgram(e.target.value)}
              
            >
              <option value="" disabled>
                Select a program
              </option>
              {programOptions.stem.map((program, index) => (
                <option key={index} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* SHS/Grade 12 Questions */}
        {["shs", "grade12"].includes(applicantType) && (
          <>
            <div className="mb-6">
              <p className="text-gray-700 text-lg font-semibold mb-2">
                What is your senior high school track?
              </p>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
                value={seniorHighTrack}
                onChange={(e) => {
                  setSeniorHighTrack(e.target.value);
                  setStrand("");
                  setPreferredProgram("");
                }}
              >
                <option value="" disabled>
                  Select your track
                </option>
                {Object.keys(strandOptions).map((track) => (
                  <option key={track} value={track}>
                    {track.replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            {seniorHighTrack && (
              <div className="mb-6">
                <p className="text-gray-700 text-lg font-semibold mb-2">
                  What is your strand?
                </p>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
                  value={strand}
                  onChange={(e) => {
                    setStrand(e.target.value);
                    setPreferredProgram("");
                  }}
                >
                  <option value="" disabled>
                    Select a strand
                  </option>
                  {strandOptions[seniorHighTrack].map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {strand && (
              <div className="mb-6">
                <p className="text-gray-700 text-lg font-semibold mb-2">
                  What is your preferred program?
                </p>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
                  value={preferredProgram}
                  onChange={(e) => setPreferredProgram(e.target.value)}
                >
                  <option value="" disabled>
                    Select a program
                  </option>
                  {programOptions[strand].map((program, index) => (
                    <option key={index} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}

        {/* Submit Button */}
       
          <div className="mt-6">
          <button
            type="button"
            disabled={isButtonDisabled || loading}
            onClick={handleSubmit}
            className="w-full py-2 bg-[#C61A01] text-white font-bold rounded-lg disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Continue to Details'}
          </button>

          </div>
      
      </div>
    </div>
  );
};

export default Create;