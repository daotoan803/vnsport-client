import React from 'react';
import { Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Logo = (props) => {
  return (
    <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }} {...props}>
      <Link component={RouterLink} underline="none" color="inherit" to="/">
        <Typography variant="inherit" component="span" color="primary">
          VN
        </Typography>
        SPORT
      </Link>
    </Typography>
  );
};

export default Logo;
