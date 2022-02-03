import React from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const SideBarItem = ({ icon, text }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon sx={{ mr: 0 }}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
