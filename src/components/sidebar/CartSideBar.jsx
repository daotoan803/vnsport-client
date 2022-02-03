import React, { useContext } from 'react';

import { Drawer } from '@mui/material';
import SideBarContext from './../../contexts/SideBarContext';

const CartSideBar = () => {
  const sideBarContext = useContext(SideBarContext);

  return (
    <Drawer
      anchor="right"
      open={sideBarContext.cartIsOpen}
      onClose={sideBarContext.toggleCart}>
      Hello
    </Drawer>
  );
};

export default CartSideBar;
