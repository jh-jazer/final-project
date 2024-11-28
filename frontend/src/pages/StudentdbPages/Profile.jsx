import React, { useState } from 'react';
// Import the CSS file for styling
import '../StudentpagesCSS/Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    givenName: 'John',
    familyName: 'Doe',
    middleName: '',
    suffix: '',
    sexAtBirth: 'Male',
    civilStatus: 'Single',
    religion: 'Roman Catholic',
    dateOfBirth: '2024-02-05',
    contactNumber: '09128796420',
    nationality: 'Filipino',
    houseNumber: '1',
    streetAddress: 'Bayabas St.',
    province: 'Metro Manila',
    municipality: 'City of Las Piñas',
    barangay: 'Pamplona Tres',
    zipCode: '1740',
    region: 'National Capital Region (NCR)',
  });

  return (
    <div className="w-full min-h-screen bg-white p-8 pt-12 shadow-xl rounded-lg flex flex-col justify-between">
      {/* Header Section */}
      <div>
        <div className="text-center my-10 pb-10">
          <h1 className="text-3xl font-extrabold text-[#001800]">
            Personal Information
          </h1>
          <h2 className="text-lg text-gray-600">
            Your information is displayed here.
          </h2>
        </div>

        {/* Personal Information Section */}
        <div>
             <h4 className="text-2xl font-extrabold text-[#001800] mb-6 text-left pl-11 pb-5">
            Basic Information
          </h4>
          </div>
        <div className="form-grid">
         
       
          {[
            { label: 'Given Name', value: formData.givenName || 'Not provided' },
            { label: 'Middle Name', value: formData.middleName || 'Not provided' },
            { label: 'Last Name', value: formData.familyName || 'Not provided' },
            { label: 'Suffix', value: formData.suffix || 'Not provided' },
            { label: 'Sex at Birth', value: formData.sexAtBirth },
            { label: 'Date of Birth', value: formData.dateOfBirth },
            { label: 'Civil Status', value: formData.civilStatus },
            { label: 'Religion', value: formData.religion },
            { label: 'Nationality', value: formData.nationality },
            { label: 'Contact Number', value: formData.contactNumber },
          ].map((field, index) => (
            <div key={index} className="mb-6 mx-11">
              <label className="text-gray-600 text-lg font-semibold mb-2">
                {field.label}
              </label>
              <p className="text-[#081708] text-lg">{field.value}</p>
            </div>
          ))}
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
              <div key={index} className="mb-6 mx-11">
                <label className="text-gray-600 text-lg font-semibold mb-2">
                  {field.label}
                </label>
                <p className="text-[#081708] text-lg">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
