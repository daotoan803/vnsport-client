import React from 'react';
import { Outlet } from 'react-router-dom';
import ShopHeader from './../../components/header/ShopHeader';

const AdminIndexPage = () => {
  return (
    <>
      <ShopHeader />
      <h1>This is admin pages</h1>
      <Outlet />
    </>
  );
};

export default AdminIndexPage;
