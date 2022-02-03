import React from 'react';
import Typography from '@mui/material/Typography';
import ShopHeader from './components/header/ShopHeader';
import ShopMenuSideBar from './components/sidebar/ShopMenuSideBar';
import LoginModal from './components/modal/LoginModal';
import CartSideBar from './components/sidebar/CartSideBar';

const App = () => {
  return (
    <>
      <LoginModal />
      <ShopMenuSideBar />
      <CartSideBar />
      <ShopHeader />
      <Typography variant="h2">Hello world</Typography>
    </>
  );
};

export default App;
