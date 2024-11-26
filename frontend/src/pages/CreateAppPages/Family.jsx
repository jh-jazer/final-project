  import React, { useState } from 'react';
  import { Link,useNavigate } from "react-router-dom";

  const Family = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
      fatherName: '',
      motherName: '',
      fatherOccupation: '',
      motherOccupation: '',
      numberOfSiblings: '',
      familyIncome: '',
      familyAddress: '',
      additionalInfo: ''
    });

    const [errors, setErrors] = useState({
      fatherName: '',
      motherName: '',
      fatherOccupation: '',
      motherOccupation: '',
      numberOfSiblings: '',
      familyIncome: '',
      familyAddress: ''
    });

    const validate = () => {
      let validationErrors = {};
      let isValid = true;

      // Validate required fields
      if (!formData.fatherName) {
        validationErrors.fatherName = "Father's Name is required.";
        isValid = false;
      }
      if (!formData.motherName) {
        validationErrors.motherName = "Mother's Name is required.";
        isValid = false;
      }
      if (!formData.fatherOccupation) {
        validationErrors.fatherOccupation = "Father's Occupation is required.";
        isValid = false;
      }
      if (!formData.motherOccupation) {
        validationErrors.motherOccupation = "Mother's Occupation is required.";
        isValid = false;
      }
      if (!formData.numberOfSiblings) {
        validationErrors.numberOfSiblings = "Number of Siblings is required.";
        isValid = false;
      } else if (isNaN(formData.numberOfSiblings) || formData.numberOfSiblings < 0) {
        validationErrors.numberOfSiblings = "Number of Siblings must be a valid non-negative number.";
        isValid = false;
      }
      if (!formData.familyIncome) {
        validationErrors.familyIncome = "Family Income is required.";
        isValid = false;
      } else if (isNaN(formData.familyIncome)) {
        validationErrors.familyIncome = "Family Income must be a valid number.";
        isValid = false;
      }
      if (!formData.familyAddress) {
        validationErrors.familyAddress = "Family Address is required.";
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
        setIsButtonDisabled(
          !newFormData.fatherName || !newFormData.motherName || !newFormData.fatherOccupation ||
          !newFormData.motherOccupation || !newFormData.numberOfSiblings || !newFormData.familyIncome || 
          !newFormData.familyAddress
        );
        return newFormData;
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (validate()) {
        // If form is valid, proceed with form submission
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
          
          <div>
          <form onSubmit={handleSubmit}>

            {/* Father's Name */}
             <div className='mx-11 mb-6'>
              <div className="form-group text-lg font-sans text-gray-600">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="fatherName">Father's Name*</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                placeholder="Father Name"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
            </div>

            {/* Mother's Name */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="motherName">Mother's Name*</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                placeholder="Mother Name"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.motherName && <p className="text-red-500 text-sm">{errors.motherName}</p>}
            </div>

            {/* Father's Occupation */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="fatherOccupation">Father's Occupation*</label>
              <input
                type="text"
                id="fatherOccupation"
                name="fatherOccupation"
                placeholder="Father Occupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.fatherOccupation && <p className="text-red-500 text-sm">{errors.fatherOccupation}</p>}
            </div>

            {/* Mother's Occupation */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="motherOccupation">Mother's Occupation*</label>
              <input
                type="text"
                id="motherOccupation"
                name="motherOccupation"
                placeholder="Mother Occupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.motherOccupation && <p className="text-red-500 text-sm">{errors.motherOccupation}</p>}
            </div>

            {/* Number of Siblings */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="numberOfSiblings">Number of Siblings*</label>
              <input
                type="number"
                id="numberOfSiblings"
                name="numberOfSiblings"
                placeholder="Number of Siblings"
                value={formData.numberOfSiblings}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.numberOfSiblings && <p className="text-red-500 text-sm">{errors.numberOfSiblings}</p>}
            </div>

            {/* Family Income */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="familyIncome">Family Income (Annual)*</label>
              <input
                type="text"
                id="familyIncome"
                name="familyIncome"
                placeholder="Family Income"
                value={formData.familyIncome}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.familyIncome && <p className="text-red-500 text-sm">{errors.familyIncome}</p>}
            </div>

            {/* Family Address */}
            <div className="form-group">
              <label className='text-gray-600 text-lg font-semibold' htmlFor="familyAddress">Family Address*</label>
              <input
                type="text"
                id="familyAddress"
                name="familyAddress"
                placeholder="Family Address"
                value={formData.familyAddress}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              />
              {errors.familyAddress && <p className="text-red-500 text-sm">{errors.familyAddress}</p>}
            </div>

          
            {/* Submit Button */}
            <div className="flex justify-end gap-5 mb-5 mx-5">
              <Link to="/createapplication/personal">
                <button
                  className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
                >
                  Prev
                </button>
                </Link>
                
                <Link to="/createapplication/family">
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

  export default Family;
