import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';

const Personal = () => {
  const navigate = useNavigate();
  const { userDetails } = useOutletContext(); // Access the passed data
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isExistingAppointment, setIsExistingAppointment] = useState(false);
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    middleName: '',
    suffix: '',
    lrn: '', // Add LRN here
    sex: '',
    nationality:'',
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

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Tracks if 'Next' button is disabled after form update
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
      navigate('/createapplication');
      setActiveItem(item);
  };


  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No ID provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);
  const fetchFormData = async (enrollment_id) => {
    try {
      // Update the fetch URL to include the enrollment_id as a query parameter
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getPersonalInfo?enrollment_id=${enrollment_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
  
      // Format date fields if present
      const formattedData = {
        ...data,
        dob: data.dob ? formatDateForInput(data.dob) : '',
      };
  
      setFormData((prevData) => ({
        ...prevData,
        ...formattedData,
      }));
      setIsExistingAppointment(true);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // Helper function to format dates
  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Extracts the "yyyy-MM-dd" format
  };
  



  // Effect to enable or disable the button based on form completion
  useEffect(() => {
    setIsNextButtonDisabled(!isExisting());
  }, [isExistingAppointment]);

  const isExisting = () => isExistingAppointment

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
    if (!formData.nationality) validationErrors.nationality = "Nationality is required.";
    if (!formData.contactNumber || !regex.contactNumber.test(formData.contactNumber))
      validationErrors.contactNumber = "Contact Number must be 11 digits.";
    if (!formData.sex || !/^(male|female)$/i.test(formData.sex)) {
      validationErrors.sex = "Sex at birth is required and must be either 'male' or 'female'.";
    }   
    if (!formData.civilStatus || !/^(single|married|divorced)$/i.test(formData.civilStatus)) {
      validationErrors.civilStatus = "Civil Status is required.";
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
  };
  
  const handleSubmit = async (e, item) => {
    e.preventDefault();
    const isValid = validate();
  
    if (isValid) {
      const updatedFormData = {
        ...formData,
        enrollment_id: enrollment_id,
      };
      divRef.current.scrollIntoView({ behavior: "smooth" });
  
      // Set success message to "Loading..." when the request starts
      setSuccessMessage("Loading...");
  
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
          setSuccessMessage("Application updated successfully!");
  
          // Set a timeout before navigating to give the user time to see the message
          setTimeout(() => {
            // Navigate to the desired route after 2 seconds
            navigate("/createapplication/family");  // Use item (which is '/family' in this case)
            setActiveItem(item); // Set active item (pass '/family')
          }, 2000); // Delay of 2 seconds
  
          // Clear the success message after the timeout
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#345e34] hover:text-green-900">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
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
            placeholder="Given Name"
            value={formData.givenName|| ''}
            onChange={handleChange}
          />
          {errors.givenName && <p className="text-red-500 text-sm">{errors.givenName}</p>}
        </div>

        {/* Family Name Field */}
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="familyName">
            Family Name*
          </label>
          <input
            id="familyName"
            name="familyName"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="Family Name"
            value={formData.familyName|| ''}
            onChange={handleChange}
          />
          {errors.familyName && <p className="text-red-500 text-sm">{errors.familyName}</p>}
        </div>

        {/* Middle Name Field */}
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="middleName">
            Middle Name (Optional)
          </label>
          <input
            id="middleName"
            name="middleName"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="Middle Name"
            value={formData.middleName|| ''}
            onChange={handleChange}
          />
          <p className="text-gray-500 text-sm mt-1">This is optional</p>

        </div>


        {/* Suffix Field */}
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="suffix">
            Suffix (Optional)
          </label>
          <input
            id="suffix"
            name="suffix"
            type="text"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            placeholder="Suffix"
            value={formData.suffix|| ''}
            onChange={handleChange}
          />
           <p className="text-gray-500 text-sm mt-1">This is optional</p>
        </div>


        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="lrn">
          LRN (Learner Reference Number)*
        </label>
        <input
          id="lrn"
          name="lrn"
          type="number"
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
          placeholder="Enter LRN"
          value={formData.lrn|| ''}
          onChange={handleChange}
        />
        {errors.lrn && <p className="text-red-500 text-sm">{errors.lrn}</p>}
      </div>

        {/* Sex Field */}
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="sex">
            Sex*
          </label>
          <select
            id="sex"
            name="sex"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
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
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold"  htmlFor="dob">
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
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold" htmlFor="civilStatus">
            Civil Status*
          </label>
          <select
            id="civilStatus"
            name="civilStatus"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
            value={formData.civilStatus}
            onChange={handleChange}
          >
            <option value="">Select Civil Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
          {errors.civilStatus && (
            <p className="text-red-500 text-sm mt-1">{errors.civilStatus}</p>
          )}
        </div>

        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold" htmlFor="religion">
          Religion*
        </label>
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

          <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="nationality">
          Nationality*
          </label>
            <input
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
              id="nationality "
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              placeholder="Enter Nationality"
            />
            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
          </div>

          
        {/* Contact Number Field */}
        <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold" htmlFor="contactNumber">
            Contact Number*
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="number"
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
          <div className="form-group text-lg font-sans text-gray-600">
         <label className="text-gray-600 text-lg font-semibold" htmlFor="addressLine1">
          House Number*
        </label>
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
          <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="addressLine1">
            Street Address*
          </label>
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
          <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="region">
            Region*
          </label>
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

              <div className="form-group text-lg font-sans text-gray-600">
              <label className="text-gray-600 text-lg font-semibold" htmlFor="city">
                Province*
              </label>
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

          <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="state">
            Municipality*
          </label>
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

          <div className="form-group text-lg font-sans text-gray-600">
        <label className="text-gray-600 text-lg font-semibold" htmlFor="zipCode">
          Zip Code*
        </label>
            <input
              type="number"
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

          <div className="form-group text-lg font-sans text-gray-600">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="city">
            Country*
          </label>
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
            handleSubmit(e,'/family'); // If you want to run the handleSubmit logic
            
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
