import React, { useContext } from 'react';
import SideBarContext from '../../contexts/SideBarContext';

import { Drawer, Divider, List, Stack } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import Logo from './../logo/Logo';
import RouterLink from '../navigation/RouterLink';
import SideBarItem from './SideBarItem';
import Button from '@mui/material/Button';

const ShopSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  return (
    <Drawer
      anchor="left"
      open={sideBarContext.sideBarIsOpen}
      onClose={sideBarContext.toggleSideBar}>
      <Logo variant="h5" sx={{ mx: 9, my: 1 }} />
      <Divider />
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', my: 1 }}
        spacing={2}>
        <Button variant="outlined">
          <RouterLink to="/login">Đăng nhập</RouterLink>
        </Button>
        <Button variant="outlined">
          <RouterLink to="/signup">Đăng Ký</RouterLink>
        </Button>
      </Stack>
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
    </Drawer>
  );
};

export default ShopSideBar;
