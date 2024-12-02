import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from "../../contexts/AppContext";

const Education = () => {
  const navigate = useNavigate();
  const { applicantType } = useAppContext(); // Correctly call useAppContext

  // Determine if college fields should be shown
  const showCollegeFields = applicantType === 'transferee' || applicantType === 'bachelors';

  // Form Data State
  const [formData, setFormData] = useState({
    elementarySchoolName: '',
    elementarySchoolAddress: '',
    elementarySchoolYearGraduated: '',
    highSchoolName: '',
    highSchoolAddress: '',
    highSchoolYearGraduated: '',
    seniorHighSchoolName: '',
    seniorHighSchoolAddress: '',
    seniorHighSchoolYearGraduated: '',
    collegeName: '',
    collegeAddress: '',
    collegeYearGraduated: '',
    collegeDegree: '',
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  // Button Disabled State
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validate Form Fields
  const validateField = (name, value) => {
    let error = '';

    if (!value.trim() && (showCollegeFields || !name.includes('college'))) {
      error = `${name.replace(/([A-Z])/g, ' $1')} is required.`;
    }

    if (name.includes('YearGraduated') && value) {
      const currentYear = new Date().getFullYear();
      if (value < 1900 || value > currentYear) {
        error = `Enter a valid year between 1900 and ${currentYear}.`;
      }
    }

    return error;
  };

  // Update Validation State on Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Check Form Validity and Update Button State
  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== '');
    const allFieldsFilled = Object.entries(formData).every(([key, value]) => {
      if (!showCollegeFields && key.includes('college')) {
        return true; // Ignore college fields if they are hidden
      }
      return value.trim() !== '';
    });

    setIsButtonDisabled(hasErrors || !allFieldsFilled);
  }, [errors, formData, showCollegeFields]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    Object.entries(formData).forEach(([field, value]) => {
      if (showCollegeFields || !field.includes('college')) {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed to the next page if valid
      navigate('/createapplication/requirements');
    } else {
      console.log('Form contains errors:', newErrors);
    }
  };

  // Reusable Input Component
  const InputField = ({ label, name, type = 'text', placeholder }) => (
    <div className="form-group mb-4">
      <label htmlFor={name} className="block text-lg font-semibold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        aria-describedby={`${name}Error`}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      {errors[name] && (
        <p id={`${name}Error`} className="text-red-500 text-sm">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col">
      {/* Header Section */}
      <div className="text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Educational Information</h1>
        <h2 className="text-lg text-gray-600">Please fill out your Educational Information.</h2>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Elementary School Section */}
        <fieldset className="mx-5">
          <legend className="text-3xl font-bold text-gray-800 mb-2">Elementary School</legend>
          <InputField
            label="School Name"
            name="elementarySchoolName"
            placeholder="Enter Elementary School Name"
          />
          <InputField
            label="School Address"
            name="elementarySchoolAddress"
            placeholder="Enter School Address"
          />
          <InputField
            label="Year Graduated"
            name="elementarySchoolYearGraduated"
            type="number"
            placeholder="Enter Graduation Year"
          />
        </fieldset>

        {/* High School Section */}
        <fieldset className="mx-5">
          <legend className="text-3xl font-bold text-gray-800 mb-2">High School</legend>
          <InputField
            label="School Name"
            name="highSchoolName"
            placeholder="Enter High School Name"
          />
          <InputField
            label="School Address"
            name="highSchoolAddress"
            placeholder="Enter School Address"
          />
          <InputField
            label="Year Graduated"
            name="highSchoolYearGraduated"
            type="number"
            placeholder="Enter Graduation Year"
          />
        </fieldset>

        {/* Senior High School Section */}
        <fieldset className="mx-5">
          <legend className="text-3xl font-bold text-gray-800 mb-2">Senior High School</legend>
          <InputField
            label="School Name"
            name="seniorHighSchoolName"
            placeholder="Enter Senior High School Name"
          />
          <InputField
            label="School Address"
            name="seniorHighSchoolAddress"
            placeholder="Enter School Address"
          />
          <InputField
            label="Year Graduated"
            name="seniorHighSchoolYearGraduated"
            type="number"
            placeholder="Enter Graduation Year"
          />
        </fieldset>

        {/* College Section (Conditional) */}
        {showCollegeFields && (
          <fieldset className="mx-5">
            <legend className="text-3xl font-bold text-gray-800 mb-2">College</legend>
            <InputField
              label="College Name"
              name="collegeName"
              placeholder="Enter College Name"
            />
            <InputField
              label="College Address"
              name="collegeAddress"
              placeholder="Enter College Address"
            />
            <InputField
              label="Year Graduated"
              name="collegeYearGraduated"
              type="number"
              placeholder="Enter Graduation Year"
            />
            <InputField
              label="Degree"
              name="collegeDegree"
              placeholder="Enter Degree (e.g., BS Computer Science)"
            />
          </fieldset>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link to="/createapplication/family">
            <button
              type="button"
              className="px-6 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-600"
            >
              Prev
            </button>
          </Link>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`px-6 py-2 text-white font-bold rounded-lg ${
              isButtonDisabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#345e34] hover:bg-green-900'
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Education;
