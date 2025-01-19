import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';


const Family = () => {
  const navigate = useNavigate();
  const { userDetails } = useOutletContext(); // Access the passed data
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const [isExistingAppointment, setIsExistingAppointment] = useState(false);
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

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Tracks if 'Next' button is disabled after form update
  const divRef = useRef(null);
  const { setActiveItem } = useActiveItem();

  const handleFirstClick = (item) => {
    if (!isNextButtonDisabled) {
      localStorage.setItem('familyFormComplete', 'true');
      navigate('/createapplication/education');// Navigate to the desired route
      setActiveItem(item);
    } 
  };

  const handleSecondClick = (item) => {
      navigate('/createapplication/personal');// Navigate to the desired route
      setActiveItem(item);
    
  };

  useEffect(() => {
    // Check if the personal form is completed by checking localStorage
    const personalFormComplete = localStorage.getItem('personalFormComplete');
    if (!personalFormComplete) {
      // Redirect to the personal form if it's not completed
      navigate('/createapplication');
    }
  }, [navigate]);

  
  useEffect(() => {
    if (enrollment_id && enrollment_id !== "No ID provided") {
      fetchFormData(enrollment_id);
    }
  }, [enrollment_id]);
  const fetchFormData = async (enrollment_id) => {
    try {
      // Update the fetch URL to include the enrollment_id as a query parameter
      const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getFamilyInfo?enrollment_id=${enrollment_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setFormData((prevData) => ({
        ...prevData,
        ...data,  // Populate form with fetched data
      }));
      setIsExistingAppointment(true);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  // Effect to enable or disable the button based on form completion
  useEffect(() => {
    setIsNextButtonDisabled(!isExisting());
  }, [isExistingAppointment]);

  const isExisting = () => isExistingAppointment
   

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
    
      if (type === 'checkbox') {
        // When the checkbox is clicked, if the "Not Applicable" checkbox is checked, 
        // reset the respective data (father's or mother's) to null
        if (name === "isFatherNotApplicable" && checked) {
          setFormData(prevData => ({
            ...prevData,
            fatherName: null,
            fatherOccupation: null,
            fatherContact: null,
          }));
        } else if (name === "isMotherNotApplicable" && checked) {
          setFormData(prevData => ({
            ...prevData,
            motherName: null,
            motherOccupation: null,
            motherContact: null,
          }));
        }
      }
    
      // For other inputs, update the state normally
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

  

  const handleSubmit = async (e, item) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      const updatedFormData = {
        ...formData,
        enrollment_id: enrollment_id,
      };
      divRef.current.scrollIntoView({ behavior: "smooth" });
      
      setSuccessMessage("Loading...");

      try {
        const response = await fetch('https://cvsu-backend-system.vercel.app/submit_family', {
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
              localStorage.setItem('familyFormComplete', 'true');
              navigate("/createapplication/education");  // Use item (which is '/family' in this case)
              setActiveItem(item); // Set active item (pass '/family')
            }, 2000); // Delay of 2 seconds
    
            // Clear the success message after the timeout
            setTimeout(() => setSuccessMessage(""), 5000);

       
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
    className="w-full min-h-screen bg-gradient-to-r from-green-50 to-green-100 p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between"
    >
      {successMessage && (
        <div 
        
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="relative text-center mb-10">
          <button 
            onClick={() => handleSecondClick('/personal')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        
        <h1 className="text-4xl font-extrabold text-green-800">
          Family Information</h1>
        
        <button
           onClick={() => handleFirstClick('/education')}
           className={`absolute right-0 top-1/2 transform -translate-y-1/2  text-green-600 hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
           disabled={isNextButtonDisabled}
         >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
      </div>


      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
      <h5 className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
      Father's Information
        <label htmlFor="isFatherNotApplicable"
            className="flex items-center text-lg cursor-pointer">
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
             </h5>     
           
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="fatherName" className='text-gray-600 text-lg font-semibold'>Father's Name*</label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              placeholder=" Father's Full Name (e.g., John A. Doe)"
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
              type="number"
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
        <hr className="my-11 border-t-2 border-gray-700" />

        <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Mother's Information */}
        <h5 className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
        Mother's Information
            <label htmlFor="isMotherNotApplicable" 
            className="flex items-center text-lg cursor-pointer">
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
          </h5>
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="motherName" className='text-gray-600 text-lg font-semibold'>Mother's Name*</label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              placeholder=" Mother's Full Name (e.g., Jessa A. Doe)"
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
              type="number"
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
      
        <hr className="my-11 border-t-2 border-gray-700" />

        <div className="bg-white rounded-lg shadow-lg p-6">

        {/* Guardian's Information */}
        <h5 className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
        Guardian's Information</h5>
          <div className="form-group text-lg font-sans text-gray-600">
            <label htmlFor="guardianName" className="text-gray-600 text-lg font-semibold">Guardian's Name*</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              placeholder=" Guardian's Full Name (e.g., Taylor A. Doe)"
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
              type="number"
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

        <hr className="my-11 border-t-2 border-gray-700" />


        {/* Sibling and Family Income */}
        <div className="bg-white rounded-lg shadow-lg p-6"> 
        <h5 className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
        Family Information</h5>

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
          </div>
          

              {/* Action Buttons */}
          
              <div className="flex justify-end gap-5 mt-8">
              <div className="text-left">
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={(e) => {
            // You can call the handleSubmit function or directly trigger scroll-to-top here.
            handleSubmit(e,'/education'); // If you want to run the handleSubmit logic
            
          }}
        
          >
          Update Application
        </button>
        </div>
      </div>
    </div>
  );
};

export default Family;
