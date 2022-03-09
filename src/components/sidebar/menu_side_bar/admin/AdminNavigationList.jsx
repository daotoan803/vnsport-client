import React, { useContext } from 'react';

import { List } from '@mui/material';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import RouterLink from '../../../navigation/SideBarLink';
import SideBarItem from '../SideBarItem';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import auth from '../../../../apis/auth.api';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AuthContext from '../../../../contexts/AuthContext';

const adminNavigation = [
  {
    startIcon: <ShowChartIcon />,
    text: 'Thống kê doanh số',
    link: '/admin/dashboard',
  },
  {
    startIcon: <Inventory2Icon />,
    text: 'Quản lý sản phẩm',
    link: '/admin/products',
  },
  {
    startIcon: <GroupIcon />,
    text: 'Quản lý tài khoản',
    link: '/admin/accounts',
  },
  {
    startIcon: <LibraryBooksIcon />,
    text: 'Quản lý đơn hàng',
    link: '/admin/orders',
  },
  {
    startIcon: <SupportAgentIcon />,
    text: 'Hỗ trợ khách hàng',
    link: '/admin/chat',
  },
];

const AdminNavigationList = ({ toggleAdminMenu, toggleSideBar }) => {
  const authContext = useContext(AuthContext);

  return (
    <List>
      {authContext.role === auth.availableRole.admin && (
        <SideBarItem
          onClick={toggleAdminMenu}
          startIcon={<ChevronLeftIcon />}
          endIcon={<StorefrontIcon />}
          text="Cửa hàng"
        />
      )}

      {adminNavigation.map((nav) => (
        <RouterLink to={nav.link} onClick={toggleSideBar} key={nav.text}>
          <SideBarItem startIcon={nav.startIcon} text={nav.text} />
        </RouterLink>
      ))}
    </List>
  );
};

export default AdminNavigationList;
