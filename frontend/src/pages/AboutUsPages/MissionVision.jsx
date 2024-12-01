import React from 'react';
import Contact from "../../components/Contact"; // Import your Footer component
import History from '../../assets/history.png';
import Topnav from '../../components/Topnav'; // Import your Topnav component
import Footer from '../../components/Footer'; // Import your Footer component

const MissionVisionPage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header with Background Image */}
      <header
        className="relative bg-cover bg-center text-white pt-32"
        style={{ backgroundImage: `url(${History})`, height: '400px' }} // Set a specific height for the header
      >
        {/* Dim overlay */}
        <div className="absolute inset-0 bg-[#081708]/80 flex items-center justify-center z-10"></div>

        {/* Header text */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl pt-[10%] text-white text-left font-bold">Mission and Vision</h1>
        </div>
      </header>

      {/* Topnav */}
      <Topnav />

      {/* Main Content Section */}
      <main className="py-16 px-8">
        {/* Mission Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            Cavite State University shall provide excellent, equitable and relevant educational opportunities in the arts, sciences and technology through quality instruction and responsive research and development activities. It shall produce professional, skilled and morally upright individuals for global competitiveness.
          </p>
          <div className="border-t-2 border-gray-300 my-6"></div>
          <p className="text-lg text-gray-600">
            Hangarin ng Pamantasan
            <br />
            “Ang Cavite State University ay makapagbigay ng mahusay, pantay at makabuluhang edukasyon sa sining, agham at teknolohiya sa pamamagitan ng may kalidad na pagtuturo at tumutugon sa pangangailangang pananaliksik at mga gawaing pangkaunlaran. Makalikha ito ng mga indibidwal ng dalubhasa, may kasaysayan at kagandahan-asal sa pandaigdigang kakayahan.”
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">Vision</h2>
          <p className="text-lg text-gray-600 mb-6">
            The premier university in historic Cavite globally recognized for excellence in character development, academics, research, innovation, and sustainable community engagement.
          </p>
          <div className="border-t-2 border-gray-300 my-6"></div>
          <p className="text-lg text-gray-600">
            Mithiin ng Pamantasan
            <br />
            “Ang nangungunang pamantasan sa makasaysayang Kabite na kinikilala sa kahusayan sa paghubog ng mga indibidwal na may pandaigdigang kakayahan at kagandahang asal.”
          </p>
        </div>

        {/* Quality Policy Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">Quality Policy</h2>
          <p className="text-lg text-gray-600">
            We commit to the highest standards of education, value our stakeholders, strive for continual improvement of our products and services, and uphold the University’s tenets of Truth, Excellence, and Service to produce globally competitive and morally upright individuals.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-10">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">Core Values</h2>
          <p className="text-lg text-center text-gray-600">
            <strong className="text-green-800">Truth</strong>   <strong className="text-green-800">Excellence</strong>   <strong className="text-green-800">Service</strong>
          </p>
        </div>
      </main>

      <Contact/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MissionVisionPage;
