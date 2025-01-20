import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useActiveItem } from "../../contexts/CreateAppContext";
import { useOutletContext } from 'react-router-dom';


const Education = () => {
  const { userDetails } = useOutletContext(); // Access the passed data
  const enrollment_id = userDetails?.enrollment_id || "No id provided"; 
  const showCollegeFields = userDetails?.applicant_type === "transferee";
  const showSeniorHighYearField = userDetails?.applicant_type !== "grade12"; // Check if senior high year should be shown
  const navigate = useNavigate();
  const { setActiveItem } = useActiveItem();
  const [isExistingAppointment, setIsExistingAppointment] = useState(false);
  const [formData, setFormData] = useState({
    elementarySchoolName: "",
    elementarySchoolAddress: "",
    elementarySchoolYearGraduated: "",
    highSchoolName: "",
    highSchoolAddress: "",
    highSchoolYearGraduated: "",
    seniorHighSchoolName: "",
    seniorHighSchoolAddress: "",
    seniorHighSchoolYearGraduated: "",
    collegeName: null,
    collegeAddress: null,
    collegeYearGraduated: null,
    collegeDegree: null,
  });

  const [successMessage, setSuccessMessage] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true); // Tracks if 'Next' button is disabled after form update
  const divRef = useRef(null);

    const handleFirstClick = (item) => {
      if (!isNextButtonDisabled) {
        localStorage.setItem('educationFormComplete', 'true');
        navigate('/createapplication/requirements');// Navigate to the desired route
        setActiveItem(item);
      } 
    };
  
    const handleSecondClick = (item) => {
        navigate('/createapplication/family');// Navigate to the desired route
        setActiveItem(item);
       
    };

     useEffect(() => {
        // Check if the personal form is completed by checking localStorage
        const familyFormComplete = localStorage.getItem('familyFormComplete');
        if (!familyFormComplete) {
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
            const response = await fetch(`https://cvsu-backend-system.vercel.app/api/getEducationInfo?enrollment_id=${enrollment_id}`);
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
    

  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    // Elementary School validation
    if (!formData.elementarySchoolName) {
      validationErrors.elementarySchoolName = "Elementary School Name is required.";
      isValid = false;
    }

    if (!formData.elementarySchoolAddress) {
      validationErrors.elementarySchoolAddress = "Elementary School Address is required.";
      isValid = false;
    }

    if (!formData.elementarySchoolYearGraduated) {
      validationErrors.elementarySchoolYearGraduated = "Elementary Year Graduated is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(formData.elementarySchoolYearGraduated)) {
      validationErrors.elementarySchoolYearGraduated = "Please enter a valid 4-digit year.";
      isValid = false;
    } else {
      const currentYear = new Date().getFullYear();
      const yearGraduated = parseInt(formData.elementarySchoolYearGraduated, 10);
      if (yearGraduated < 1900 || yearGraduated > currentYear) {
        validationErrors.elementarySchoolYearGraduated = `Year must be between 1900 and ${currentYear}.`;
        isValid = false;
      }
    }

    // High School validation
    if (!formData.highSchoolName) {
      validationErrors.highSchoolName = "High School Name is required.";
      isValid = false;
    }

    if (!formData.highSchoolAddress) {
      validationErrors.highSchoolAddress = "High School Address is required.";
      isValid = false;
    }

    if (!formData.highSchoolYearGraduated) {
      validationErrors.highSchoolYearGraduated = "High School Year Graduated is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(formData.highSchoolYearGraduated)) {
      validationErrors.highSchoolYearGraduated = "Please enter a valid 4-digit year.";
      isValid = false;
    } else {
      const currentYear = new Date().getFullYear();
      const yearGraduated = parseInt(formData.highSchoolYearGraduated, 10);
      if (yearGraduated < 1900 || yearGraduated > currentYear) {
        validationErrors.highSchoolYearGraduated = `Year must be between 1900 and ${currentYear}.`;
        isValid = false;
      }
    }

    // Senior High School validation (only if applicable)
    if (!formData.seniorHighSchoolName) {
      validationErrors.seniorHighSchoolName = "Senior High School Name is required.";
      isValid = false;
    }

    if (!formData.seniorHighSchoolAddress) {
      validationErrors.seniorHighSchoolAddress = "Senior High School Address is required.";
      isValid = false;
    }

    if (showSeniorHighYearField && !formData.seniorHighSchoolYearGraduated) {
      validationErrors.seniorHighSchoolYearGraduated = "Senior High School Year Graduated is required";
      isValid = false;
    } else if (showSeniorHighYearField && !/^\d{4}$/.test(formData.seniorHighSchoolYearGraduated)) {
      validationErrors.seniorHighSchoolYearGraduated = "Please enter a valid 4-digit year.";
      isValid = false;
    } else if (showSeniorHighYearField) {
      const currentYear = new Date().getFullYear();
      const yearGraduated = parseInt(formData.seniorHighSchoolYearGraduated, 10);
      if (yearGraduated < 1900 || yearGraduated > currentYear) {
        validationErrors.seniorHighSchoolYearGraduated = `Year must be between 1900 and ${currentYear}.`;
        isValid = false;
      }
    }

    // College validation (only if applicable)
    if (showCollegeFields) {
      if (!formData.collegeName) {
        validationErrors.collegeName = "College Name is required.";
        isValid = false;
      }

      if (!formData.collegeAddress) {
        validationErrors.collegeAddress = "College Address is required.";
        isValid = false;
      }

      if (!formData.collegeYearGraduated) {
        validationErrors.collegeYearGraduated = "College Year Graduated is required";
        isValid = false;
      } else if (!/^\d{4}$/.test(formData.collegeYearGraduated)) {
        validationErrors.collegeYearGraduated = "Please enter a valid 4-digit year.";
        isValid = false;
      } else {
        const currentYear = new Date().getFullYear();
        const yearGraduated = parseInt(formData.collegeYearGraduated, 10);
        if (yearGraduated < 1900 || yearGraduated > currentYear) {
          validationErrors.collegeYearGraduated = `Year must be between 1900 and ${currentYear}.`;
          isValid = false;
        }
      }

      if (!formData.collegeDegree) {
        validationErrors.collegeDegree = "College Degree is required.";
        isValid = false;
      }
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
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
        const response = await fetch('https://cvsu-backend-system.vercel.app/submit_education', {
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
              localStorage.setItem('educationFormComplete', 'true');
              navigate("/createapplication/requirements");  // Use item (which is '/family' in this case)
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
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Header Section */}
      <div className="relative text-center mb-10">
      <button 
            onClick={() => handleSecondClick('/family')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-4xl font-extrabold text-green-800">
          Educational Info</h1>

        <button
          onClick={() => handleFirstClick('/requirements')}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2  text-green-600 hover:text-green-900 ${isNextButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isNextButtonDisabled}
         >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Elementary School Section */}
        <fieldset>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <legend className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">Elementary School</legend>
          <div className="form-group mb-4">
            <label htmlFor="elementarySchoolName" className="block text-lg font-semibold text-gray-600">Elementary School Name</label>
            <input
              type="text"
              id="elementarySchoolName"
              name="elementarySchoolName"
              value={formData.elementarySchoolName}
              onChange={handleChange}
              placeholder="Enter School Name"
              className="input-field"
            />
            {errors.elementarySchoolName &&  <p className="text-red-500 text-sm">{errors.elementarySchoolName}</p>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="elementarySchoolAddress" className="block text-lg font-semibold text-gray-600">Elementary School Address</label>
            <input
              type="text"
              id="elementarySchoolAddress"
              name="elementarySchoolAddress"
              value={formData.elementarySchoolAddress}
              onChange={handleChange}
              placeholder="Enter School Address"
              className="input-field"
            />
            {errors.elementarySchoolAddress &&  <p className="text-red-500 text-sm">{errors.elementarySchoolAddress}</p>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="elementarySchoolYearGraduated" className="block text-lg font-semibold text-gray-600">Elementary Year Graduated</label>
            <input
              type="number"
              id="elementarySchoolYearGraduated"
              name="elementarySchoolYearGraduated"
              value={formData.elementarySchoolYearGraduated}
              onChange={handleChange}
              placeholder="Enter Year Graduated"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
            {errors.elementarySchoolYearGraduated && <p className="text-red-500 text-sm">{errors.elementarySchoolYearGraduated}</p>}
          </div>
          </div>
        </fieldset>

        <hr className="my-11 border-t-2 border-gray-700" />

        {/* High School Section */}
        <fieldset>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <legend className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
            High School</legend>
          <div className="form-group mb-4">
            <label htmlFor="highSchoolName" className="block text-lg font-semibold text-gray-600">High School Name</label>
            <input
              type="text"
              id="highSchoolName"
              name="highSchoolName"
              value={formData.highSchoolName}
              onChange={handleChange}
              placeholder="Enter School Name"

              className="input-field"
            />
            {errors.highSchoolName &&  <p className="text-red-500 text-sm">{errors.highSchoolName}</p>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="highSchoolAddress" className="block text-lg font-semibold text-gray-600">High School Address</label>
            <input
              type="text"
              id="highSchoolAddress"
              name="highSchoolAddress"
              value={formData.highSchoolAddress}
              onChange={handleChange}
              placeholder="Enter School Address"
              className="input-field"
            />
            {errors.highSchoolAddress && <p className="text-red-500 text-sm">{errors.highSchoolAddress}</p>}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="highSchoolYearGraduated" className="block text-lg font-semibold text-gray-600"> High School Year Graduated</label>
            <input
              type="number"
              id="highSchoolYearGraduated"
              name="highSchoolYearGraduated"
              value={formData.highSchoolYearGraduated}
              onChange={handleChange}
              placeholder="Enter Graduation Year"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
            {errors.highSchoolYearGraduated && <p className="text-red-500 text-sm">{errors.highSchoolYearGraduated}</p>}
          </div>
          </div>

        </fieldset>

        <hr className="my-11 border-t-2 border-gray-700" />


        {/* Senior High School Section */}
        
          <fieldset>
          <div className="bg-white rounded-lg shadow-lg p-6">

            <legend className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
              Senior High School</legend>
            <div className="form-group mb-4">
              <label htmlFor="seniorHighSchoolName" className="block text-lg font-semibold text-gray-600">Senior High School Name</label>
              <input
                type="text"
                id="seniorHighSchoolName"
                name="seniorHighSchoolName"
                value={formData.seniorHighSchoolName}
                onChange={handleChange}
                placeholder="Enter School Name"
                className="input-field"
              />
              {errors.seniorHighSchoolName &&  <p className="text-red-500 text-sm">{errors.seniorHighSchoolName}</p>}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="seniorHighSchoolAddress" className="block text-lg font-semibold text-gray-600">Senior High School Address</label>
              <input
                type="text"
                id="seniorHighSchoolAddress"
                name="seniorHighSchoolAddress"
                value={formData.seniorHighSchoolAddress}
                onChange={handleChange}
                placeholder="Enter School Address"
                className="input-field"
              />
              {errors.seniorHighSchoolAddress &&  <p className="text-red-500 text-sm">{errors.seniorHighSchoolAddress}</p>}
            </div>
           

            {showSeniorHighYearField && (
          <fieldset>
            <div className="form-group mb-4">
              <label htmlFor="seniorHighSchoolYearGraduated" className="block text-lg font-semibold text-gray-600">Senior High Year Graduated</label>
              <input
                type="number"
                id="seniorHighSchoolYearGraduated"
                name="seniorHighSchoolYearGraduated"
                value={formData.seniorHighSchoolYearGraduated}
                onChange={handleChange}
                placeholder="Enter Graduation Year"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                />
              {errors.seniorHighSchoolYearGraduated &&  <p className="text-red-500 text-sm">{errors.seniorHighSchoolYearGraduated}</p>}
            </div>
            
          </fieldset>
          
        )}

</div>
</fieldset>

         {/* College Section (conditionally rendered) */}
        {showCollegeFields && (
          
          <fieldset>
                    <hr className="my-11 border-t-2 border-gray-700" />

                    <div className="bg-white rounded-lg shadow-lg p-6">

            <legend className="text-3xl font-extrabold text-[#001800] mb-3 text-left pb-5">
              College</legend>
            <div className="form-group mb-4">
              <label htmlFor="collegeName" className="block text-lg font-semibold text-gray-600">College Name</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="Enter College Name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.collegeName && <p className="text-red-500 text-sm">{errors.collegeName}</p>}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="collegeAddress" className="block text-lg font-semibold text-gray-600">College Address</label>
              <input
                type="text"
                id="collegeAddress"
                name="collegeAddress"
                value={formData.collegeAddress}
                onChange={handleChange}
                placeholder="Enter College Address"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              {errors.collegeAddress && <p className="text-red-500 text-sm">{errors.collegeAddress}</p>}
            </div>
            </div>

          </fieldset>
          )}

         {/* Submit Button */}
         <div className="flex justify-end gap-5 mb-5 mx-5">
          <div className="text-left">
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-red-700 focus:outline-none"
          onClick={(e) => {
            // You can call the handleSubmit function or directly trigger scroll-to-top here.
            handleSubmit(e,'/requirements'); // If you want to run the handleSubmit logic
          }}
          >
          Update Application
        </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Education;
