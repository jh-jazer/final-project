import React from 'react';
import Logo from '../assets/university-logo.png';
import StudentImage from '../assets/student.jpg';
import TopNav from '../components/Topnav'; // Import the TopNav component
import { FcGoogle } from 'react-icons/fc'; // Google icon from react-icons
import { Link } from 'react-router-dom';

const AdmissionPortal = () => {
  return (
    <div>
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
        {/* Centered Admission Portal Card */}
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img src={Logo} alt="University Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-extrabold text-[#C61A01]">Admission Portal</h2>
          </div>

          <Link
          to="/privacy">
          {/* Sign In with Google */}
          <div className="mt-6 text-center">
            
            <button
              className="w-full py-2 text-white bg-[#C61A01] rounded-lg hover:bg-[#C61A01]/90 focus:outline-none focus:ring-2 focus:ring-[#C61A01] flex items-center justify-center gap-2"
            >
                
              <FcGoogle className="text-2xl" />
              Sign in with Google
            </button>
          </div>
          </Link>

           {/* Forgot Password */}
           <div className="text-center pt-4">
            <a href="#" className="text-sm text-[#C61A01] hover:underline">
              Read The Admission Overview?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPortal;
