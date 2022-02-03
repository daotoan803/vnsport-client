import React, { createContext, useState, useEffect } from 'react';
import auth from './../apis/auth';

const AuthContext = createContext({
  isLoggedIn: false,
  role: '',
  toggleLoggedIn() {},
  setRole() {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    setIsLoggedIn(auth.isLoggedIn());
    setRole(auth.getRole());
  }, []);

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLoggedIn, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
