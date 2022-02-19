import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SideBarContext from '../../contexts/SideBarContext';
import Logo from './../logo/Logo';
import AuthContext from './../../contexts/AuthContext';
import ToggleSignupModalWrapper from './../modal/ToggleSignupModalWrapper';
import ToggleSideMenuButton from '../button/ToggleSideMenuButton';

const ShopHeader = () => {
  const sideBarContext = useContext(SideBarContext);
  const authContext = useContext(AuthContext);

  return (
    <>
      <Box>
        <AppBar position="sticky" color="">
          <Toolbar>
            <ToggleSideMenuButton />
            <Logo />
            {!authContext.isLoggedIn && (
              <ToggleSignupModalWrapper>
                <Button color="primary">Đăng ký</Button>
              </ToggleSignupModalWrapper>
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
