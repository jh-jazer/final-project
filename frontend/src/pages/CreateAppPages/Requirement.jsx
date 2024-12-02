import React, { useState, useEffect} from 'react';
import '../CreateApppagesCSS/Requirement.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

const Requirement = () => {
  const { applicantType } = useAppContext(); // Access applicant type from the context
  const [applicantRequirements, setApplicantRequirements] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  const requirementMapping = {
    shs: [
      'Upload your Grade 12 Report Card',
      'Upload a 2x2 Picture',
      'Upload your Certificate of non-issuance of Form 137',
    ],
    transferee: [
      'Upload your Certificate of grades or transcript of records of all enrolled semesters',
      'Upload a 2x2 Picture',
    ],
    als: [
      'Upload your Certificate of rating with college eligibility remark',
      'Upload a 2x2 Picture',
    ],
    grade12: [
      'Upload your Accomplished Grade 11 Report Card',
      'Upload your Certification of Grade 12 Enrollment with strand',
      'Upload a 2x2 Picture',
    ],
    bachelors: [
      'Upload your Complete Transcript of Records with date of graduation',
      'Upload a 2x2 Picture',
    ],
  };

  useEffect(() => {
    if (applicantType && requirementMapping[applicantType]) {
      setApplicantRequirements(requirementMapping[applicantType]);
      setUploadedFiles(Array(requirementMapping[applicantType].length).fill(null));
      setImagePreviews(Array(requirementMapping[applicantType].length).fill(null));
    }
  }, [applicantType]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
      formData.append('applicantType', applicantType);

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
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col">
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
        <Link to="/createapplication/education" className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <button className="text-[#345e34] hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#001800]">Personal Information</h1>
        <Link to="/createapplication/appointment" className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <button
            className={`text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isNextButtonDisabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
      
      <div className="bg-gray-800 text-white px-4 rounded pb-6 mb-3">
        <h3 className="text-lg text-white font-bold mb-2">Directions</h3>
        <ul  className="list-disc pl-6">
          <li>Upload the scanned pages of your requirements individually.</li>
          <li>You can only upload PNG, JPEG, and BMP images.</li>
          <li>There is a 1MB (1024 KB) total size limit per requirement.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <ul className="mb-6">
          {applicantRequirements.map((req, index) => (
            <li key={index} className="mb-4">
              <label htmlFor={`requirement-${index}`}>{req}</label>
              <input
                id={`requirement-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                required
                className="mt-2"
              />
              {imagePreviews[index] && (
                <div className="mt-2">
                  <img
                    src={imagePreviews[index]}
                    alt={`Preview ${index}`}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className={`submit-btn`}
          
        >
          Submit Requirements
        </button>
      </form>
    </div>
  );
};

export default Requirement;
