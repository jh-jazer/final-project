import React from 'react';
import logo from '../assets/cvsulogo.png';
import { Link } from 'react-router-dom';

const AdmissionNav = ({ user }) => {
  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-[100px] py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-9 cursor-pointer">
            <div className="logo transform transition-all duration-300 ease-in-out shadow-lg hover:scale-110">
              <img src={logo} alt="Logo" className="h-[40px]" />
            </div>
          </div>
        </Link>

        {/* Google Account Avatar */}
        {user && (
          <div className="flex items-center space-x-2">
            <img
              src={logo} // Replace with Google avatar URL
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-gray-300 shadow-md"
            />
            <span className="text-gray-700 font-semibold hidden md:block">
              {user.displayName}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdmissionNav;
