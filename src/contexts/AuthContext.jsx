import React, { createContext, useState, useEffect } from 'react';
import authApi from '../apis/auth.api';

const AuthContext = createContext({
  isLoggedIn: false,
  role: '',
  token: '',
  user: {},
  onLoginSuccess({ role, token }) {
    role, token;
  },
  onLogout() {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem('role')) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('token')) || null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  const onLoginSuccess = ({ role, token, user }) => {
    if (role) setRole(role);
    setIsLoggedIn(true);
    setToken(token);
    setUser(user);
  };

  const onLogout = () => {
    authApi.logout();
    setIsLoggedIn(false);
    setToken(null);
    setRole(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      authApi.initializeToken(token);
      authApi.checkToken().then((res) => {
        if (res.status !== 204) {
          onLogout();
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, token, user, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
