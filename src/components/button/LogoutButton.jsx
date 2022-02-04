import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import authApi from './../../apis/auth';
import AuthContext from './../../contexts/AuthContext';
import AlertContext from './../../contexts/AlertContext';

const LogoutButton = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const logout = () => {
    authApi.logout();
    authContext.toggleLoggedIn();
    authContext.setRole('');
    alertContext.showSuccessAlert('Đăng xuất thành công');
  };

  return (
    <Button variant="outlined" startIcon={<LogoutIcon />} onClick={logout}>
      Đăng xuất
    </Button>
  );
};

export default LogoutButton;
