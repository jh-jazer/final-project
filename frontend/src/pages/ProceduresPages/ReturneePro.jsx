import React from "react";
import { motion } from "framer-motion";
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import History from "../../assets/admission.png";
import { Link } from "react-router-dom";

const ApplyProcedures = () => {
  const steps = [
    "Submission and evaluation of grades at the Office of the Campus Registrar.",
    "Submit the Certificate of Grades (All subjects).",
    "After evaluation, accomplish the Re-Admission form and submit it to the Office of the Campus Registrar.",
  ];

  return (
    <div className="bg-[#E8E8E8] text-gray-800">
      {/* Header with Background Image */}
      <header
        className="relative bg-cover bg-center text-white pt-32"
        style={{ backgroundImage: `url(${History})`, height: "400px" }}
      >
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl pt-[170px] text-white text-left font-bold">
            Returnee Procedures
          </h1>
        </div>
      </header>

      {/* Topnav */}
      <Topnav />

      {/* Main Content Section */}
      <main className="py-16">
        <div className="container mx-auto px-4 md:px-0">
          {/* Procedures Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[#081708]">
              Steps for Returning Students
            </h2>
            <ul className="space-y-4 list-decimal list-inside">
              {steps.map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </main>

       {/* Return Button */}
       <div className="flex justify-center py-4">
        <Link to="/procedures">
          <button className="px-6 py-2 bg-[#081708] text-white font-semibold rounded-lg hover:bg-[#1c2c1e]">
            Return to Procedures Page
          </button>
        </Link>
      </div>

      {/* Footer */}
      <Contact />
      <Footer />
    </div>
  );
};

export default ApplyProcedures;
