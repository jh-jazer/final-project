import React from "react";
import Contact from "../../components/Contact"; // Import your Footer component
import Topnav from "../../components/Topnav"; // Import your Topnav component
import Footer from "../../components/Footer"; // Import your Footer component
import History from '../../assets/history.png';

const ComputerStudies = () => {
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
          <h1 className="text-5xl pt-[10%] text-white text-left font-bold">Department of Computer Science</h1>
        </div>
      </header>

      {/* Topnav */}
      <Topnav />

      {/* Main Content Section */}
      <main className="py-16 px-4 md:px-12 bg-[#E8E8E8] p-8 rounded-lg shadow-lg max-w-screen-xl mx-auto w-full">
        
          <h3 className="text-5xl font-semibold text-green-800 mb-11 text-center">Faculty </h3>
          
  

          {/* Organizational Chart */}
          <div className="flex flex-col items-center space-y-10">
            
             {/* Chairperson */}
            <div className="flex flex-col items-center space-y-2 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <div className="text-2xl font-semibold text-green-800">Chairperson</div> {/* Emphasizing Chairperson */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Donnalyn B. Montallana, MIT</strong> {/* Name of the Chairperson */}
              </div>
            </div>
          </div>
          
          {/* Program Chairs */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10 mx-4">
  
  {/* Program Chair, CS */}
  <div className="flex flex-col items-center space-y-2 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
    <div className="text-2xl font-semibold text-green-800">Program Chair, CS</div>
    <div className="bg-gray-50 p-6 rounded-lg w-full sm:w-[100%] sm:w-[400px] text-center shadow-md hover:shadow-xl transition-shadow duration-200">
      <strong className="text-lg text-green-800">Ely Rose L. Pangabinan-Briones, MIT</strong>
    </div>
  </div>

  {/* Program Chair, IT */}
  <div className="flex flex-col items-center space-y-2 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
    <div className="text-2xl font-semibold text-green-800">Program Chair, IT</div>
    <div className="bg-gray-50 p-6 rounded-lg w-full sm:w-[100%] sm:w-[400px] text-center shadow-md hover:shadow-xl transition-shadow duration-200">
      <strong className="text-lg text-green-800">Jovelyn D. Ocampo, MIT</strong>
    </div>
  </div>

</div>
            <hr class="border-t-2 border-gray-300 my-11" />

            

            {/* Staff / Instructors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Steffanie M. Bato, MIT</strong> - Head, OSAS
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Aida M. Penson, LPT</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Allen Dave M. Coles</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Alvin D. Catalo, MIT</strong> - Research Coordinator, DCS
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Alvin P. Celino</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Alvina E. Ramallosa</strong> - Extension Coordinator, DCS
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Ashley Q. Manuel</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Benidick Sarmiento</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Cesar B. Talibong</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Clarissa V. Rostrollo</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Edan A. Belgica</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Edmund C. Martinez</strong> - Instructor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">Engr. Richard D. Ongayo</strong> - Assistant Professor
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
                <strong className="text-lg text-green-800">James D. Mañozo, LPT</strong> - Instructor
              </div>
              {/* Add the rest of the instructors here */}
            </div>
          
       
      </main>
      <Contact/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ComputerStudies;
