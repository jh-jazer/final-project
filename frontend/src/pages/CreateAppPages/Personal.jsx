import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Personal = () => {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    middleName: '',
    suffix: '',
    sex: '',
    nationalities:'',
    dob: '',
    civilStatus: '',
    religion: '',
    phoneNumber: '',
    //
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Tracks if 'Next' button is disabled after form update
  const [formUpdated, setFormUpdated] = useState(false); // Tracks if the form has been successfully updated
  const divRef = useRef(null);



  // Effect to enable or disable the button based on form completion
  useEffect(() => {
    const isFormValid = validate(); // Checks if the form is valid based on `validate` function
    setIsNextButtonDisabled(!(isFormValid && formUpdated)); // Enables "Next" only if valid and updated
  }, [formData, formUpdated]);
  

  const validate = () => {
    const validationErrors = {};
    const regex = {
      contactNumber: /^\d{11}$/,
    
    };

    if (!formData.givenName) validationErrors.givenName = "Given Name is required.";
    if (!formData.familyName) validationErrors.familyName = "Family Name is required.";
    if (!formData.dob) validationErrors.dob = "Date of Birth is required.";
    if (!formData.contactNumber || !regex.contactNumber.test(formData.contactNumber))
      validationErrors.contactNumber = "Contact Number must be 11 digits.";
    if (!formData.streetAddress) validationErrors.streetAddress = "Street Address is required.";
    if (!formData.city) validationErrors.city = "City is required.";
    if (!formData.state) validationErrors.state = "State/Province/Region is required.";
    if (!formData.country) validationErrors.country = "Country is required.";
    if (!formData.zipCode) validationErrors.zipCode = "Zip Code is required.";


    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

    const handleSubmit = (e) => {
    e.preventDefault(); 

    // First, validate the form before submission
    const isValid = validate();
    
    if (isValid) {
        // If valid, process the form submission
        console.log("Personal Information Submitted:", formData);
        setFormUpdated(true);
        
        // Then show the success message after navigation
        divRef.current.scrollIntoView({ behavior: "smooth" });
        setSuccessMessage("Application updated successfully!"); 
        setTimeout(() => setSuccessMessage(""), 3000); // Hide message after 3 seconds
    } else {
        divRef.current.scrollIntoView({ behavior: "smooth" });
        // If invalid, clear success message and notify the user
        setSuccessMessage("there is something wrong"); // Clear success message if validation fails
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
        <Link to="/createapplication/personal" className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <button className="text-[#345e34] hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
        <h1 className="text-3xl font-extrabold text-[#001800]">Personal Information</h1>
        <Link to="/createapplication/education" className="absolute right-0 top-1/2 transform -translate-y-1/2">
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
            Middle Name (Not Applicable)
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

        {/* Sex Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="sex">
            Sex at birth
          </label>
          <select
            id="sex"
            name="sex"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
          <label className="text-gray-600 text-lg font-semibold" htmlFor="religion">
            Religion
          </label>
          <select
            id="religion"
            name="religion"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.religion}
            onChange={handleChange}
          >
            <option value="" disabled selected>
              Select your religion
            </option>
            <option value="Anglican">Anglican</option>
            <option value="Apostolic">Apostolic</option>
            <option value="Assembly of God">Assembly of God</option>
            <option value="Babi and Baha'i Faiths">Babi and Baha'i Faiths</option>
            <option value="Baptist">Baptist</option>
            <option value="Bible Church of Christ">Bible Church of Christ</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Calvinist">Calvinist</option>
            <option value="Christian and Missionary Alliance">
              Christian and Missionary Alliance
            </option>
            <option value="Christian Science">Christian Science</option>
            <option value="Church of Christ">Church of Christ</option>
            <option value="Church of God">Church of God</option>
            <option value="Church of God in Christ">Church of God in Christ</option>
            <option value="Church of Jesus Christ of Latter-day Saints">
              Church of Jesus Christ of Latter-day Saints
            </option>
            <option value="Church of the Nazarene">Church of the Nazarene</option>
            <option value="Confucianism">Confucianism</option>
            <option value="Deism">Deism</option>
            <option value="Episcopalian">Episcopalian</option>
            <option value="Evangelical">Evangelical</option>
            <option value="Evangelical Christian">Evangelical Christian</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Iglesia ni Cristo">Iglesia ni Cristo</option>
            <option value="Islam">Islam</option>
            <option value="Jehovah's Witness">Jehovah's Witness</option>
            <option value="Judaism">Judaism</option>
            <option value="Lutheran">Lutheran</option>
            <option value="Methodist">Methodist</option>
            <option value="None">None</option>
            <option value="Orthodox">Orthodox</option>
            <option value="Other Christian and Christian Heritage">
              Other Christian and Christian Heritage
            </option>
            <option value="Pentecostal">Pentecostal</option>
            <option value="Philippine Independent Church">
              Philippine Independent Church
            </option>
            <option value="Presbyterian">Presbyterian</option>
            <option value="Protestant">Protestant</option>
            <option value="Roman Catholic">Roman Catholic</option>
            <option value="Seventh Day Adventist">Seventh Day Adventist</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Taoism">Taoism</option>
            <option value="United Church of Christ in the Philippines">
              United Church of Christ in the Philippines
            </option>
            <option value="Worldwide Church of God">Worldwide Church of God</option>
            <option value="Zoroastrianism">Zoroastrianism</option>
          </select>
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
            {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="city">City</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="Enter city"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="state">State/Province/Region</label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="Enter state, province, or region"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
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
              placeholder="Enter zip code"
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>

          <div className="mb-4">
            <label className="form-group text-lg font-sans text-gray-600" htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Enter country"
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
