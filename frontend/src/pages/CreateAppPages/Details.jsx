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
  const id = userDetails?.id;

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

  // Handle button click to navigate and set active item
  const handleButtonClick = (item) => {
    navigate("/createapplication/personal"); // Navigate to personal section
    setActiveItem(item); // Set the active item in context
  };

  // Check if the form is complete and enable the button
  useEffect(() => {
    const isFormComplete =
      userDetails?.applicant_type &&
      userDetails?.preferred_program &&
      (userDetails?.senior_high_track || userDetails?.strand);
    setIsButtonDisabled(!isFormComplete);
  }, [userDetails]);

  // Function to render detail sections dynamically
  const renderDetail = (label, value) => (
    <div className="mb-6 mx-11">
      <p className="text-gray-600 text-lg font-semibold mb-2">{label}:</p>
      <p className="text-[#081708] text-lg">{value || "Not provided"}</p>
    </div>
  );

  const handleConfirmCancel = async () => {
    const id = userDetails?.id; // Ensure this is correct
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }
  
    try {
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/enrollments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Log the response body for debugging
        throw new Error(`Failed to delete: ${response.status} ${response.statusText} - ${errorDetails}`);
      }
  
      // If the delete is successful
      localStorage.removeItem("userData");
      localStorage.removeItem("email");
      navigate("/apply");
    } catch (error) {
      console.error("Failed to cancel application:", error);
    } finally {
      setIsModalOpen(false); // Close modal
    }
  };
  
  

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header and Navigation Button */}
      <div className="relative text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Application Details</h1>
        <button
          onClick={() => handleButtonClick("/personal")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900"
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
      {renderDetail("Applicant Type", fullNames[userDetails?.applicant_type] || userDetails?.applicant_type)}
      {userDetails?.senior_high_track &&
        renderDetail(
          "Senior High Track",
          fullNames[userDetails?.senior_high_track] || userDetails?.senior_high_track
        )}
      {userDetails?.strand &&
        renderDetail("Strand", fullNames[userDetails?.strand] || userDetails?.strand)}
      {renderDetail("Preferred Program", userDetails?.preferred_program || "Not provided")}

      {/* Cancel Application Button */}
      <div className="flex justify-end gap-5 my-11 mx-7">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
          disabled={isButtonDisabled}
        >
          Cancel Application
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
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
