import React, { createContext, useState, useEffect } from 'react';
import auth from './../apis/auth';

const AuthContext = createContext({
  isLoggedIn: false,
  role: '',
  token: '',
  setToken: '',
  toggleLoggedIn() {},
  setRole() {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [token, setToken] = useState(auth.getToken());

  useEffect(() => {
    setIsLoggedIn(auth.isLoggedIn());
    setRole(auth.getRole());
  }, []);

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, toggleLoggedIn, role, setRole, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
