import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from "react-router-dom";

const Requirement = () => {
  const { userDetails } = useOutletContext();
  const [applicantRequirements, setApplicantRequirements] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [binaryData, setBinaryData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const { setActiveItem } = useActiveItem();
  const divRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingAppointment, setIsExistingAppointment] = useState(false);
  


  const requirementMapping = {
    shs: ["Grade 12 Report Card", "Certificate of non-issuance of Form 137", "2x2 Picture"],
    transferee: ["Certificate of grades or transcript of records of all enrolled semesters", "2x2 Picture"],
    als: ["Certificate of rating with college eligibility remark", "2x2 Picture"],
    grade12: ["Accomplished Grade 11 Report Card", "Certification of Grade 12 Enrollment with strand", "2x2 Picture"],
  };

  useEffect(() => {
    if (userDetails?.applicant_type && requirementMapping[userDetails.applicant_type]) {
      setApplicantRequirements(requirementMapping[userDetails.applicant_type]);
      setUploadedFiles(Array(requirementMapping[userDetails.applicant_type].length).fill(null));
      setBinaryData(Array(requirementMapping[userDetails.applicant_type].length).fill(null));
      setImagePreviews(Array(requirementMapping[userDetails.applicant_type].length).fill(null));
    }
  }, [userDetails]);

           // Effect to enable or disable the button based on form completion
   useEffect(() => {
     setIsNextButtonDisabled(!isExisting());
   }, [isExistingAppointment]);
 
   const isExisting = () => isExistingAppointment
  
  useEffect(() => {
    if (userDetails?.enrollment_id) {
      const checkEnrollmentId = async () => {
        try {
          const response = await fetch(`https://cvsu-backend-system.vercel.app/api/check-enrollment/${userDetails.enrollment_id}`);
          const data = await response.json();
  
          if (data.exists) {
            setSuccessMessage("Enrollment ID is already in use.");
            setTimeout(() => setSuccessMessage(""), 5000);

            setIsExistingAppointment(true);

          } else {
            setSuccessMessage("Enrollment ID is available.");
            setTimeout(() => setSuccessMessage(""), 5000);

          }
        } catch (error) {
          setErrorMessage("Error checking enrollment ID.");
          
        }
      };
  
      checkEnrollmentId();
    }
  }, [userDetails?.enrollment_id]);
  

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      localStorage.setItem('requirementFormComplete', 'true');
      navigate('/createapplication/appointment');
      setActiveItem(item);
    }
  };

  const handleSecondClick = (item) => {
    navigate('/createapplication/education');
    setActiveItem(item);
  };

   useEffect(() => {
          // Check if the personal form is completed by checking localStorage
          const educationFormComplete = localStorage.getItem('educationFormComplete');
          if (!educationFormComplete) {
            // Redirect to the personal form if it's not completed
            navigate('/createapplication');
          }
        }, [navigate]);



  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg", "image/bmp"];

    if (!file || !validTypes.includes(file.type)) {
      alert("Please upload a valid image file (PNG, JPEG, BMP).");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("File size must be less than 1MB.");
      return;
    }

    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [...imagePreviews];
    const updatedBinaryData = [...binaryData];

    const reader = new FileReader();
    reader.onload = () => {
      updatedBinaryData[index] = reader.result;
      setBinaryData(updatedBinaryData);
    };
    reader.readAsArrayBuffer(file);

    updatedFiles[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setUploadedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [...imagePreviews];
    const updatedBinaryData = [...binaryData];

    updatedFiles[index] = null;
    updatedPreviews[index] = null;
    updatedBinaryData[index] = null;

    setUploadedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
    setBinaryData(updatedBinaryData);
  };

  const handleSubmit = async (e, item) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const documents = {};

    const documentKeys = {
      shs: ["grade_11_report_card", "photo", "certificate_of_non_issuance_of_form_137"],
      transferee: ["transcripts_or_grades", "photo"],
      als: ["college_eligibility_rating", "photo"],
      grade12: ["grade_11_report_card", "grade_12_enrollment_cert", "photo"],
    };

    const keysForType = documentKeys[userDetails.applicant_type] || [];

    keysForType.forEach((key, index) => {
      if (uploadedFiles[index]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          documents[key] = reader.result.split(',')[1]; // Extract Base64 string from data URL
          if (Object.keys(documents).length === keysForType.length) {
            sendPayload(documents);
          }
        };
        reader.readAsDataURL(uploadedFiles[index]); // Convert to Base64
      } else {
        documents[key] = null; // Set null if no file is uploaded
      }
    });
  };

  const sendPayload = async (documents, item) => {
    const payload = {
      enrollment_id: userDetails.enrollment_id,
      applicantType: userDetails.applicant_type,
      documents: documents,
    };

    setIsLoading(true); // Set loading


    try {
      const response = await fetch("https://cvsu-backend-system.vercel.app/api/upload-student-documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to upload requirements. Please try again.");
      }

      setUploadedFiles(Array(applicantRequirements.length).fill(null));
      setImagePreviews(Array(applicantRequirements.length).fill(null));
      setBinaryData(Array(applicantRequirements.length).fill(null));

      
      setSuccessMessage("Requirements uploaded successfully!");
      // Set a timeout before navigating to give the user time to see the message
      setTimeout(() => {
        // Navigate to the desired route after 2 seconds
        localStorage.setItem('requirementFormComplete', 'true');
        navigate("/createapplication/appointment");  // Use item (which is '/family' in this case)
        setActiveItem(item); // Set active item (pass '/family')
      }, 2000); // Delay of 2 seconds

    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div
     ref={divRef} 
     className="w-full min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between"
     >
      {/* Render success and error messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {/* Render form elements for requirements */}
      <div className="relative text-center mb-10">
        <button
          onClick={() => handleSecondClick('/education')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-4xl font-extrabold text-green-800">
          Upload Requirements</h1>
        
        <button
          onClick={() => handleFirstClick('/appointment')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2  text-green-600 hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Directions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="bg-gray-800 text-white px-4 rounded p-6 mb-3">
        <h3 className="text-lg text-white font-bold mb-2">Directions</h3>
        <ul className="list-disc pl-6">
          <li>Upload the scanned pages of your requirements individually.</li>
          <li>You can only upload PNG, JPEG, and BMP images.</li>
          <li>There is a 1MB (1024 KB) total size limit per requirement.</li>
        </ul>
      </div>

      {/* Form for uploading files */}
      <form onSubmit={(e) => handleSubmit(e, '/appointment')}>
      <ul>
          {applicantRequirements.map((req, index) => (
            <li key={index} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor={`requirement-${index}`} className="text-lg text-gray-700 font-semibold">
                  Upload your {req}
                </label>
                <input
                  id={`requirement-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  required={!uploadedFiles[index]}
                  className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {imagePreviews[index] && (
                  <div className="flex items-center gap-2">
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              {index < applicantRequirements.length - 1 && <hr className="border-gray-300" />}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-5 mt-5">
          
        <button
          type="submit"
          className={`px-6 py-2 ${isLoading ? "bg-gray-400" : "bg-green-500"} text-white font-bold rounded-lg`}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>

        </div>
      </form>
      </div>

    </div>
  );
};

export default Requirement;
