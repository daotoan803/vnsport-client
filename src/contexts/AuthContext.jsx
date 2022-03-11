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
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
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
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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
