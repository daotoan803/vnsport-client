import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SideBarContext from '../../contexts/SideBarContext';
import Logo from './../logo/Logo';
import AuthContext from './../../contexts/AuthContext';

const ShopHeader = () => {
  const sideBarContext = useContext(SideBarContext);
  const authContext = useContext(AuthContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" color="">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={sideBarContext.toggleSideBar}>
              <MenuIcon />
            </IconButton>
            <Logo />
            {!authContext.isLoggedIn && (
              <Button color="primary">Đăng ký</Button>
            )}
            {authContext.isLoggedIn && (
              <IconButton color="primary">
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            )}
            <IconButton color="primary" onClick={sideBarContext.toggleCart}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ShopHeader;
