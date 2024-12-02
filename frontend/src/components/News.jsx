import React from 'react';
import { Link } from 'react-router-dom';
import NewBldg from '../assets/newbldg.png';
import CsIcon from '../assets/csicon.png'; // Replace with the actual file name if different
import ItIcon from '../assets/iticon.png'; // Replace with the actual file name if different

const Hero = () => {
  return (
    <div id="main">
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src={NewBldg}
          alt="NewBldg"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10">
        
          <div className="text-center text-white  px-4 sm:px-8">

          <h2 className="text-3xl sm:text-4xl  font-bold text-[#c5ffdf]">
          NEWS AND UPDATES
        </h2>
            {/* Images as Clickable Links */}
            <div className="flex justify-center space-x-6">
              {/* CS Icon */}
              <Link to="https://www.facebook.com/groups/324730584394303/user/61568578322272">
                <img
                  src={CsIcon}
                  alt="CS Icon"
                  className="block mx-auto floating mb-[10%] md:mr-[50%] md:mb-[10%]  lg:mb-[15%] mt-[10%] z-[-1] md:w-[226px] w-[40%]  cursor-pointer transform hover:scale-110 transition duration-300 hover:shadow-lg"
                />
              </Link>

              <Link to="https://www.facebook.com/groups/168315170024668">
                <img
                  src={ItIcon}
                  alt="IT Icon"
                  className="block mx-auto floating mb-[10%] md:mr-[50%] md:mb-[10%]  lg:mb-[15%] mt-[10%] z-[-1] md:w-[226px] w-[40%] cursor-pointer transform hover:scale-110 transition duration-300 hover:shadow-lg"
                />
              </Link>

              
            </div >
            <div>
              <p className="text-base sm:text-lg px-2 sm:px-6 text-[#c5ffdf]">
              Stay updated with the latest news and events from the IT and CS Societies!
            </p>
            </div>
            
          </div>
        </div>

        {/* White Rectangle at the Bottom */}
        <div className="absolute bottom-0 w-full bg-[#E8E8E8] h-16 sm:h-24 flex items-center justify-center z-20">
        <p className="text-xs sm:text-lg text-[#033D04] font-semibold text-center px-4">
  Or check out the CSG page
  <Link
  to="https://www.facebook.com/CSGBacoor">
   <span className="underline text-blue-600 hover:text-blue-800 pl-2 cursor-pointer">here
    </span>
    </Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Hero;
