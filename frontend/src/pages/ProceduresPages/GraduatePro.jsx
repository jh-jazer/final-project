import React from "react";
import { motion } from "framer-motion";
import Topnav from "../../components/Topnav";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import History from "../../assets/admission.png";
import { Link } from "react-router-dom";

const ApplyProcedures = () => {
  const steps = [
    "Wait for the announcement regarding the schedule of the application for admission on our Facebook page or this website.",
    "Fill up the application form in the admission portal then upload documentary requirements.",
    "Select an appointment schedule for validation of requirements.",
    "Validation and evaluation of documentary requirements.",
    "Applicant will undergo department evaluation and will not take the entrance examination. The result of the evaluation will determine if the applicant is qualified to proceed.",
    "Issuance of Notice of Admission (NOA) for qualified applicants.",
    "For accepted applicants, secure a medical referral slip from the Health Service Unit and proceed to a medical examination.",
    "Claim the medical clearance at the Health Service Unit.",
    "Submit the following requirements to the Office of the Campus Registrar to process your enrollment:",
  ];

  const documents = [
    "Transcript of Records",
    "Notice of Admission (NOA)",
    "Medical Clearance",
    "Short brown envelope (Indicate Last name, First name, Program Applied at the back)",
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
            Bachelor Degree Graduate Procedures
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
              Steps for Bachelor Degree Graduate Admission
            </h2>
            <ul className="space-y-4 list-decimal list-inside">
              {steps.map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold text-[#081708]">
              Required Documents
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              {documents.map((doc, index) => (
                <li key={index} className="text-lg">
                  {doc}
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
