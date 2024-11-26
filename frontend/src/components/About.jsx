import React, { useState, useEffect } from "react";

const About = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Detect screen resize to update mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen z-0">
      {/* Background image */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#081708]/50 flex items-center justify-center z-10">
        {/* Content goes here */}
      </div>

      {/* Main content */}
      <div className="relative py-8 px-4 sm:px-[140px] z-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[50px] font-bold text-center text-[#092919] mb-6">ABOUT</h2>

          <div className="space-y-4">
            {/* Mission and Vision Section */}
            <div className="transition-transform transform hover:scale-105 hover:shadow-xl p-6 bg-[#ffffff] rounded-lg shadow-md mx-2 sm:mx-4 max-h-[200px] sm:max-h-[400px] overflow-y-scroll scrollbar-custom">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#C61A01]">Mission</h2>
              <p className="text-gray-600 mt-2">
                Cavite State University shall provide excellent, equitable, and relevant educational opportunities in the arts, sciences, and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled, and morally upright individuals for global competitiveness.
              </p>
              <br />
              <h2 className="text-xl sm:text-2xl font-semibold text-[#C61A01]">Vision</h2>
              <p className="text-gray-600 mt-2">
                The premier university in historic Cavite globally recognized for excellence in character development, academics, research, innovation, and sustainable community engagement.
              </p>
            </div>

            {/* History Section */}
            <div className="transition-transform transform hover:scale-105 hover:shadow-xl p-6 bg-[#ffffff] rounded-lg shadow-md mx-2 sm:mx-4 max-h-[200px] sm:max-h-[400px] overflow-y-scroll scrollbar-custom">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#C61A01]">History</h2>
              <p className="text-gray-600 mt-2">
                The Cavite State University (CvSU) has its humble beginnings in 1906 as the Indang Intermediate School with the American Thomasites as the first teachers. Several transformations in the name of the school took place; Indang Farm School in 1918, Indang Rural High School in 1927, and Don Severino National Agriculture School in 1958. In 1964, the school was converted into a State College by virtue of Republic Act 3917 and became known as Don Severino Agricultural College (DSAC). Currently, there are 12 CvSU campuses, and CvSU Bacoor City Campus was established in 2008.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
