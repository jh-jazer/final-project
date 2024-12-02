import React, { useState, useEffect } from 'react';
import '../CreateApppagesCSS/Requirement.css';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

const Requirement = () => {
  const { applicantType } = useAppContext(); // Access applicant type from the context
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [applicantRequirements, setApplicantRequirements] = useState([]);

  // Mapping applicant types to required documents
  const requirementMapping = {
    shs: [
      'Grade 12 Report Card*',
      'Certificate of non-issuance of Form 137*',
    ],
    transferee: [
      'Certificate of grades or transcript of records of all enrolled semesters*',
    ],
    als: [
      'Certificate of rating with college eligibility remark*',
    ],
    grade12: [
      'Accomplished Grade 11 Report Card*',
      'Certification of Grade 12 Enrollment with strand*',
    ],
    bachelors: [
      'Complete Transcript of Records with date of graduation*',
    ],
  };

  // Update applicant-specific requirements when applicant type changes
  useEffect(() => {
    if (applicantType && requirementMapping[applicantType]) {
      setApplicantRequirements(requirementMapping[applicantType]);
    }
  }, [applicantType]);

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (newRequirement.trim() !== '' && newImage) {
      const requirementData = {
        name: newRequirement,
        image: URL.createObjectURL(newImage), // Create an object URL for the uploaded image
      };
      setRequirements((prevRequirements) => [...prevRequirements, requirementData]);
      setNewRequirement(''); // Clear the input field after adding
      setNewImage(null); // Clear the image after adding
    } else {
      alert('Please provide both a name and an image for the requirement.');
    }
  };

  const handleDeleteRequirement = (index) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewImage(file); // Store the selected image file
    } else {
      alert('Please select a valid image file');
    }
  };

  // Enable the "Next" button only if at least one requirement is added
  useEffect(() => {
    setIsButtonDisabled(requirements.length === 0);
  }, [requirements]);

  return (
    <div className="requirement-form-container">
      <h2 className="text-3xl font-extrabold flex justify-center items-center">
        Upload Requirements
      </h2>

      <h3 className="text-xl font-semibold my-4">
        Required Documents for {applicantType || 'Applicant'}:
      </h3>
      <ul className="mb-6">
        {applicantRequirements.map((req, index) => (
          <li key={index} className="mb-2">
            {req}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddRequirement}>
        <div className="form-group">
          <label htmlFor="requirementName">Requirement Name</label>
          <input
            type="text"
            id="requirementName"
            name="requirementName"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            placeholder="Enter requirement name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirementImage">Upload Document Image</label>
          <input
            type="file"
            id="requirementImage"
            name="requirementImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Requirement
        </button>
      </form>

      <div className="requirements-list">
        <h3>Uploaded Documents</h3>
        <ul>
          {requirements.map((requirement, index) => (
            <li key={index} className="requirement-item">
              <div>
                <strong>{requirement.name}</strong>
                {requirement.image && (
                  <img
                    src={requirement.image}
                    alt={requirement.name}
                    style={{ width: '100px', height: 'auto', marginLeft: '10px' }}
                  />
                )}
              </div>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteRequirement(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-5 mb-5 mx-5">
        <Link to="/createapplication/education">
          <button className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400">
            Prev
          </button>
        </Link>

        <Link to="/createapplication/appointment">
          <button
            className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none"
            disabled={isButtonDisabled}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Requirement;
