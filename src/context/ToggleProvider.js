import React, { createContext, useState } from 'react';

// Create a context
const ToggleContext = createContext();

// Create a provider component
const ToggleProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the state
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export { ToggleContext, ToggleProvider };