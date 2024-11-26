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
            <h1 className="text-3xl sm:text-5xl font-bold text-[#c5ffdf]">
              Your Journey Starts Here
            </h1>
            <p className="text-base sm:text-lg px-2 sm:px-6 text-[#c5ffdf]">
              "A comprehensive curriculum designed to equip you with in-demand
              skills in programming, software development, and more."
            </p>

            {/* Centered Apply Button */}
            <div className="flex justify-center items-center">
              <Link to="/apply">
                <button className="mainButton text-lg sm:text-2xl text-[#C61A01] font-bold bg-white py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-md hover:bg-[#C61A01] hover:text-white transition duration-300">
                  APPLY NOW
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* White Rectangle at the Bottom */}
        <div className="absolute bottom-0 w-full bg-[#E8E8E8] h-16 sm:h-24 flex items-center justify-center z-20">
          <p className="text-xs sm:text-lg text-[#033D04] font-semibold text-center px-4">
            Begin your journey today with Cavite State University
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
