import React, { useState } from "react";

const Enroll = () => {
  const [formData, setFormData] = useState({
    course: "",
    section: "",
  });

  const [requirements, setRequirements] = useState({
    birthCertificate: false,
    goodMoral: false,
    transcriptOfRecords: false,
    idPhoto: false,
  });

  const [message, setMessage] = useState("");
  const [irregularMessage, setIrregularMessage] = useState("");

  const courses = ["Computer Science", "Information Technology", "Engineering", "Education", "Nursing"];
  const sections = ["Section A", "Section B", "Section C"];

  const handleRequirementChange = (e) => {
    const { name, checked } = e.target;
    setRequirements({
      ...requirements,
      [name]: checked,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const allRequirementsMet = Object.values(requirements).every((req) => req);

  const handleEnroll = (e) => {
    e.preventDefault();
    if (allRequirementsMet && formData.course && formData.section) {
      setMessage(`You have successfully enrolled in ${formData.course} (${formData.section}).`);
      setFormData({
        course: "",
        section: "",
      });
      setRequirements({
        birthCertificate: false,
        goodMoral: false,
        transcriptOfRecords: false,
        idPhoto: false,
      });
    } else {
      setMessage("Please complete all requirements and select a course/section.");
    }
  };

  const handleIrregularRequest = () => {
    setIrregularMessage("Your request to be an irregular student has been sent for review.");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Enroll in a Course</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {irregularMessage && (
        <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700">
          {irregularMessage}
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select a Course --</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Section</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleInputChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select a Section --</option>
            {sections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Requirements</h2>
          <div className="space-y-2">
            {Object.keys(requirements).map((requirement, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={requirement}
                  checked={requirements[requirement]}
                  onChange={handleRequirementChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="capitalize">{requirement.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4">
          <button
            type="submit"
            onClick={handleEnroll}
            disabled={!allRequirementsMet || !formData.course || !formData.section}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 ${
              !allRequirementsMet || !formData.course || !formData.section ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Enroll
          </button>
          <button
            type="button"
            onClick={handleIrregularRequest}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
          >
            Request Irregular
          </button>
        </div>
      </form>
    </div>
  );
};

export default Enroll;
