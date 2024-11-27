import React from 'react';
import logo from '../assets/cvsulogo.png';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <nav className="bg-white bg-opacity-20 shadow-md fixed top-0 left-0 w-full z-50">
      <div
      className={`fixed top-0 left-0 w-full h-[100px] z-[90] bg-[#E8E8E8] shadow-lg transition-transform duration-300`}
      >
       
        
        <div className="flex justify-between items-center px-3 pr-5 py-3">
                    {/* Logo with transform effects */}
                    
          <div className="logo transition-transform duration-300 hover:scale-110">
          <Link 
        to="/"> 
          <img src={logo} alt="Logo" className="h-[80px]" />
          </Link>
         </div>
          </div>
          
        </div>
        
        

        
    </nav>
  );
};

export default TopNav;
