import React, { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SideBarContext from './../../contexts/SideBarContext';

const ToggleSideMenuButton = () => {
  const sideBarContext = useContext(SideBarContext);
  
  return (
    <IconButton
      size="large"
      edge="start"
      color="primary"
      sx={{ mr: 2 }}
      onClick={sideBarContext.toggleSideBar}>
      <MenuIcon />
    </IconButton>
  );
};

export default ToggleSideMenuButton;
