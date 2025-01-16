import React, { createContext, useState, useContext } from 'react';

// Create Context for active item
const ActiveItemContext = createContext();

export const useActiveItem = () => {
  const context = useContext(ActiveItemContext);
  if (!context) {
    throw new Error('useActiveItem must be used within an ActiveItemProvider');
  }
  return context;
};

export const ActiveItemProvider = ({ children }) => {
  const [activeItem, setActiveItem] = useState({ id: null, route: null }); // Initializing as an object

  return (
    <ActiveItemContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </ActiveItemContext.Provider>
  );
};
