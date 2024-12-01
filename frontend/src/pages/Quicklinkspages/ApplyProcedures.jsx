import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import Topnav from "../../components/Topnav"; 
import Footer from "../../components/Footer";
import Contact from "../../components/Contact"; 
import History from '../../assets/admission.png';
import { CheckIcon } from "@heroicons/react/24/outline"; 

const ApplyProcedures = () => {
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
          <h1 className="text-5xl pt-[170px] text-white text-left font-bold">Requirements and Procedures</h1>
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
            {/* Freshmen Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-green-800 mb-5">Freshmen</h3>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Graduate/graduating Senior High School student or ALS Passer</p>
              </div>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have no enrollment record for a degree program in any University/College</p>
              </div>
              <Link to="/freshmen" className="text-lg text-blue-500 hover:underline">Learn More</Link>
            </div>

            {/* Transferee Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-green-800 mb-5">Transferee</h3>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have an enrollment record for a program in other University/College</p>
              </div>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have GPA of 2.00 or better and without failing grade</p>
              </div>
              <Link to="/transferee" className="text-lg text-blue-500 hover:underline">Learn More</Link>
            </div>

            {/* Bachelor's Degree Graduate Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-green-800 mb-5">Bachelor's Degree Graduate</h3>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have finished a bachelor's degree program</p>
              </div>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Will enroll for another bachelor degree program</p>
              </div>
              <Link to="/graduatee" className="text-lg text-blue-500 hover:underline">Learn More</Link>
            </div>

            {/* Returnee Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-green-800 mb-5">Returnee</h3>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have an existing enrollment record in Bacoor Campus</p>
              </div>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Have no enrollment record in other University/College prior to the application</p>
              </div>
              <div className="flex items-start mb-4">
                <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-lg text-gray-600">Not enrolled in the current or previous semester</p>
              </div>
              <Link to="/returnee" className="text-lg text-blue-500 hover:underline">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Contact/>
      <Footer />
    </div>
  );
};

export default ApplyProcedures;
