import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');

      // Backend API call to initiate the password reset process
      const response = await axios.post('http://localhost:5005/forgot-password', { email });

      if (response.status === 200) {
        setSuccessMessage('A password reset link has been sent to your email.');
      }
    } catch (error) {
        setIsLoading(false);  // Reset loading state in case of error
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Cannot connect to the server. Please try again later.');
        }
      }
      
      
  };

  return (
    <div>
      <TopNav />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center pt-[70px]"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        <div className="w-full max-w-md p-8 bg-white bg-opacity-95 shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-extrabold text-[#C61A01]">Forgot Password</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-1 bg-gray-100 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}
            {successMessage && <p className="mt-4 text-sm text-green-600">{successMessage}</p>}
            <button
              type="submit"
              className="w-full py-2 mt-6 text-white bg-[#C61A01] rounded-lg hover:bg-[#C61A01]/90 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Send Reset Link'}
            </button>
          </form>
          <div className="text-center">
            <Link to="/login" className="text-sm text-[#C61A01] p-2 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
