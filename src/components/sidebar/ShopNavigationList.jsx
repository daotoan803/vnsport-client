import React from 'react';

import { List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import RouterLink from '../navigation/RouterLink';
import SideBarItem from './SideBarItem';

const ShopNavigationList = () => {
  return (
    <List>
      <RouterLink to="/">
        <SideBarItem startIcon={<HomeIcon />} text="Trang chủ" />
      </RouterLink>

      <RouterLink to="/products">
        <SideBarItem startIcon={<ShoppingBagIcon />} text="Sản phẩm" />
      </RouterLink>

      <RouterLink to="/contact">
        <SideBarItem startIcon={<ContactPageIcon />} text="Liên hệ" />
      </RouterLink>
    </List>
  );
};

export default ShopNavigationList;
