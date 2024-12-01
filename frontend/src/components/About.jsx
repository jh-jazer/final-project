import React from 'react';
import { Link } from 'react-router-dom';
import Lovecvsu from '../assets/lovecvsu.jpg';
import CarouselPanel from './CarouselPanel';

const About = () => {
  return (
    <div id="main">
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src={Lovecvsu}
          alt="Lovecvsu"
        />
        

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10">
        
          <div className="text-center text-white px-4 sm:px-8">
          
           <div>    
              <CarouselPanel/>  
           </div>
     
              
  
      
            
          </div>
        </div>

        {/* White Rectangle at the Bottom */}
        <div className="absolute bottom-0 w-full bg-[#E8E8E8] h-16 sm:h-24 flex items-center justify-center z-20">
          <p className="text-xs sm:text-lg text-[#033D04] font-semibold text-center px-4">
            "Truth · Excellence · Service"
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
