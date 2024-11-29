import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component that will wrap the parts of your app that need access to authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the current authenticated user
  const [loading, setLoading] = useState(true); // Loading state to check if auth info is ready

  useEffect(() => {
    // Check for authentication token in localStorage or from API, for example
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Assuming user data is stored in JSON format
    }
    setLoading(false); // Finished loading the auth data
  }, []);

  const login = (userData) => {
    console.log("user",userData)
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
