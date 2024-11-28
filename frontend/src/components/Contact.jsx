import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Government Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Government Links</h3>
            <ul className="space-y-2">
            <li>
                <a
                  href="https://www.gov.ph/"
                  className="hover:underline hover:text-gray-600"
                >
                  Government PH
                </a>
              </li>
              <li>
                <a
                  href="https://ched.gov.ph/"
                  className="hover:underline hover:text-gray-600"
                >
                  CHED
                </a>
              </li>
              <li>
                <a
                  href="https://www.dost.gov.ph/"
                  className="hover:underline hover:text-gray-600"
                >
                  DOST
                </a>
              </li>
              <li>
                <a
                  href="https://cavite.gov.ph/"
                  className="hover:underline hover:text-gray-600"
                >
                  Cavite PH
                </a>
              </li>
              <li>
                <a
                  href="https://bacoor.gov.ph/"
                  className="hover:underline hover:text-gray-600"
                >
                  Bacoor City
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/apply"
                  className="hover:underline hover:text-gray-600"
                >
                  Admission Procedures
                </a>
              </li>
              <li>
                <a
                  href="acadprog"
                  className="hover:underline hover:text-gray-600"
                >
                  Academic Programs
                </a>
              </li>
              <li>
                <a
                  href="newsupdates"
                  className="hover:underline hover:text-gray-600"
                >
                  News and Updates
                </a>
              </li>
              <li>
                <a
                  href="careers"
                  className="hover:underline hover:text-gray-600"
                >
                  Careers @ CvSU
                </a>
              </li>
              <li>
                <a
                  href="forms"
                  className="hover:underline hover:text-gray-600"
                >
                  Downloadable Forms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-sm mb-2">
              Soldiers Hills IV, Molino VI,City of Bacoor, Cavite
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
