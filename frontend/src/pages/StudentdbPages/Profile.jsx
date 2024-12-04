import React, { useState } from 'react';
// Import the CSS file for styling
import '../StudentpagesCSS/Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    givenName: 'Kerry',
    familyName: 'Not Applicable',
    middleName: 'Not Applicable',
    suffix: 'Not Applicable',
    sexAtBirth: 'Male',
    civilStatus: 'Single',
    religion: 'Roman Catholic',
    dateOfBirth: 'February 05, 2004',
    contactNumber: '09123796420',
    nationality: 'Filipino',
    houseNumber: '1',
    streetAddress: 'Not provided',
    province: 'Metro Manila',
    municipality: 'Taguig',
    barangay: 'Not provided',
    zipCode: '1740',
    region: 'National Capital Region (NCR)',
    fathersName: 'Not Applicable',
    fathersOccupation: 'Not Applicable',
    fathersContactNumber: 'Not Applicable',
    mothersName: 'Not Applicable',
    mothersOccupation: 'Not Applicable',
    mothersContactNumber: 'Not Applicable',
    guardiansName: 'Joshua',
    guardiansOccupation: 'Joshua',
    guardiansContactNumber: '0948756134',
    numberOfSiblings: '1',
    incomeBracket: '2',
    educationalBackground: [
      {
        level: 'Elementary',
        school: 'Harvard',
        address: 'Quezon City',
        yearGraduated: '2012',
      },
      {
        level: 'High School',
        school: 'Harvard',
        address: 'Quezon City',
        yearGraduated: '2012',
      },
      {
        level: 'Senior High School',
        school: 'Harvard',
        address: 'Quezon City',
        yearGraduated: '2018',
      },
    ],
  });

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <div className="text-center my-10 pb-10">
          <h1 className="text-4xl font-bold text-[#001800]">
            Personal Information
          </h1>
          <h2 className="text-xl text-gray-600">
            Your profile details are displayed below.
          </h2>
        </div>

        {/* Personal Information Section */}
        <div>
          <h4 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Basic Information
          </h4>
          <div className="form-grid">
            {[
              { label: 'Given Name', value: formData.givenName },
              { label: 'Middle Name', value: formData.middleName },
              { label: 'Family Name', value: formData.familyName },
              { label: 'Suffix', value: formData.suffix },
              { label: 'Sex at Birth', value: formData.sexAtBirth },
              { label: 'Date of Birth', value: formData.dateOfBirth },
              { label: 'Civil Status', value: formData.civilStatus },
              { label: 'Religion', value: formData.religion },
              { label: 'Nationality', value: formData.nationality },
              { label: 'Contact Number', value: formData.contactNumber },
            ].map((field, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 mx-11 hover:shadow-lg transition-all">
                <label className="text-gray-600 text-lg font-semibold mb-2">
                  {field.label}
                </label>
                <p className="text-[#081708] text-lg">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Residential Address Section */}
        <div className="mt-10">
          <h4 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Residential Address
          </h4>
          <div className="form-grid">
            {[
              { label: 'House Number', value: formData.houseNumber },
              { label: 'Street/Subdivision Address', value: formData.streetAddress },
              { label: 'Region', value: formData.region },
              { label: 'Province', value: formData.province },
              { label: 'Municipality', value: formData.municipality },
              { label: 'Barangay', value: formData.barangay },
              { label: 'ZIP Code', value: formData.zipCode },
            ].map((field, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 mx-11 hover:shadow-lg transition-all">
                <label className="text-gray-600 text-lg font-semibold mb-2">
                  {field.label}
                </label>
                <p className="text-[#081708] text-lg">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Family Background Section */}
        <div className="mt-10">
          <h4 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Family Background
          </h4>
          <div className="form-grid">
            {[
              { label: "Father's Name", value: formData.fathersName },
              { label: "Father's Occupation", value: formData.fathersOccupation },
              { label: "Father's Contact Number", value: formData.fathersContactNumber },
              { label: "Mother's Name", value: formData.mothersName },
              { label: "Mother's Occupation", value: formData.mothersOccupation },
              { label: "Mother's Contact Number", value: formData.mothersContactNumber },
              { label: "Guardian's Name", value: formData.guardiansName },
              { label: "Guardian's Occupation", value: formData.guardiansOccupation },
              { label: "Guardian's Contact Number", value: formData.guardiansContactNumber },
              { label: 'Number of Siblings', value: formData.numberOfSiblings },
              { label: 'Income Bracket', value: formData.incomeBracket },
            ].map((field, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 mx-11 hover:shadow-lg transition-all">
                <label className="text-gray-600 text-lg font-semibold mb-2">
                  {field.label}
                </label>
                <p className="text-[#081708] text-lg">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Background Section */}
        <div className="mt-10">
          <h4 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Educational Background
          </h4>
          <div className="form-grid">
            {formData.educationalBackground.map((education, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-6 mx-11 hover:shadow-lg transition-all">
                <h5 className="text-lg font-semibold">{education.level}</h5>
                <ul className="ml-6 list-disc text-gray-700">
                  <li><strong>School:</strong> {education.school}</li>
                  <li><strong>Address:</strong> {education.address}</li>
                  <li><strong>Year Graduated:</strong> {education.yearGraduated}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
