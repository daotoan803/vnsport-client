import React, { useContext } from 'react';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import SideBarContext from '../../contexts/SideBarContext';

const SideBarLink = ({ children, to, state = {}, onClick = () => {} }) => {
  const sideBarContext = useContext(SideBarContext);

  const navigate = useNavigate();

  return (
    <Link
      onClick={(e) => {
        e.preventDefault();
        navigate(to, { state });
        sideBarContext.toggleSideBar();
        onClick();
      }}
      underline="none"
      color="inherit">
      {children}
    </Link>
  );
};

export default SideBarLink;
