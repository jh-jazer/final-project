import React from "react";
import { FaUser, FaMapMarkedAlt, FaUsers, FaGraduationCap } from "react-icons/fa";

const Profile = () => {
  const formData = {
    givenName: "Kerry",
    familyName: "Not Applicable",
    middleName: "Not Applicable",
    suffix: "Not Applicable",
    sexAtBirth: "Male",
    civilStatus: "Single",
    religion: "Roman Catholic",
    dateOfBirth: "February 05, 2004",
    contactNumber: "09123796420",
    nationality: "Filipino",
    houseNumber: "1",
    streetAddress: "Not provided",
    region: "National Capital Region (NCR)",
    province: "Metro Manila",
    municipality: "Taguig",
    barangay: "Not provided",
    zipCode: "1740",
    country: "Philippines",
    
    fathersName: "Not Applicable",
    fathersOccupation: "Not Applicable",
    fathersContactNumber: "Not Applicable",
    mothersName: "Not Applicable",
    mothersOccupation: "Not Applicable",
    mothersContactNumber: "Not Applicable",
    guardiansName: "Joshua",
    guardiansOccupation: "Joshua",
    guardiansContactNumber: "0948756134",
    numberOfSiblings: "1",
    incomeBracket: "22,001 - 43,000",
    educationalBackground: [
      {
        level: "Elementary",
        school: "Harvard",
        address: "Quezon City",
        yearGraduated: "2012",
      },
      {
        level: "High School",
        school: "Harvard",
        address: "Quezon City",
        yearGraduated: "2012",
      },
      {
        level: "Senior High School",
        school: "Harvard",
        address: "Quezon City",
        yearGraduated: "2018",
      },
    ],
  };

  return (
    <div className="p-8">
      {/* Profile Header */}
      <div className="bg-green-600 text-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold">Personal Information</h1>
        <p className="mt-2 text-lg">
          Below is the detailed profile information for review.
        </p>
      </div>

      {/* Profile Sections */}
      <div className="mt-8 space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <FaUser className="text-green-600" />
            <span>Basic Information</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { label: "Given Name", value: formData.givenName },
              { label: "Family Name", value: formData.familyName },
              { label: "Middle Name", value: formData.middleName },
              { label: "Suffix", value: formData.suffix },
              { label: "Sex at Birth", value: formData.sexAtBirth },
              { label: "Date of Birth", value: formData.dateOfBirth },
              { label: "Civil Status", value: formData.civilStatus },
              { label: "Religion", value: formData.religion },
              { label: "Nationality", value: formData.nationality },
              { label: "Contact Number", value: formData.contactNumber },
            ].map((field, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-600">{field.label}</h3>
                <p className="text-gray-800">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Residential Address */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <FaMapMarkedAlt className="text-green-600" />
            <span>Residential Address</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {[
              { label: "House Number", value: formData.houseNumber },
              { label: "Street/Subdivision Address", value: formData.streetAddress },
              { label: "Region", value: formData.region },
              { label: "Province", value: formData.province },
              { label: "Municipality", value: formData.municipality },
              { label: "Barangay", value: formData.barangay },
              { label: "ZIP Code", value: formData.zipCode },
              { label: "Country", value: formData.country },
            ].map((field, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-600">{field.label}</h3>
                <p className="text-gray-800">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Family Background */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <FaUsers className="text-green-600" />
            <span>Family Background</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
              { label: "Number of Siblings", value: formData.numberOfSiblings },
              { label: "Income Bracket", value: formData.incomeBracket },
            ].map((field, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-600">{field.label}</h3>
                <p className="text-gray-800">{field.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Educational Background */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-700 flex items-center space-x-2">
            <FaGraduationCap className="text-green-600" />
            <span>Educational Background</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {formData.educationalBackground.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-700">{edu.level}</h3>
                <p className="text-gray-800">
                  <strong>School:</strong> {edu.school}
                </p>
                <p className="text-gray-800">
                  <strong>Address:</strong> {edu.address}
                </p>
                <p className="text-gray-800">
                  <strong>Year Graduated:</strong> {edu.yearGraduated}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
