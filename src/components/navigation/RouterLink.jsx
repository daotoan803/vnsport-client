import React from 'react';
import Link from '@mui/material/Link';
import { Link as ReactRouterLink } from 'react-router-dom';

const RouterLink = ({ children, to }) => {
  return (
    <Link component={ReactRouterLink} to={to} underline="none" color="inherit">
      {children}
    </Link>
  );
};

export default RouterLink;
