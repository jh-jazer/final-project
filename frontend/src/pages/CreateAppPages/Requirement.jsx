import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';

const Requirement = () => {
  const { userDetails } = useOutletContext(); // Access the passed data (userDetails)
  const [applicantRequirements, setApplicantRequirements] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { setActiveItem } = useActiveItem();

  
  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/appointment');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  const handleSecondClick = (item) => {
    if (isNextButtonDisabled) {
      navigate('/createapplication/education');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  // Requirements based on the applicant type
  const requirementMapping = {
    shs: [
      'Grade 12 Report Card',
      '2x2 Picture',
      'Certificate of non-issuance of Form 137',
    ],
    transferee: [
      'Certificate of grades or transcript of records of all enrolled semesters',
      '2x2 Picture',
    ],
    als: [
      'Certificate of rating with college eligibility remark',
      '2x2 Picture',
    ],
    grade12: [
      'Accomplished Grade 11 Report Card',
      'Certification of Grade 12 Enrollment with strand',
      '2x2 Picture',
    ],
    bachelors: [
      'Complete Transcript of Records with date of graduation',
      '2x2 Picture',
    ],
  };

  useEffect(() => {
    if (userDetails?.applicant_type && requirementMapping[userDetails.applicant_type]) {
      setApplicantRequirements(requirementMapping[userDetails.applicant_type]);
      setUploadedFiles(Array(requirementMapping[userDetails.applicant_type].length).fill(null));
      setImagePreviews(Array(requirementMapping[userDetails.applicant_type].length).fill(null));
    }
  }, [userDetails]);

  useEffect(() => {
    const isFormValid =
      applicantRequirements.length > 0 &&
      uploadedFiles.length === applicantRequirements.length &&
      uploadedFiles.every((file) => file !== null);
    setIsNextButtonDisabled(!isFormValid);
  }, [uploadedFiles, applicantRequirements]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/bmp'];

    if (!file || !validTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG, JPEG, BMP).');
      return;
    }

    if (file.size > 1024 * 1024) {
      alert('File size must be less than 1MB.');
      return;
    }

    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setUploadedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...uploadedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles[index] = null;
    updatedPreviews[index] = null;

    setUploadedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    divRef.current.scrollIntoView({ behavior: "smooth" });

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      formData.append('applicantType', userDetails?.applicant_type);

      // Replace with your actual API endpoint
      const response = await fetch('/api/upload-requirements', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload requirements. Please try again.');
      }

      const result = await response.json();
      setSuccessMessage('Requirements uploaded successfully!');
      setUploadedFiles(Array(applicantRequirements.length).fill(null));
      setImagePreviews(Array(applicantRequirements.length).fill(null));
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  return (
    <div 
      ref={divRef}
      className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col">
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

      {/* Header Section */}
      <div className="relative text-center my-10">
        <button 
          onClick={() => handleSecondClick('/education')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-extrabold text-[#001800]">Requirement Submission</h1>
        <button
          onClick={() => handleFirstClick('/appointment')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="bg-gray-800 text-white px-4 rounded pb-6 mb-3">
        <h3 className="text-lg text-white font-bold mb-2">Directions</h3>
        <ul className="list-disc pl-6">
          <li>Upload the scanned pages of your requirements individually.</li>
          <li>You can only upload PNG, JPEG, and BMP images.</li>
          <li>There is a 1MB (1024 KB) total size limit per requirement.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
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
                {imagePreviews[index] && uploadedFiles[index] && (
                  <div className="flex items-center gap-4">
                    <img
                      src={imagePreviews[index]}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-600">
                        {`(${(uploadedFiles[index].size / 1024).toFixed(2)} KB of 1024 KB used)`}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {index < applicantRequirements.length - 1 && (
                <hr className="border-gray-300" />
              )}
            </li>
          ))}
        </ul>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-5 mb-5 mx-5 my-5">
          <div className="text-left">
            <button
              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
              onClick={(e) => handleSubmit(e)}
            >
              Update Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Requirement;
