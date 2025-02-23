import {React, useState, useEffect} from "react";
import { FaUser, FaMapMarkedAlt, FaUsers, FaGraduationCap } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const Profile = () => {
  const dataFromParent = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchOtherInfo = async (enrollmentId) => {
      try {
        //https://cvsu-backend-system.vercel.app/api/
        const response = await fetch(`https://cvsu-backend-system.vercel.app/api/otherInfo/${enrollmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOtherInfo(dataFromParent.user.enrollment_id);
  }, []);

  if (loading) return <p style={{
    fontSize: '1rem', // Adjust the size as needed
    textAlign: 'center',
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }}>
    Loading...
  </p>
  if (error) return <p>Error: {error}</p>;

  
  const personal = data.personalInfo[0];
  const family = data.familyBackground[0];
  const education = data.educationalBackground[0];
  
  const dateString = personal.bday;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formData = {
    givenName: personal.fname,
    familyName: personal.lname,
    middleName: personal.mname,
    suffix: personal.suffix,
    sexAtBirth: personal.sex,
    civilStatus: personal.civil_status,
    religion: personal.religion,
    dateOfBirth: formattedDate,
    contactNumber: personal.contact,
    nationality: personal.nationality,
    houseNumber: personal.house_number,
    streetAddress: personal.street_subdivision,
    region: personal.region,
    province: personal.province,
    municipality: personal.municipality,
    barangay: "no baranggay on database",
    zipCode: personal.zip_code,
    country: personal.country,
    
    fathersName: family.father_name,
    fathersOccupation: family.father_occupation,
    fathersContactNumber: family.father_contact,
    mothersName: family.mother_name,
    mothersOccupation: family.mother_occupation,
    mothersContactNumber: family.mother_contact,
    guardiansName: family.guardian_name,
    guardiansOccupation: family.guardian_occupation,
    guardiansContactNumber: family.guardian_contact,
    numberOfSiblings: family.num_of_siblings,
    incomeBracket: family.family_annual_income,
    educationalBackground: [
      {
        level: "Elementary",
        school: education.elementarySchoolName,
        address: education.elementarySchoolAddress,
        yearGraduated: education.elementarySchoolYearGraduated,
      },
      {
        level: "High School",
        school: education.highSchoolName,
        address: education.highSchoolAddress,
        yearGraduated: education.highSchoolYearGraduated,
      },
      {
        level: "Senior High School",
        school: education.seniorHighSchoolName,
        address: education.seniorHighSchoolAddress,
        yearGraduated: education.seniorHighSchoolYearGraduated,
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
