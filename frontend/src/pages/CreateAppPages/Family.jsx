import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Family = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    fatherName: '',
    motherName: '',
    fatherOccupation: '',
    motherOccupation: '',
    fatherContact: '',
    motherContact: '',
    guardianName: '',
    guardianOccupation: '',
    guardianContact: '',
    numberOfSiblings: '',
    familyIncome: '',
    isFatherNotApplicable: false,
    isMotherNotApplicable: false,
  });

  // State for handling form validation errors
  const [errors, setErrors] = useState({});

  // State to track the disabled status of the button
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // UseEffect to track form data changes and enable/disable submit button
  useEffect(() => {
    const hasRequiredFields =
      (formData.fatherName && formData.fatherOccupation && formData.fatherContact) ||
      (formData.motherName && formData.motherOccupation && formData.motherContact) ||
      (formData.guardianName && formData.guardianOccupation && formData.guardianContact) ||
      formData.numberOfSiblings ||
      formData.familyIncome;

    setIsButtonDisabled(!hasRequiredFields);
  }, [formData]);

  // Input field change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Form validation function
  const validate = () => {
    const validationErrors = {};
    let isValid = true;

    // Validate Father's Information
    if (!formData.isFatherNotApplicable) {
      if (!formData.fatherName) {
        validationErrors.fatherName = "Father's Name is required.";
        isValid = false;
      }
      if (!formData.fatherOccupation) {
        validationErrors.fatherOccupation = "Father's Occupation is required.";
        isValid = false;
      }
      if (!formData.fatherContact) {
        validationErrors.fatherContact = "Father's Contact is required.";
        isValid = false;
      }
    }

    // Validate Mother's Information
    if (!formData.isMotherNotApplicable) {
      if (!formData.motherName) {
        validationErrors.motherName = "Mother's Name is required.";
        isValid = false;
      }
      if (!formData.motherOccupation) {
        validationErrors.motherOccupation = "Mother's Occupation is required.";
        isValid = false;
      }
      if (!formData.motherContact) {
        validationErrors.motherContact = "Mother's Contact is required.";
        isValid = false;
      }
    }

    // Validate Guardian's Information (always required)
    if (!formData.guardianName) {
      validationErrors.guardianName = "Guardian's Name is required.";
      isValid = false;
    }
    if (!formData.guardianOccupation) {
      validationErrors.guardianOccupation = "Guardian's Occupation is required.";
      isValid = false;
    }
    if (!formData.guardianContact) {
      validationErrors.guardianContact = "Guardian's Contact is required.";
      isValid = false;
    }

    // Validate Number of Siblings
    if (!formData.numberOfSiblings) {
      validationErrors.numberOfSiblings = "Number of Siblings is required.";
      isValid = false;
    } else if (isNaN(formData.numberOfSiblings) || formData.numberOfSiblings < 0) {
      validationErrors.numberOfSiblings = "Number of Siblings must be a valid non-negative number.";
      isValid = false;
    }

    // Validate Family Income
    if (!formData.familyIncome) {
      validationErrors.familyIncome = "Family Income is required.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/createapplication/education');
    } else {
      console.log("Form contains errors, submission blocked.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header Section */}
      <div className="text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Family Information</h1>
        <h2 className="text-lg text-gray-600">Please fill out your Family Information.</h2>
      </div>


      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        {/* Father's Information */}
        <div className="mx-11 mb-6">
          <h2 className="text-2xl font-bold text-gray-700 flex justify-between items-center">
            Father's Information
            <label htmlFor="isFatherNotApplicable" className="flex items-center text-lg cursor-pointer">
              <input
                type="checkbox"
                id="isFatherNotApplicable"
                name="isFatherNotApplicable"
                checked={formData.isFatherNotApplicable}
                onChange={handleInputChange}
                className="mr-2"
              />
              Not Applicable
            </label>
          </h2>
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="fatherName" className='text-gray-600 text-lg font-semibold'>Father's Name*</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              placeholder="Father Name"
              value={formData.fatherName}
              onChange={handleInputChange}
              disabled={formData.isFatherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="fatherOccupation" className='text-gray-600 text-lg font-semibold'>Father's Occupation*</label>
            <input
              type="text"
              id="fatherOccupation"
              name="fatherOccupation"
              placeholder="Father's Occupation"
              value={formData.fatherOccupation}
              onChange={handleInputChange}
              disabled={formData.isFatherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.fatherOccupation && <p className="text-red-500 text-sm">{errors.fatherOccupation}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="fatherContact" className='text-gray-600 text-lg font-semibold'>Father's Contact*</label>
            <input
              type="text"
              id="fatherContact"
              name="fatherContact"
              placeholder="Father's Contact"
              value={formData.fatherContact}
              onChange={handleInputChange}
              disabled={formData.isFatherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.fatherContact && <p className="text-red-500 text-sm">{errors.fatherContact}</p>}
          </div>
        </div>

        {/* Mother's Information */}
        <div className="mx-11 mb-6">
          <h2 className="text-2xl font-bold text-gray-700 flex justify-between items-center">
            Mother's Information
            <label htmlFor="isMotherNotApplicable" className="flex items-center text-lg cursor-pointer">
              <input
                type="checkbox"
                id="isMotherNotApplicable"
                name="isMotherNotApplicable"
                checked={formData.isMotherNotApplicable}
                onChange={handleInputChange}
                className="mr-2"
              />
              Not Applicable
            </label>
          </h2>
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="motherName" className='text-gray-600 text-lg font-semibold'>Mother's Name*</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              placeholder="Mother Name"
              value={formData.motherName}
              onChange={handleInputChange}
              disabled={formData.isMotherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="motherOccupation" className='text-gray-600 text-lg font-semibold'>Mother's Occupation*</label>
            <input
              type="text"
              id="motherOccupation"
              name="motherOccupation"
              placeholder="Mother's Occupation"
              value={formData.motherOccupation}
              onChange={handleInputChange}
              disabled={formData.isMotherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.motherOccupation && <p className="text-red-500 text-sm">{errors.motherOccupation}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="motherContact" className='text-gray-600 text-lg font-semibold'>Mother's Contact*</label>
            <input
              type="text"
              id="motherContact"
              name="motherContact"
              placeholder="Mother's Contact"
              value={formData.motherContact}
              onChange={handleInputChange}
              disabled={formData.isMotherNotApplicable}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.motherContact && <p className="text-red-500 text-sm">{errors.motherContact}</p>}
          </div>
        </div>

        {/* Guardian's Information */}
        <div className="mx-11 mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Guardian's Information</h2>
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="guardianName" className="text-gray-600 text-lg font-semibold">Guardian's Name*</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              placeholder="Guardian's Name"
              value={formData.guardianName}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.guardianName && <p className="text-red-500 text-sm">{errors.guardianName}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="guardianOccupation" className="text-gray-600 text-lg font-semibold">Guardian's Occupation*</label>
            <input
              type="text"
              id="guardianOccupation"
              name="guardianOccupation"
              placeholder="Guardian's Occupation"
              value={formData.guardianOccupation}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.guardianOccupation && <p className="text-red-500 text-sm">{errors.guardianOccupation}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="guardianContact" className="text-gray-600 text-lg font-semibold">Guardian's Contact*</label>
            <input
              type="text"
              id="guardianContact"
              name="guardianContact"
              placeholder="Guardian's Contact"
              value={formData.guardianContact}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.guardianContact && <p className="text-red-500 text-sm">{errors.guardianContact}</p>}
          </div>
        </div>

        {/* Sibling and Family Income */}
        <div className="mx-11 mb-6">
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="numberOfSiblings" className='text-gray-600 text-lg font-semibold'>Number of Siblings*</label>
            <input
              type="number"
              id="numberOfSiblings"
              name="numberOfSiblings"
              placeholder="Number of Siblings"
              value={formData.numberOfSiblings}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            />
            {errors.numberOfSiblings && <p className="text-red-500 text-sm">{errors.numberOfSiblings}</p>}
          </div>
          <div className="form-group text-lg font-sans text-gray-600 mt-4">
            <label htmlFor="familyIncome" className="text-gray-600 text-lg font-semibold">
              Family Income*
            </label>
            <select
              id="familyIncome"
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleInputChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Select Family Income</option>
              <option value="Below 11,000">Below 11,000</option>
              <option value="11,001-22,000">11,001-22,000</option>
              <option value="22,001-43,000">22,001-43,000</option>
              <option value="43,001-76,000">43,001-76,000</option>
              <option value="76,001-131,000">76,001-131,000</option>
              <option value="131,001 and Above">131,001 and Above</option>
            </select>
            {errors.familyIncome && <p className="text-red-500 text-sm">{errors.familyIncome}</p>}
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
                
            
                  <button
                    className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                  >
                    Next
                  </button>
                
              </div>
              </div>
      </form>
    </div>
  );
};

export default Family;
