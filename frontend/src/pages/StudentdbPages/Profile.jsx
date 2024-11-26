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
    <div className="profile-container">
      <form className="profile-form">
        {/* Personal Information Section */}
        <div className="section">
          <h2 className="section-title">Personal Information*</h2>
          <div className="form-grid">
            
            <div className="form-group">
              <label>Given Name*</label>
              <input type="text" name="givenName" value={formData.givenName} readOnly />
            </div>
            <div className="form-group">
              <label>Middle Name (Not Applicable)</label>
              <input type="text" name="middleName" value={formData.middleName} readOnly />
            </div>
            <div className="form-group">
              <label>Family Name*</label>
              <input type="text" name="familyName" value={formData.familyName} readOnly />
            </div>
            <div className="form-group">
              <label>Suffix (Optional)</label>
              <input type="text" name="suffix" value={formData.suffix} readOnly />
            </div>
            <div className="form-group">
              <label>Sex </label>
              <select name="sexAtBirth" value={formData.sexAtBirth} disabled>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date of birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} readOnly />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} readOnly />
            </div>
            <div className="form-group">
              <label>Civil Status</label>
              <select name="civilStatus" value={formData.civilStatus} disabled>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Religion</label>
              <input type="text" name="religion" value={formData.religion} readOnly />
            </div>
          </div>
        </div>

        {/* Residential Address Section */}
        <div className="section">
          <h2 className="section-title">Residential Address*</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>House Number*</label>
              <input type="text" name="houseNumber" value={formData.houseNumber} readOnly />
            </div>
            <div className="form-group">
              <label>Street/Subdivision Address*</label>
              <input type="text" name="streetAddress" value={formData.streetAddress} readOnly />
            </div>
            <div className="form-group">
              <label>Province</label>
              <select name="province" value={formData.province} disabled>
                <option value="Metro Manila">Metro Manila</option>
                {/* Add more provinces as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Municipality</label>
              <select name="municipality" value={formData.municipality} disabled>
                <option value="City of Las Piñas">City of Las Piñas</option>
                {/* Add more municipalities as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Barangay</label>
              <select name="barangay" value={formData.barangay} disabled>
                <option value="Pamplona Tres">Pamplona Tres</option>
                {/* Add more barangays as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" name="zipCode" value={formData.zipCode} readOnly />
            </div>
            <div className="form-group">
              <label>Region</label>
              <select name="region" value={formData.region} disabled>
                <option value="National Capital Region (NCR)">National Capital Region (NCR)</option>
                {/* Add more regions as needed */}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
