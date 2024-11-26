import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";


const Details = () => {
  // Access values from the context
  const { applicantType, seniorHighTrack, strand, preferredProgram } = useAppContext();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Mapping of abbreviations to full names
  const fullNames = {
    als: "Alternative Learning System (ALS) Passer",
    foreign: "Foreign Undergraduate Student Applicant",
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

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
  {/* Header Section */}
  <div>
    <div className="text-center my-10">
      <h1 className="text-3xl font-extrabold text-[#001800]">
        Application Details
      </h1>
      <h2 className="text-lg text-gray-600">
        Please review your Application Information.
      </h2>
    </div>

    {/* Application Details */}
    <div className="mb-6 mx-11">
      <p className="text-gray-600 text-lg font-semibold mb-2">
        Applicant Type:
      </p>
      <p className="text-[#081708] text-lg">
        {fullNames[applicantType] || applicantType || "Not provided"}
      </p>
    </div>

    {seniorHighTrack && (
      <div className="mb-6 mx-11">
        <p className="text-gray-600 text-lg font-semibold mb-2">
          Senior High Track:
        </p>
        <p className="text-[#081708] text-lg">
          {fullNames[seniorHighTrack] || seniorHighTrack || "Not provided"}
        </p>
      </div>
    )}

    {strand && (
      <div className="mb-6 mx-11">
        <p className="text-gray-600 text-lg font-semibold mb-2">Strand:</p>
        <p className="text-[#081708] text-lg">
          {fullNames[strand] || strand || "Not provided"}
        </p>
      </div>
    )}

    <div className="mb-6 mx-11">
      <p className="text-gray-600 text-lg font-semibold mb-2">
        Preferred Program:
      </p>
      <p className="text-[#081708] pb-11 text-lg">
        {preferredProgram || "Not provided"}
      </p>
    </div>
  </div>

  {/* Next Button */}
  <div className="flex justify-end gap-5 mb-5 mx-5">
    <button
      className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
      disabled={isButtonDisabled}
      onClick={() => alert("Application submitted successfully!")}
    >
      Prev
    </button>
    <Link 
    to='/createapplication/personal'>
    <button
      className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none"

    >
      Next
    </button>
    </Link>
  </div>
</div>
  );
};

export default Details;
