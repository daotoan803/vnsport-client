import React from 'react';

import { List } from '@mui/material';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import RouterLink from '../navigation/RouterLink';
import SideBarItem from './SideBarItem';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const AdminNavigationList = () => {
  return (
    <List>
      <RouterLink to="/admin/products">
        <SideBarItem startIcon={<ShowChartIcon />} text="Thống kê doanh số" />
      </RouterLink>

      <RouterLink to="/admin/products">
        <SideBarItem startIcon={<Inventory2Icon />} text="Quản lý sản phẩm" />
      </RouterLink>

      <RouterLink to="/contact">
        <SideBarItem startIcon={<GroupIcon />} text="Quản lý tài khoản" />
      </RouterLink>

      <RouterLink to="/contact">
        <SideBarItem startIcon={<LibraryBooksIcon />} text="Quản lý đơn hàng" />
      </RouterLink>

      <RouterLink to="/contact">
        <SideBarItem
          startIcon={<SupportAgentIcon />}
          text="Hỗ trợ khách hàng"
        />
      </RouterLink>
    </List>
  );
};

export default AdminNavigationList;
