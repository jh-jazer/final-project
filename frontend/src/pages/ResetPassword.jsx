import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Extract token from query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      const response = await axios.post('http://localhost:5005/resetpassword', {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        setSuccessMessage('Password successfully reset. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        <div className="w-full max-w-md p-8 bg-white bg-opacity-95 shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-extrabold text-[#C61A01]">Reset Password</h2>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

            {/* Success Message */}
            {successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-6 text-white bg-[#C61A01] rounded-lg hover:bg-[#C61A01]/90 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
