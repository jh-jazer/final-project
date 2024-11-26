import React, { createContext, useContext, useState } from "react";

// Create a Context for the App
const AppContext = createContext();

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

// AppContext provider component
export const AppProvider = ({ children }) => {
  const [applicantType, setApplicantType] = useState("");
  const [seniorHighTrack, setSeniorHighTrack] = useState("");
  const [strand, setStrand] = useState("");
  const [preferredProgram, setPreferredProgram] = useState("");

  // You can update this logic as per your needs, like fetching data from an API
  return (
    <AppContext.Provider
      value={{
        applicantType,
        setApplicantType,
        seniorHighTrack,
        setSeniorHighTrack,
        strand,
        setStrand,
        preferredProgram,
        setPreferredProgram,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
