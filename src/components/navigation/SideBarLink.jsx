import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import { Link as ReactRouterLink } from 'react-router-dom';
import SideBarContext from '../../contexts/SideBarContext';

const SideBarLink = ({ children, to, onClick = () => {} }) => {
  const sideBarContext = useContext(SideBarContext);

  return (
    <Link component={ReactRouterLink} to={to} underline="none" color="inherit">
      <div
        onClick={() => {
          sideBarContext.toggleSideBar();
          onClick();
        }}>
        {children}
      </div>
    </Link>
  );
};

export default SideBarLink;
