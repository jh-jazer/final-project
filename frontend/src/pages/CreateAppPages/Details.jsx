import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from "react-router-dom";

const Details = () => {
  const { setActiveItem } = useActiveItem();
  const navigate = useNavigate();
  const { userDetails } = useOutletContext(); // Access the passed data

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Full names mapping for display
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

  const handleButtonClick = (item) => {
    navigate("/createapplication/personal"); // Navigate to personal section
    setActiveItem(item); // Set the active item in context
  };

  useEffect(() => {
    const isFormComplete =
      userDetails?.applicant_type &&
      userDetails?.preferred_program &&
      (userDetails?.senior_high_track || userDetails?.strand);
    setIsButtonDisabled(!isFormComplete);
  }, [userDetails]);

  const renderDetail = (label, value) => (
    <div className="mb-6">
      <p className="text-gray-600 text-lg font-semibold">{label}:</p>
      <p className="text-[#081708] text-lg bg-gray-100 rounded-lg px-4 py-2 shadow-md">
        {value || "Not provided"}
      </p>
    </div>
  );

  const handleConfirmCancel = async () => {
    try {
      await fetch(`https://cvsu-backend-system.vercel.app/api/enrollments_delete/${userDetails.id}`, {
        method: "DELETE",
      });

      localStorage.removeItem("userData");
      localStorage.removeItem("email");

      navigate("/apply"); // Redirect to create page
    } catch (error) {
      console.error("Failed to cancel application:", error);
    } finally {
      setIsModalOpen(false); // Close modal
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header Section */}
      <div className="relative text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-800">Application Details</h1>
        <button
          onClick={() => handleButtonClick("/personal")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Applicant Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderDetail("Applicant Type", fullNames[userDetails?.applicant_type] || userDetails?.applicant_type)}
        {userDetails?.senior_high_track &&
          renderDetail(
            "Senior High Track",
            fullNames[userDetails?.senior_high_track] || userDetails?.senior_high_track
          )}
        {userDetails?.strand &&
          renderDetail("Strand", fullNames[userDetails?.strand] || userDetails?.strand)}
        {renderDetail("Preferred Program", userDetails?.preferred_program || "Not provided")}
      </div>

      {/* Cancel Application Button */}
      <div className="flex justify-end gap-5 mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none ${
            isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isButtonDisabled}
        >
          Cancel Application
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Are you sure?</h2>
            <p className="text-gray-600 mb-6">This action will reset your application.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmCancel}
                className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-300 text-black font-bold rounded-lg hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
