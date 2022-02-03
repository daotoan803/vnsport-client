import React from 'react';
import { Typography } from '@mui/material';
import RouterLink from '../navigation/RouterLink';

const Logo = (props) => {
  return (
    <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }} {...props}>
      <RouterLink to="/">
        <Typography variant="inherit" component="span" color="primary">
          VN
        </Typography>
        SPORT
      </RouterLink>
    </Typography>
  );
};

export default Logo;
