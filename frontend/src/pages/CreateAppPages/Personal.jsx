import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';

const apiRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    return response.json();
  } catch (error) {
    console.error('Error with API request:', error);
    throw new Error('API request failed');
  }
};


const Personal = () => {
  const navigate = useNavigate();
  const { userDetails } = useOutletContext(); // Access the passed data
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    middleName: '',
    suffix: '',
    lrn: '', // Add LRN here
    sex: '',
    nationalities:'',
    dob: '',
    civilStatus: '',
    religion: '',
    phoneNumber: '',
    houseNumber:'',
    streetAddress: '',
    region:'',
    province:'',
    municipality: '',
    zipCode: '',
    country: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Tracks if 'Next' button is disabled after form update
  const [formUpdated, setFormUpdated] = useState(false); // Tracks if the form has been successfully updated
  const divRef = useRef(null);

  const { setActiveItem } = useActiveItem();
  
    // Handle button click to set the active item
  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      navigate('/createapplication/family');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  const handleSecondClick = (item) => {
    if (isNextButtonDisabled) {
      navigate('/createapplication');
      setActiveItem(item);
    } 
  };
  


  // Effect to enable or disable the button based on form completion
  useEffect(() => {
    const isFormValid = validate();
    console.log("Form Valid: ", isFormValid);  // Debugging
    console.log("Form Updated: ", formUpdated);  // Debugging
    setIsNextButtonDisabled(!(isFormValid && formUpdated));
  }, [formData, formUpdated]);

  
  

  const validate = () => {
    const validationErrors = {};
    const regex = {
      contactNumber: /^\d{11}$/,
      lrn: /^\d{12}$/, // LRN should be exactly 12 digits

    
    };

    if (!formData.givenName) validationErrors.givenName = "Given Name is required.";
    if (!formData.familyName) validationErrors.familyName = "Family Name is required.";
    if (!formData.lrn || !regex.lrn.test(formData.lrn))
      validationErrors.lrn = "LRN must be a 12-digit number.";
    if (!formData.dob) validationErrors.dob = "Date of Birth is required.";
    if (!formData.religion) validationErrors.religion = "Religion is required.";
    if (!formData.nationalities) validationErrors.nationalities = "Nationalities is required.";
    if (!formData.contactNumber || !regex.contactNumber.test(formData.contactNumber))
      validationErrors.contactNumber = "Contact Number must be 11 digits.";
    if (!formData.sex || !/^(male|female)$/i.test(formData.sex)) {
      validationErrors.sex = "Sex at birth is required and must be either 'male' or 'female'.";
    }    
    if (!formData.houseNumber) validationErrors.houseNumber = "House Number is required.";
    if (!formData.streetAddress) validationErrors.streetAddress = "Street Address is required.";
    if (!formData.region) validationErrors.region = "Region is required.";
    if (!formData.province) validationErrors.province = "Province is required.";
    if (!formData.municipality) validationErrors.municipality = "Municipality is required.";
    if (!formData.zipCode) validationErrors.zipCode = "Zip-Code is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormUpdated(true); // Mark the form as updated
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = validate();
    if (isValid) {
      const updatedFormData = {
        ...formData,
        enrollment_id: enrollment_id,
      };
  
      try {
        const response = await fetch('https://cvsu-backend-system.vercel.app/submit_personal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log(response.status); // Check the actual response status code here
          setFormData({ ...formData, givenName: '', familyName: '', lrn: '', sex: '', dob: '', contactNumber: '' }); // Reset form
          divRef.current.scrollIntoView({ behavior: "smooth" });
          setSuccessMessage("Application updated successfully!");
          setTimeout(() => setSuccessMessage(""), 5000);
        } else {
          
          setSuccessMessage("There was an issue with the submission. Please try again.");
          setTimeout(() => setSuccessMessage(""), 5000);
        }
      } catch (error) {
        console.error('Error:', error);
        setSuccessMessage("An error occurred. Please try again.");
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } else {
      divRef.current.scrollIntoView({ behavior: "smooth" });
      setSuccessMessage("There is something wrong with the form. Please check your entries.");
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  };
  

  return (
    <div 
    ref={divRef}
    className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col"
    >
      {successMessage && (
        <div 
        
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="relative text-center my-10">
      <button 
            onClick={() => handleSecondClick('/createapplication')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2text-[#345e34] hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        <h1 className="text-3xl font-extrabold text-[#001800]">Personal Information</h1>
        
        <button
          onClick={() => handleFirstClick('/family')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
         >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
          
      </div>
          <div>
             <h5 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Basic Details
          </h5>
          </div>

      {/* Personal Information Form */}
        <div className="mx-11 mb-6">
        <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="givenName">
            Given Name*
          </label>
          <input
            id="givenName"
            name="givenName"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="John"
            value={formData.givenName}
            onChange={handleChange}
          />
          {errors.givenName && <p className="text-red-500 text-sm">{errors.givenName}</p>}
        </div>

        {/* Family Name Field */}
        <div className="mb-4">
          <label className="form-group text-lg font-sans text-gray-600" htmlFor="familyName">
            Family Name*
          </label>
          <input
            id="familyName"
            name="familyName"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="Doe"
            value={formData.familyName}
            onChange={handleChange}
          />
          {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
        </div>

        {/* Middle Name Field */}
        <div className="mb-4">
          <label className="form-group text-lg font-sans text-gray-600" htmlFor="middleName">
            Middle Name 
          </label>
          <input
            id="middleName"
            name="middleName"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.middleName}
            onChange={handleChange}
          />
        </div>


        {/* Suffix Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="suffix">
            Suffix (Optional)
          </label>
          <input
            id="suffix"
            name="suffix"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.suffix}
            onChange={handleChange}
          />
        </div>


        <div className="mb-4">
        <label className="text-gray-600 text-lg font-semibold" htmlFor="lrn">
          LRN (Learner Reference Number)*
        </label>
        <input
          id="lrn"
          name="lrn"
          type="text"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
          placeholder="Enter LRN"
          value={formData.lrn}
          onChange={handleChange}
        />
        {errors.lrn && <p className="text-red-500 text-sm">{errors.lrn}</p>}
      </div>

        {/* Sex Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="sex">
            Sex at birth
          </label>
          <select
            id="sex"
            name="sex"
            className={`w-full mt-2 p-3 border ${errors.sex ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]`}
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="dob">
            Date of Birth*
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Civil Status Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="civilStatus">
            Civil Status
          </label>
          <select
            id="civilStatus"
            name="civilStatus"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.civilStatus}
            onChange={handleChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="city">Religion</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="religion "
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              required
              placeholder="Enter Religion"
            />
            {errors.religion && <p className="text-red-500 text-sm">{errors.religion}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="city">Nationalities</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="nationalities "
              name="nationalities"
              value={formData.nationalities}
              onChange={handleChange}
              required
              placeholder="Enter Nationalities"
            />
            {errors.nationalities && <p className="text-red-500 text-sm">{errors.nationalities}</p>}
          </div>

          
        {/* Contact Number Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="contactNumber">
            Contact Number*
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="09128796420"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
        </div>
        

         {/* Thin Horizontal Line */}
         <hr className="my-11 border-t-2 border-gray-700" />

         <div>
             <h5 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pb-5">
              Address Details 
              </h5>
          </div>


          {/* Address Fields */}
          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="addressLine1">House Number</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="houseNumber"
              name="houseNumber"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              placeholder="Enter House Number"
            />
          {errors.houseNumber && <p className="text-red-500 text-sm">{errors.houseNumber}</p>}          </div>
          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="addressLine1">Street Address</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="streetAddress"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              placeholder="Enter Street Address"
            />
            {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress}</p>}
          </div>
          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="region">Region</label>
              <input
               type="text"
               className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
               id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                 required
                placeholder="Enter Region"
               />
               {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
              </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="city">Province</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="province "
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              placeholder="Enter Province"
            />
            {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="state">Municipality</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="municipality"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              required
              placeholder="Enter Municipality"
            />
            {errors.municipality && <p className="text-red-500 text-sm">{errors.municipality}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="zipCode">Zip Code</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              placeholder="Enter Zip code"
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>

        <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="city">Country</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="country "
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Enter Country"
            />
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>
          </div>
    

          {/* Action Buttons */}
          
          <div className="flex justify-end gap-5 mb-5 mx-5">
          <div className="text-left">
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={(e) => {
            // You can call the handleSubmit function or directly trigger scroll-to-top here.
            handleSubmit(e); // If you want to run the handleSubmit logic
            
          }}
        
          >
          Update Application
        </button>
        </div>
      </div>
    </div>
  );
};

export default Personal;
