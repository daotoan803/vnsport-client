import React, { createContext, useState, useEffect } from 'react';
import auth from '../apis/authApi';

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
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());
  const [role, setRole] = useState(auth.getRole());
  const [token, setToken] = useState(auth.getToken());
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const onLoginSuccess = ({ role, token, user }) => {
    if (role) setRole(role);
    setToken(token);
    setIsLoggedIn(true);
    setUser(user);
  };

  const onLogout = () => {
    auth.logout();
    setIsLoggedIn(false);
    setToken(null);
    setRole(null);
    setUser(null);
  };

  useEffect(() => {
    auth.validateToken().then((res) => {
      console.log(res);
      if (res.status === 401) {
        onLogout();
        auth.logout();
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, role, token, user, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
