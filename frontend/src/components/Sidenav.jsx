import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  AiOutlineInfoCircle,
  AiOutlineFileText,
  AiOutlinePhone,
  AiOutlineMenu,
  AiOutlineHome,
} from 'react-icons/ai';
import logo from '../assets/cvsulogo.png';

const Sidenav = ({ homeRef, aboutRef, newsRef, contactRef }) => {
  const [nav, setNav] = useState(false);
  const [showTopNav, setShowTopNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNav = () => setNav(!nav);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    setNav(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopNav(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setNav(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  return (
    <div>
    {/* Top Navigation */}
    <div
      className={`fixed top-0 left-0 w-full h-[100px] z-[90] bg-[#E8E8E8] shadow-lg transition-transform duration-300 ${
        showTopNav ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center px-3 pr-5 py-3">
        <div className="logo transition-transform duration-300 hover:scale-110">
          <img src={logo} alt="Logo" className="h-[80px]" />
        </div>
        <div className="hidden md:flex space-x-12 pr-5">
          {/* Dropdown Menus */}
          {[
            { label: 'About Us', options: [{label: 'University History', path:'university'}, {label:'Department of Computer Studies',path:'comstudy'}, {label:'Mission and Vision',path:'missionvision'}] },
            { label: 'Admission', options: [{ label: 'Admission Procedures', path: '/apply' }, { label: 'Admission Page', path: '/apply' }] },
            { label: 'CvSU Portal', options: [{ label: 'Login', path: '/login' }, { label: 'Register', path: '/register' }], },
          ].map((menu) => (
            <div key={menu.label} className="relative">
              <button
                onClick={() => toggleDropdown(menu.label)}
                className="flex items-center text-[#033D04] text-lg hover:text-black"
              >
                {menu.label}
                <span
                  className={`ml-1 transform transition-transform ${
                    activeDropdown === menu.label ? 'rotate-180' : ''
                  }`}
                  style={{ fontSize: '9px' }} // Reducing font-size for the arrow
                >
                  ▼
                </span>
              </button>
              {activeDropdown === menu.label && (
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg z-50">
                   {menu.options.map((option) => (
                      // Check if option has a path, then render Link
                      <Link
                        key={option.label || option}
                        to={option.path || '#'}
                        className="block w-full px-4 py-2 text-left text-[#033D04] hover:bg-gray-100 hover:text-black"
                        onClick={() => setNav(false)} // Close the dropdown after clicking
                      >
                        {option.label || option}
                      </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <AiOutlineMenu
          size={30}
          onClick={handleNav}
          className="md:hidden cursor-pointer text-gray-600"
        />
      </div>
    </div>
  
  
   {/* Mobile Navigation */}
{nav && (
  <div className="fixed top-0 left-0 w-full h-screen bg-white/90 z-40 flex flex-col items-center justify-center pt-10">
    {/* Dropdown Menus */}
    {[ 
      { label: 'About Us', options: ['University History', 'Department of Computer Studies', 'Mission and Vision'] },
      { label: 'Admission', options: [{ label: 'Admission Procedures', path: '/apply' }, { label: 'Admission Page', path: '/apply' }] },
      { label: 'CvSU Portal', options: [{ label: 'Login', path: '/login' }, { label: 'Register', path: '/register' }], }
    ].map((menu) => (
      <div key={menu.label} className="relative w-full px-6 py-3 mb-6">
        <button
          onClick={() => toggleDropdown(menu.label)}
          className="w-full text-left text-lg text-[#033D04] hover:text-black font-semibold py-3 rounded-md transition-all ease-in-out duration-300"
        >
          {menu.label}
        </button>

        {activeDropdown === menu.label && (
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg z-50">
                   {menu.options.map((option) => (
                      // Check if option has a path, then render Link
                      <Link
                        key={option.label || option}
                        to={option.path || '#'}
                        className="block w-full px-4 py-2 text-left text-[#033D04] hover:bg-gray-100 hover:text-black"
                        onClick={() => setNav(false)} // Close the dropdown after clicking
                      >
                        {option.label || option}
                      </Link>
                  ))}
                </div>
        )}
      </div>
    ))}

    {/* Close Button */}
    <button
      onClick={handleNav}
      className="mt-6 text-lg text-gray-600 hover:text-black transition-all duration-300"
    >
      <AiOutlineMenu size={30} />
    </button>
  </div>
)}


      {/* Side Navigation for Larger Screens */}
      {!showTopNav && (
        <div className="fixed top-[25%] left-0 z-[99] hidden md:block">
          <div className="flex flex-col pl-5">
            {[
              { icon: <AiOutlineHome size={20} />, label: 'Home', ref: homeRef },
              { icon: <AiOutlineInfoCircle size={20} />, label: 'About', ref: aboutRef },
              { icon: <AiOutlineFileText size={20} />, label: 'News', ref: newsRef },
              { icon: <AiOutlinePhone size={20} />, label: 'Contact', ref: contactRef },
            ].map((item) => (
              <a
                key={item.label}
                onClick={() => scrollToSection(item.ref)}
                className="flex items-center mb-4 group"
              >
                <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gray-100 shadow-lg cursor-pointer hover:scale-110 ease-in duration-300">
                  {item.icon}
                </div>
                <span className="pl-4 text-gray-800 group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidenav;
