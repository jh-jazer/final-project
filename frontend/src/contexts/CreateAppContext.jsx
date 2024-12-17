import React, { createContext, useState, useContext } from 'react';

// Create Context for active item
const ActiveItemContext = createContext();

export const useActiveItem = () => {
  const context = useContext(ActiveItemContext);
  if (!context) {
    throw new Error('useActiveItem must be used within an ActiveItemProvider');
  }
  return useContext(ActiveItemContext);
};

export const ActiveItemProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState(null);
  
  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};
