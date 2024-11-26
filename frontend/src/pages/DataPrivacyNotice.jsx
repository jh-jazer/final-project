import React from 'react';
import { Link } from 'react-router-dom';
import StudentImage from '../assets/student.jpg'

const DataPrivacyNotice = () => {
  return (
    <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${StudentImage})` }}
      >
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        {/* Main Content */}
        {/* Header Section */}
        <h1 className="text-3xl font-extrabold text-[#C61A01] text-center mb-6">
          Data Privacy Notice and Consent Form
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 text-justify mb-4">
          Cavite State University (CvSU) is required by law to process your personal information and sensitive personal
          information in order to safeguard academic freedom, uphold your right to quality education, and protect your
          right to data privacy in conformity with Republic Act No. 10173, otherwise known as the Data Privacy Act of
          2012, and its implementing rules and regulations. The said law can be viewed via{' '}
          <a
            href="https://www.officialgazette.gov.ph/2012/08/15/republic-act-no-10173/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C61A01] underline hover:text-[#C61A01]/80"
          >
            this link
          </a>
          .
        </p>

        {/* Personal Information */}
        <h2 className="text-2xl font-bold text-[#C61A01] mt-6">Personal Information Collected and Stored</h2>
        <p className="text-gray-700 text-justify mb-4">
          The University collects, uses and keeps your personal information, which include but are not limited to, the
          following:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Name, age, date of birth</li>
          <li>Address and contact details</li>
          <li>Civil Status, Nationality, Religion</li>
          <li>Family Profile (e.g., names of parents/guardians, address, contact details)</li>
          <li>Medical history and records</li>
          <li>Choice of campus and degree program</li>
          <li>Educational records</li>
          <li>Learner reference number (if any)</li>
          <li>Photograph or image</li>
          <li>Signature</li>
          <li>Socio-economic and geographic information about your household</li>
        </ul>

        {/* Sensitive Personal Information */}
        <h2 className="text-2xl font-bold text-[#C61A01] mt-6">Sensitive Personal Information Collected and Stored</h2>
        <p className="text-gray-700 text-justify mb-4">
          The University also processes sensitive personal information under the DPA. These include, but are not limited
          to: race, ethnicity, civil status, health information, government-issued ID, and relevant financial
          information.
        </p>

        {/* Disclosure and Security */}
        <h2 className="text-2xl font-bold text-[#C61A01] mt-6">Disclosure</h2>
        <p className="text-gray-700 text-justify mb-4">
          To comply with its legal and regulatory duties, the University submits required information to relevant
          government agencies such as the Commission on Higher Education (CHED). As a rule, CvSU will only disclose your
          personal data to third parties with your consent, except when required or allowed by applicable laws.
        </p>
        <h2 className="text-2xl font-bold text-[#C61A01] mt-6">Security</h2>
        <p className="text-gray-700 text-justify mb-4">
          Your personal data is stored in physical repositories and secured databases managed by the University's
          Registrar, ICT Office, and/or their counterparts in the CvSU Campuses. The University employs appropriate
          physical, technical, and organizational security measures which ensure the confidentiality of your
          information. These measures will be reviewed and updated over time.
        </p>

        {/* Consent */}
        <h2 className="text-2xl font-bold text-[#C61A01] mt-6">Consent</h2>
        <p className="text-gray-700 text-justify mb-4">
          By continuing, you confirm that you have read the CvSU Privacy Notice and Consent Form, understood its
          contents, and consent to the processing of your personal data in accordance with the said notice and
          applicable laws.
        </p>
        <Link
        to="/create">
        {/* Action Button */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-[#C61A01] text-white font-bold rounded-lg hover:bg-[#C61A01]/90 focus:ring-2 focus:ring-[#C61A01] focus:outline-none">
            I Agree
          </button>
        </div>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default DataPrivacyNotice;
