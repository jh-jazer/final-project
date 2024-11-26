import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Education = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    elementarySchoolName: '',
    elementarySchoolAddress: '',
    elementarySchoolType: 'public',
    elementarySchoolYearGraduated: '',

    highSchoolName: '',
    highSchoolAddress: '',
    highSchoolType: 'public',
    highSchoolYearGraduated: '',

    seniorHighSchoolName: '',
    seniorHighSchoolAddress: '',
    seniorHighSchoolType: 'public',
    seniorHighSchoolYearGraduated: '',
  });

  // State to track validation errors
  const [errors, setErrors] = useState({
    elementarySchoolName: '',
    elementarySchoolAddress: '',
    elementarySchoolYearGraduated: '',

    highSchoolName: '',
    highSchoolAddress: '',
    highSchoolYearGraduated: '',

    seniorHighSchoolName: '',
    seniorHighSchoolAddress: '',
    seniorHighSchoolYearGraduated: '',
  });

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    // Validate elementary school fields
    if (!formData.elementarySchoolName) {
      validationErrors.elementarySchoolName = "Elementary School Name is required.";
      isValid = false;
    }
    if (!formData.elementarySchoolAddress) {
      validationErrors.elementarySchoolAddress = "Elementary School Address is required.";
      isValid = false;
    }
    if (!formData.elementarySchoolYearGraduated) {
      validationErrors.elementarySchoolYearGraduated = "Year Graduated is required for Elementary School.";
      isValid = false;
    }

    // Validate high school fields
    if (!formData.highSchoolName) {
      validationErrors.highSchoolName = "High School Name is required.";
      isValid = false;
    }
    if (!formData.highSchoolAddress) {
      validationErrors.highSchoolAddress = "High School Address is required.";
      isValid = false;
    }
    if (!formData.highSchoolYearGraduated) {
      validationErrors.highSchoolYearGraduated = "Year Graduated is required for High School.";
      isValid = false;
    }

    // Validate senior high school fields
    if (!formData.seniorHighSchoolName) {
      validationErrors.seniorHighSchoolName = "Senior High School Name is required.";
      isValid = false;
    }
    if (!formData.seniorHighSchoolAddress) {
      validationErrors.seniorHighSchoolAddress = "Senior High School Address is required.";
      isValid = false;
    }
    if (!formData.seniorHighSchoolYearGraduated) {
      validationErrors.seniorHighSchoolYearGraduated = "Year Graduated is required for Senior High School.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };

      // Check if all required fields are filled to enable the Next button
      setIsButtonDisabled(!validate());  // Enable button only when the form is valid

      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Proceed with form submission logic (e.g., API call, navigation, etc.)
      navigate('/createapplication/requirements');
    } else {
      console.log("Form contains errors, submission blocked.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">  
        {/* Header Section */}    
          <div className="text-center my-10">
            <h1 className="text-3xl font-extrabold text-[#001800]">Educational Information</h1>
            <h2 className="text-lg text-gray-600">Please fill out your Educational Information.</h2>
          </div>

          <div>
        <form onSubmit={handleSubmit}>
          {/* Elementary School Fields */}
          <div className='mx-11 mb-6'>
          <div className="form-group text-lg font-sans text-gray-600">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="elementarySchoolName">Elementary School Name</label>
            <input
              type="text"
              id="elementarySchoolName"
              name="elementarySchoolName"
              value={formData.elementarySchoolName}
              onChange={handleChange}
              required
              placeholder="Enter Elementary School Name"
            />
            {errors.elementarySchoolName && <p className="text-red-500 text-sm">{errors.elementarySchoolName}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="elementarySchoolAddress">School Address</label>
            <input
              type="text"
              id="elementarySchoolAddress"
              name="elementarySchoolAddress"
              value={formData.elementarySchoolAddress}
              onChange={handleChange}
              required
              placeholder="Enter School Address"
            />
            {errors.elementarySchoolAddress && <p className="text-red-500 text-sm">{errors.elementarySchoolAddress}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="elementarySchoolYearGraduated">Year Graduated</label>
            <input
              type="number"
              id="elementarySchoolYearGraduated"
              name="elementarySchoolYearGraduated"
              value={formData.elementarySchoolYearGraduated}
              onChange={handleChange}
              required
              placeholder="Enter Graduation Year"
            />
            {errors.elementarySchoolYearGraduated && <p className="text-red-500 text-sm">{errors.elementarySchoolYearGraduated}</p>}
          </div>

          {/* High School Fields */}
          <hr className="my-8 border-t-2 border-black" />
          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="highSchoolName">High School Name</label>
            <input
              type="text"
              id="highSchoolName"
              name="highSchoolName"
              value={formData.highSchoolName}
              onChange={handleChange}
              required
              placeholder="Enter High School Name"
            />
            {errors.highSchoolName && <p className="text-red-500 text-sm">{errors.highSchoolName}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="highSchoolAddress">School Address</label>
            <input
              type="text"
              id="highSchoolAddress"
              name="highSchoolAddress"
              value={formData.highSchoolAddress}
              onChange={handleChange}
              required
              placeholder="Enter School Address"
            />
            {errors.highSchoolAddress && <p className="text-red-500 text-sm">{errors.highSchoolAddress}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="highSchoolYearGraduated">Year Graduated</label>
            <input
              type="number"
              id="highSchoolYearGraduated"
              name="highSchoolYearGraduated"
              value={formData.highSchoolYearGraduated}
              onChange={handleChange}
              required
              placeholder="Enter Graduation Year"
            />
            {errors.highSchoolYearGraduated && <p className="text-red-500 text-sm">{errors.highSchoolYearGraduated}</p>}
          </div>

          {/* Senior High School Fields */}
          <hr className="my-8 border-t-2 border-black" />
          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="seniorHighSchoolName">Senior High School Name</label>
            <input
              type="text"
              id="seniorHighSchoolName"
              name="seniorHighSchoolName"
              value={formData.seniorHighSchoolName}
              onChange={handleChange}
              required
              placeholder="Enter Senior High School Name"
            />
            {errors.seniorHighSchoolName && <p className="text-red-500 text-sm">{errors.seniorHighSchoolName}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="seniorHighSchoolAddress">School Address</label>
            <input
              type="text"
              id="seniorHighSchoolAddress"
              name="seniorHighSchoolAddress"
              value={formData.seniorHighSchoolAddress}
              onChange={handleChange}
              required
              placeholder="Enter School Address"
            />
            {errors.seniorHighSchoolAddress && <p className="text-red-500 text-sm">{errors.seniorHighSchoolAddress}</p>}
          </div>

          <div className="form-group">
            <label className='text-gray-600 text-lg font-semibold' htmlFor="seniorHighSchoolYearGraduated">Year Graduated</label>
            <input
              type="number"
              id="seniorHighSchoolYearGraduated"
              name="seniorHighSchoolYearGraduated"
              value={formData.seniorHighSchoolYearGraduated}
              onChange={handleChange}
              required
              placeholder="Enter Graduation Year"
            />
            {errors.seniorHighSchoolYearGraduated && <p className="text-red-500 text-sm">{errors.seniorHighSchoolYearGraduated}</p>}
          </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-5 mb-5 mx-5">
              <Link to="/createapplication/family">
                <button
                  className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
                >
                  Prev
                </button>
                </Link>
                
                <Link to="/createapplication/requirement">
                  <button
                    className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                  >
                    Next
                  </button>
                </Link>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Education;
