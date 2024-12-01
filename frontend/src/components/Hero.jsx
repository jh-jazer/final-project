import React from 'react';
import { Link } from 'react-router-dom';
import Entrance from '../assets/entrance.png';

const Hero = () => {
  return (
    <div id="main">
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src={Entrance}
          alt="Entrance"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10">
          <div className="text-center text-white space-y-6 px-4 sm:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#c5ffdf]">
              Your Journey Starts Here
            </h1>
            <p className="text-sm md:text-base lg:text-lg px-4 sm:px-6 text-[#c5ffdf]">
              "A comprehensive curriculum designed to equip you with in-demand
              skills in programming, software development, and more."
            </p>

            {/* Centered Apply Button */}
            <div className="flex items-center justify-center w-full">
              <Link to="/apply" className="flex justify-center items-center w-4/5 max-w-md">
                <button className="mainButton w-full px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 bg-[#c5ffdf] text-[#081708] font-semibold text-base sm:text-lg lg:text-xl rounded-md shadow-md hover:bg-[#a8e7c8] transition-transform transform hover:scale-105">
                  APPLY NOW
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* White Rectangle at the Bottom */}
        <div className="absolute bottom-0 w-full bg-[#E8E8E8] h-16 md:h-20 lg:h-24 flex items-center justify-center z-20">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#033D04] font-semibold text-center px-4">
            Begin your journey today with Cavite State University
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
