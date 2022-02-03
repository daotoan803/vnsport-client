import React, { useContext } from 'react';
import SideBarContext from '../../contexts/SideBarContext';

import ModalContext from '../../contexts/ModalContext';

import { Drawer, Divider, List, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from '../logo/Logo';
import RouterLink from '../navigation/RouterLink';
import SideBarItem from './SideBarItem';
import Button from '@mui/material/Button';
import AuthContext from './../../contexts/AuthContext';
import auth from './../../apis/auth';

const ShopMenuSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  const logout = () => {
    auth.logout();
    authContext.toggleLoggedIn();
    authContext.setRole('');
  };

  return (
    <Drawer
      anchor="left"
      open={sideBarContext.sideBarIsOpen}
      onClose={sideBarContext.toggleSideBar}>
      <Logo variant="h5" sx={{ mx: 9, my: 1 }} />
      <Divider />
      <List>
        <RouterLink to="/">
          <SideBarItem icon={<HomeIcon />} text="Trang chủ" />
        </RouterLink>

        <RouterLink to="/products">
          <SideBarItem icon={<ShoppingBagIcon />} text="Sản phẩm" />
        </RouterLink>

        <RouterLink to="/contact">
          <SideBarItem icon={<ContactPageIcon />} text="Liên hệ" />
        </RouterLink>
      </List>
      <Divider />
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', my: 1 }}
        spacing={2}>
        {!authContext.isLoggedIn && (
          <>
            <Button variant="contained">
              <RouterLink to="/signup">Đăng Ký</RouterLink>
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                sideBarContext.toggleSideBar();
                modalContext.toggleLoginModal();
              }}>
              <RouterLink to="/login">Đăng nhập</RouterLink>
            </Button>
          </>
        )}
        {authContext.isLoggedIn && (
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={logout}>
            <RouterLink to="/signup">Đăng xuất</RouterLink>
          </Button>
        )}
      </Stack>
    </Drawer>
  );
};

export default ShopMenuSideBar;
