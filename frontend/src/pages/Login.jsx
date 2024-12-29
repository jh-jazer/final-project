import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav';

const Login = () => {
  const [login_id, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login_id.trim() || !password.trim()) {
      setErrorMessage('Please fill in both login ID and password fields');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');

      // Backend API call
      const response = await axios.post('https://cvsu-backend-system.vercel.app/login', { login_id, password });

      if (response.status === 200) {
        navigate('/studentdb/profile');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage('Please fill in both login ID and password fields');
        } else if (error.response.status === 401) {
          setErrorMessage('Invalid login ID or password');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      } else {
        setErrorMessage('Cannot connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center pt-[70px]"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        {/* Login Card */}
        <div className="w-full max-w-md p-8 bg-white bg-opacity-95 shadow-lg rounded-lg">
          {/* Header */}
           <div className="flex items-center gap-4 justify-self-center ">
                  <img src={Logo} alt="University Logo" className="w-[60px] h-[60px]" />
                  <h2 className="text-3xl font-extrabold text-[#C61A01]">Login </h2>
                </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Login ID Input */}
            <div>
              <label htmlFor="login_id" className="block text-sm font-medium text-gray-700">
                Login ID
              </label>
              <input
                type="text"
                id="login_id"
                name="login_id"
                className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                placeholder="Enter your Login ID"
                value={login_id}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-4 pt-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-6 text-white bg-[#C61A01] rounded-lg hover:bg-[#C61A01]/90 focus:outline-none focus:ring-2 focus:ring-[#C61A01]"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-3">
            <Link to="/forgotpassword" className="text-sm text-[#C61A01]  p-2 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <Link to="/apply" className="text-sm text-[#C61A01] p-2 hover:underline">
              Don’t have an account? Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
