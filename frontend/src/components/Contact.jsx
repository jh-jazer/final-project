import React from "react";
import { Link } from 'react-router-dom';
import Republic from '../assets/republic.png';

const ContactSection = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-11">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-0">
          
          {/* Government Links */}
          <div>
            <Link to="https://www.gov.ph/">
              <img
                src={Republic}
                alt="Republic"
                className="scale-50 lg:scale-75"
              />
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Government Links</h3>
            <ul className="space-y-1 m-0"> {/* Reduced space between items */}
              <li className="m-0">
                <a href="https://www.gov.ph/" className="hover:underline hover:text-gray-600">
                  Government PH
                </a>
              </li>
              <li className="m-0">
                <a href="https://ched.gov.ph/" className="hover:underline hover:text-gray-600">
                  CHED
                </a>
              </li>
              <li className="m-0">
                <a href="https://www.dost.gov.ph/" className="hover:underline hover:text-gray-600">
                  DOST
                </a>
              </li>
              <li className="m-0">
                <a href="https://cavite.gov.ph/" className="hover:underline hover:text-gray-600">
                  Cavite PH
                </a>
              </li>
              <li className="m-0">
                <a href="https://bacoor.gov.ph/" className="hover:underline hover:text-gray-600">
                  Bacoor City
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 m-0"> {/* Reduced space between items */}
              <li className="m-0">
                <a href="/apply" className="hover:underline hover:text-gray-600">
                  Admission Procedures
                </a>
              </li>
              <li className="m-0">
                <a href="newsRef" className="hover:underline hover:text-gray-600">
                  News and Updates
                </a>
              </li>
              <li className="m-0">
                <a href="https://cvsu.edu.ph/bacoor/" className="hover:underline hover:text-gray-600">
                  About Bacoor Branch
                </a>
              </li>
              <li className="m-0">
                <a href="https://cvsu.edu.ph" className="hover:underline hover:text-gray-600">
                  Main Campus
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-sm mb-2">
              <strong>Location: </strong>Soldiers Hills IV, Molino VI, Bacoor City, Cavite
            </p>
            <p className="text-sm mb-2">
              <strong>Email:</strong> <a href="mailto:cvsubacoor@cvsu.edu.ph" className="hover:underline hover:text-gray-600">cvsubacoor@cvsu.edu.ph</a>
            </p>
            <p className="text-sm">
              <strong>Call: </strong>  <a href="tel:+63464765029" className="hover:underline hover:text-gray-600">(046) 476-5029</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
