import React from 'react';
import Typography from '@mui/material/Typography';
import ShopHeader from './components/header/ShopHeader';
import MenuSideBar from './components/sidebar/MenuSideBar';
import LoginModal from './components/modal/LoginModal';
import CartSideBar from './components/sidebar/CartSideBar';
import SignupModal from './components/modal/SignupModal';

const App = () => {
  return (
    <>
      <SignupModal />
      <LoginModal />
      <MenuSideBar />
      <CartSideBar />
      <ShopHeader />
      <Typography variant="h2">Hello world</Typography>
    </>
  );
};

export default App;
