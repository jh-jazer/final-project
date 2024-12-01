import React from "react";
import { motion } from "framer-motion";
import Contact from "../../components/Contact"; 
import Topnav from "../../components/Topnav"; 
import Footer from "../../components/Footer"; 
import History from '../../assets/history.png';

const HistoryPage = () => {
  return (
    <div className="bg-[#E8E8E8] text-gray-800">
      {/* Header with Background Image */}
      <header
        className="relative bg-cover bg-center text-white pt-32"
        style={{ backgroundImage: `url(${History})`, height: '400px' }} // Set a specific height for the header
      >
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10"></div> {/* Overlay */}
        
        {/* Header text */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl pt-[10%] text-white text-left font-bold">History of Cavite State University</h1>
        </div>
      </header>

      {/* Topnav */}
      <Topnav />

      {/* Main Content Section */}
      <main className="py-16">
        <div className="container mx-auto px-4 md:px-0">

          {/* Detailed History Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Early Beginnings (1906-1964)</h3>
              <p className="text-base text-gray-600 mb-4">
                The Cavite State University (CvSU) has its humble beginnings in 1906 as the Indang Intermediate School, with the American Thomasites as the first teachers. Several transformations in the name of the school took place: Indang Farm School in 1918, Indang Rural High School in 1927, and Don Severino National Agricultural School in 1958. In 1964, the school was converted into a State College by virtue of Republic Act 3917 and became known as Don Severino Agricultural College (DSAC).
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">University Status (1998 - Present)</h3>
              <p className="text-base text-gray-600 mb-4">
                On January 22, 1998, by virtue of Republic Act No.8468, DSAC was converted into Cavite State University (CvSU). In 2001, Cavite College of Fisheries (CACOF) in Naic, Cavite, and Cavite College of Arts and Trade (CCAT) in Rosario, Cavite, were integrated into the University by virtue of CHED Memo No. 27 s. 2000. Additional campuses were established across the province through memoranda of agreement with local government units (LGUs). Currently, CvSU has 11 campuses, with the main campus, the Don Severino delas Alas Campus, situated in Indang, Cavite, occupying approximately 70 hectares of land.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Mandates and Vision</h3>
              <p className="text-base text-gray-600 mb-4">
                CvSU is mandated “to provide excellent, equitable, and relevant educational opportunities in the arts, sciences, and technology through quality instruction, and responsive research and development activities. It aims to produce professional, skilled, and morally upright individuals who are globally competitive.” The University is offering close to 100 curricular programs at the undergraduate and graduate levels. It has more than 25,000 students and 1,200 faculty and staff across all campuses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Recognitions and Achievements</h3>
              <p className="text-base text-gray-600 mb-4">
                CvSU has been accredited by TESDA as a Trade and Testing Venue, and designated by the Department of Agriculture as the National Center for Research and Development for Coffee and Urban Agriculture. The University also hosts the Southern Tagalog Agriculture Research and Development Consortium (STARDEC), the Affiliated Renewable Energy Center for Region IV-A, and the Regional ICT Center for Region IV-A.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Commitment to Excellence</h3>
              <p className="text-base text-gray-600 mb-4">
                CvSU adheres to its commitment to Truth, Excellence, and Service, aiming to be the “premier university in historic Cavite recognized for excellence in the development of globally competitive and morally upright individuals.”
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Contact/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HistoryPage;
