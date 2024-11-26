import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#092919] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left Section: Logo and Info */}
          </div>
          
          {/* Right Section: Social Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i> {/* Twitter icon */}
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i> {/* Instagram icon */}
            </a>
          </div>
        </div>
        
        {/* Bottom Section: Copyright */}
        <div className="mt-6 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CvSU Enrollment System. All Rights Reserved.</p>
        </div>
      
    </footer>
  );
};

export default Footer;
