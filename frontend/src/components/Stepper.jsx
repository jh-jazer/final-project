import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import "./stepper.css"; // Make sure you create this file or adjust the styles as needed

const Stepper = () => {
  // Define the phases for your admission application process
  const steps = [
    "Application Details",
    "Personal Info",
    "Contact Details",
    "Family Profile",
    "Educational Info",
    "Upload Requirements",
    "Schedule Appointment",
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  // Define the fields for each phase
  const renderStepFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Application Number
            </label>
            <input
              type="text"
              placeholder="Enter application number"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block mt-4 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent/Guardian Name
            </label>
            <input
              type="text"
              placeholder="Enter parent's/guardian's name"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block mt-4 text-sm font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              placeholder="Enter relationship"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 5:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last School Attended
            </label>
            <input
              type="text"
              placeholder="Enter last school attended"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block mt-4 text-sm font-medium text-gray-700">
              Year Graduated
            </label>
            <input
              type="number"
              placeholder="Enter year graduated"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 6:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Documents
            </label>
            <input
              type="file"
              multiple
              className="mt-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      case 7:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choose an Appointment Date
            </label>
            <input
              type="date"
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      default:
        return <p>Unknown Step</p>;
    }
  };

  return (
    <div className="w-full">
      {/* Stepper Component */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-item ${
              currentStep === index + 1 && "active"
            } ${(index + 1 < currentStep || complete) && "complete"} `}
          >
            <div className="step">
              {index + 1 < currentStep || complete ? (
                <TiTick size={24} />
              ) : (
                index + 1
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {/* Fields for Current Step */}
      <div className="mt-6">{renderStepFields()}</div>

      {/* Navigation Buttons */}
      {!complete && (
        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
            onClick={() => {
              currentStep === steps.length
                ? setComplete(true)
                : setCurrentStep((prev) => prev + 1);
            }}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
          {currentStep > 1 && (
            <button
              className="px-4 py-2 ml-4 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400 transition duration-300"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Back
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Stepper;
