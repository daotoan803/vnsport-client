import React from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const SideBarItem = ({ startIcon, endIcon, text, onClick }) => {
  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        <ListItemIcon sx={{ mr: 0 }}>{startIcon}</ListItemIcon>
        <ListItemText primary={text} />
        <ListItemIcon sx={{ mr: 0 }}>{endIcon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
