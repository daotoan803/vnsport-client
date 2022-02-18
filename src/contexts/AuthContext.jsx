import React, { createContext, useState } from 'react';
import auth from '../apis/authApi';

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
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());
  const [role, setRole] = useState(auth.getRole());
  const [token, setToken] = useState(auth.getToken());

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
