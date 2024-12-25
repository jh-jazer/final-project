import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cvsulogo.png";
import { Link, useLocation } from "react-router-dom";
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
  const { userData } = location.state || {};

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { setActiveItem } = useActiveItem();

  // Disable the submit button based on form state
  useEffect(() => {
    if (applicantType && preferredProgram) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [applicantType, preferredProgram]);

  // Handle logout by clearing localStorage and navigating to the login page
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/apply");
  };

  // Config for strands and programs
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
    "Arts and Design": [
      { value: "ad", label: "Arts and Design" },
    ],
    Sports: [
      { value: "sports", label: "Sports" },
    ],
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
      const response = await fetch("https://final-project-lqbc.vercel.app/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      // Assuming the response contains a field `exists` to indicate whether the email already exists
      const data = await response.json();
  
      return data.exists; // Returns `true` if email exists, otherwise `false`
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };
  
  const saveEnrollmentData = async (enrollmentData) => {
    try {
      const response = await fetch("https://final-project-lqbc.vercel.app/save-enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData), // Send the form data as JSON
      });
  
      const data = await response.json();
      return data; // Assuming the API returns a result object with a `success` property
    } catch (error) {
      console.error("Error saving enrollment data:", error);
      return { success: false };
    }
  };
  

  const generateEnrollmentId = (applicantType, preferredProgram) => {
    // Get initials from applicantType (first 2 characters) and program (first 3 characters)
    const applicantTypeInitial = applicantType.slice(0, 2).toUpperCase(); // First 2 letters of applicant type
    const programInitial = preferredProgram ? preferredProgram.split(" ")[0].slice(0, 3).toUpperCase() : ""; // First 3 letters of program
    
    // Get the current timestamp in milliseconds
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of the timestamp (for uniqueness)
  
    // Generate random string of digits (e.g., 4 digits)
    const randomPart = Math.floor(Math.random() * 10000); // Random 4-digit number
  
    // Combine everything into a single enrollment ID
    return `${applicantTypeInitial}${programInitial}${timestamp}${randomPart}`;
  };

  const generateUniqueEnrollmentId = async (applicantType, preferredProgram) => {
    let enrollmentId = generateEnrollmentId(applicantType, preferredProgram);
  
    // Check if the enrollment ID already exists in the database
    const exists = await checkEnrollmentIdExists(enrollmentId); // Assume this function checks the DB
    if (exists) {
      // If ID exists, regenerate the ID
      return generateUniqueEnrollmentId(applicantType, preferredProgram);
    }
    return enrollmentId;
  };
  
  
 
  const handleSubmit = async () => {
    if (["shs", "grade12"].includes(applicantType) && !["stem", "ict"].includes(strand)) {
      setErrorMessage("You must be a STEM or ICT student to choose the selected program.");
      return;
    }
  
    // Generate a unique Enrollment ID
    const enrollmentId = await generateUniqueEnrollmentId(applicantType, preferredProgram);
  
    // Check if the email already exists in the database
    const emailExists = await checkEmailExists(userData.email);
  
    if (emailExists) {
      navigate("/createapplication"); // Redirect if email already exists
    } else {
      // Save the data with the generated unique enrollment ID
      const result = await saveEnrollmentData({
        email: userData.email,
        enrollmentId,
        applicantType,
        preferredProgram,
        strand,
      });
      
      if (result.success) {
        alert("Application successfully created!");
        navigate("/createapplication"); // Redirect to details page
      } else {
        setErrorMessage("An error occurred while creating your application. Please try again.");
      }
    }
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
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
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
              setApplicantType(e.target.value)
              setPreferredProgram("");
            }}
          
          >
            <option value="" disabled>
              Choose a type of applicant
            </option>
            <option value="grade12">Currently Enrolled Grade 12 Student</option>
            <option value="shs">Senior High School Graduate</option>  
            <option value="als">Alternative Learning System (ALS) Passer</option>
            <option value="bachelors">Bachelor's Degree Graduate</option>
            <option value="transferee">Transferee</option>
          </select>
        </div>

        {/* Preferred Program */}
        {["als", "transferee", "bachelors"].includes(applicantType) && (
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
              disabled={isButtonDisabled}
              onClick={() => handleSubmit('/createapplication')}
              className="w-full py-2 bg-[#C61A01] text-white font-bold rounded-lg  disabled:bg-gray-400"
            >
              Continue to Details
            </button>
          </div>
      
      </div>
    </div>
  );
};

export default Create;
