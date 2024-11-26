import React, { useState } from 'react';
import '../StudentpagesCSS/Settings.css'; // Import the CSS file for styling

const Settings = () => {
  const [formData, setFormData] = useState({
    username: 'student123',
    email: 'student@example.com',
    password: '',
    confirmPassword: '',
    notifications: true,
    darkMode: false,
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle password change logic
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      // Handle the logic to update the password
      console.log('Password updated');
    }
  };

  // Handle form submission (for simplicity, we'll just log the data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings updated:', formData);
  };

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>
      
      <form onSubmit={handleSubmit} className="settings-form">
        {/* Personal Information Section */}
        <section className="section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Password Change Section */}
        <section className="section">
          <h2>Change Password</h2>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" onClick={handlePasswordChange}>Change Password</button>
        </section>

        {/* Notification Preferences Section */}
        <section className="section">
          <h2>Notification Preferences</h2>
          <div className="form-group">
            <label htmlFor="notifications">Receive Notifications</label>
            <input
              type="checkbox"
              name="notifications"
              id="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Account Preferences Section */}
        <section className="section">
          <h2>Account Preferences</h2>
          <div className="form-group">
            <label htmlFor="darkMode">Enable Dark Mode</label>
            <input
              type="checkbox"
              name="darkMode"
              id="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Submit Button */}
        <button type="submit" className="btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
