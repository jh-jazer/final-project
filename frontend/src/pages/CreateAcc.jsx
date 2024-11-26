import React, { useState, useEffect } from "react";
import AdmissionNav from "../components/AdmissionNav";
import { useAppContext } from "../contexts/AppContext";
import Laya from "../assets/laya.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Create = () => {
  const {
    applicantType,
    setApplicantType,
    seniorHighTrack,
    setSeniorHighTrack,
    preferredProgram,
    setPreferredProgram,
  } = useAppContext();

  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Config for strands and programs
  const strandOptions = {
    "Academic": [
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
    "Sports": [
      { value: "sports", label: "Sports" },
    ],
  };

  const programOptions = {
    stem: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    abm: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    humss: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    gas: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    afa: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    he: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    ia: ["Bachelor of Science in Computer Science.e", "Bachelor of Science in Information Technology"],
    ict: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"],
    ad: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"], // Programs for Arts and Design
    sports: ["Bachelor of Science in Computer Science.", "Bachelor of Science in Information Technology"], // Programs for Sports
  };

  // Disable the submit button based on form state
  useEffect(() => {
    if (applicantType && preferredProgram) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [applicantType, preferredProgram]);

  // Form Submission Handler
  const handleSubmit = () => {
    if (
      ["shs", "grade12"].includes(applicantType) &&
      !["stem", "ict"].includes(seniorHighTrack)
    ) {
      setErrorMessage(
        "You must be a STEM or ICT student to choose the selected program."
      );
      return;
    }

    setErrorMessage("");
    alert("Application successfully created!");
    navigate("/createapplication/details"); // Redirect to details page upon successful submission
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
      <AdmissionNav user={null} />
      <div className="top-0 left-0 w-full h-full bg-[#081708]/80 flex fixed items-center justify-center z-10"></div>
      <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg z-30">
        <div className="flex justify-center items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#C61A01] text-center mb-2">
              Admission Application
            </h1>
            <h2 className="text-xl font-bold text-gray-700 text-center">
              Computer Studies Department - First Semester, 2025-2026
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
            onChange={(e) => setApplicantType(e.target.value)}
          >
            <option value="" disabled>
              Choose a type of applicant
            </option>
            <option value="als">Alternative Learning System (ALS) Passer</option>
            <option value="foreign">Foreign Undergraduate Student Applicant</option>
            <option value="shs">Senior High School Graduate</option>
            <option value="grade12">Currently Enrolled Grade 12 Student</option>
            <option value="bachelors">Bachelor's Degree Graduate</option>
            <option value="transferee">Transferee</option>
          </select>
        </div>

        {/* Program Selection Based on Applicant Type */}
        {["als", "foreign", "transferee", "bachelors"].includes(applicantType) && (
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
              <option value="cs">Bachelor of Science in Computer Science.</option>
              <option value="it">Bachelor of Science in Information Technology</option>
            </select>
          </div>
        )}

        {/* Senior High Track and Strand */}
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
                  setPreferredProgram(""); // Clear previous program selection
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

            {seniorHighTrack && seniorHighTrack !== "Arts and Design" && seniorHighTrack !== "Sports" && (
              <div className="mb-6">
                <p className="text-gray-700 text-lg font-semibold mb-2">
                  What is your strand?
                </p>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
                  value={preferredProgram}
                  onChange={(e) => setPreferredProgram(e.target.value)}
                >
                  <option value="" disabled>
                    Select your strand's program
                  </option>
                  {strandOptions[seniorHighTrack]?.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Preferred Program Selection (if Arts or Sports) */}
            {(seniorHighTrack === "Arts and Design" || seniorHighTrack === "Sports") && (
              <div className="mb-6">
                <p className="text-gray-700 text-lg font-semibold mb-2">
                  Select your program:
                </p>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C61A01] focus:border-transparent"
                  value={preferredProgram}
                  onChange={(e) => setPreferredProgram(e.target.value)}
                >
                  <option value="" disabled>
                    Select a program
                  </option>
                  {programOptions[seniorHighTrack]?.map((program, index) => (
                    <option key={index} value={program}>
                      {program}
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
                    <option key={index} value={program.toLowerCase()}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        {errorMessage && (
          <div className="mb-6 text-red-500 text-center font-semibold">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-center">
          <button
            disabled={isButtonDisabled}
            onClick={handleSubmit}
            className="bg-[#C61A01] text-white text-xl font-semibold py-3 px-12 rounded-lg disabled:bg-gray-400"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
