import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Personal = () => {
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    middleName: '',
    suffix: '',
    sex: 'male',
    dob: '',
    contactNumber: '',
    civilStatus: 'single',
    religion: 'Roman Catholic',
  });

  const [errors, setErrors] = useState({
    givenName: '',
    familyName: '',
    dob: '',
    contactNumber: '',
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // Validate the form fields
  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    if (!formData.givenName) {
      validationErrors.givenName = "Given Name is required.";
      isValid = false;
    }

    if (!formData.familyName) {
      validationErrors.familyName = "Family Name is required.";
      isValid = false;
    }

    if (!formData.dob) {
      validationErrors.dob = "Date of Birth is required.";
      isValid = false;
    }

    if (!formData.contactNumber) {
      validationErrors.contactNumber = "Contact Number is required.";
      isValid = false;
    } else if (!/^\d{11}$/.test(formData.contactNumber)) {
      validationErrors.contactNumber = "Contact Number must be 11 digits.";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };
      
      // Enable the Next button only when required fields are filled
      setIsButtonDisabled(
        !updatedFormData.givenName || !updatedFormData.familyName || !updatedFormData.dob || !updatedFormData.contactNumber
      );

      return updatedFormData;
    });
  };

  // Handle form submission and navigate to the next page if valid
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      navigate('/createapplication/contact');
    } else {
      console.log("Form contains errors, submission blocked.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col">
      {/* Header Section */}
      <div className="text-center my-10">
        <h1 className="text-3xl font-extrabold text-[#001800]">Personal Information</h1>
        <h2 className="text-lg text-gray-600">Please fill out your Personal Information.</h2>
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
            placeholder="N/A"
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
            placeholder="Jr."
            value={formData.suffix}
            onChange={handleChange}
          />
        </div>

        {/* Sex Field */}
        <div className="mb-4">
          <label className="text-gray-600 text-lg font-semibold" htmlFor="sex">
            Sex
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
    className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345e34]"
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
      </div>

      {/* Action Buttons */}
      
      <div className="flex justify-end gap-5 mb-5 mx-5">
      <Link to="/createapplication/education">
        <button
          className="px-6 py-2 bg-[#345e34] text-white font-bold rounded-lg hover:bg-green-900 focus:outline-none disabled:bg-gray-400"
        >
          Prev
        </button>
        </Link>

        <Link to="/createapplication/contact">
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
  );
};

export default Personal;
