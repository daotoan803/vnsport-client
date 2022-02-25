import React, { useState } from 'react';

import { Paper, Container, Box, Tabs, Tab, Typography } from '@mui/material';

import { Outlet, Link, useLocation } from 'react-router-dom';

const activeRoutes = {
  '': 0,
  new: 1,
  brands: 2,
  categories: 3,
};

const AdminProductPage = () => {
  const { pathname } = useLocation();

  const currentTab = pathname.split('/admin/products/')[1];
  const activeTabIndex = activeRoutes[currentTab] || 0;

  const [activeTab, setActiveTab] = useState(activeTabIndex);

  return (
    <Container component={Paper}>
      <Typography>This is admin products page</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(e, newTab) => setActiveTab(newTab)}>
          <Tab component={Link} to="" label="Quản lý sản phẩm"></Tab>
          <Tab component={Link} to="new" label="Thêm sản phẩm"></Tab>
          <Tab component={Link} to="brand" label="Thương hiệu"></Tab>
          <Tab component={Link} to="category" label="Danh mục "></Tab>
        </Tabs>
      </Box>
      <Outlet />
      <h1>outlet should show here</h1>
    </Container>
  );
};

export default AdminProductPage;
