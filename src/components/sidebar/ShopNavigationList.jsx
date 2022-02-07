import React, { useContext } from 'react';

import { List } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactPageIcon from '@mui/icons-material/ContactPage';

import RouterLink from '../navigation/RouterLink';
import SideBarItem from './SideBarItem';
import AuthContext from './../../contexts/AuthContext';
import auth from './../../apis/auth';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryNavigation from './CategoryNavigation';

const shopNavigation = [
  {
    link: '/',
    startIcon: <HomeIcon />,
    text: 'Trang chủ',
  },
  {
    link: '/contact',
    startIcon: <ContactPageIcon />,
    text: 'Liên hệ',
  },
];

const ShopNavigationList = ({ toggleAdminMenu, toggleSideBar }) => {
  const authContext = useContext(AuthContext);

  return (
    <List>
      {authContext.role === auth.availableRole.admin && (
        <SideBarItem
          onClick={toggleAdminMenu}
          startIcon={<AdminPanelSettingsIcon />}
          endIcon={<ChevronRightIcon />}
          text="Quản lý"
        />
      )}

      {shopNavigation.map((nav) => (
        <RouterLink to={nav.link} onClick={toggleSideBar} key={nav.text}>
          <SideBarItem startIcon={nav.startIcon} text={nav.text} />
        </RouterLink>
      ))}
      <CategoryNavigation />
    </List>
  );
};

export default ShopNavigationList;
