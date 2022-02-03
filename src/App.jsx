import React from 'react';
import Typography from '@mui/material/Typography';
import ShopHeader from './components/header/ShopHeader';
import ShopSideBar from './components/sidebar/ShopSideBar';

const App = () => {
  return (
    <>
      <ShopSideBar />
      <ShopHeader />
      <Typography variant="h2">Hello world</Typography>
    </>
  );
};

export default App;
