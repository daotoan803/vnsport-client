import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import SideBarContext from '../../contexts/SideBarContext';
import Logo from './../logo/Logo';

const ShopHeader = () => {
  const sideBarContext = useContext(SideBarContext);

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
            <Button color="primary">Đăng ký</Button>
            <IconButton color="primary">
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ShopHeader;
