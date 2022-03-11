import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import SideBarContext from '../../../contexts/SideBarContext';

import { Drawer, Divider, Stack, Slide, Box } from '@mui/material';

import Logo from '../../logo/Logo';
import Button from '@mui/material/Button';
import AuthContext from '../../../contexts/AuthContext';
import ToggleSignupModalWrapper from '../../modal/ToggleSignupModalWrapper';
import ToggleLoginModalWrapper from '../../modal/ToggleLoginModal';
import LogoutButton from '../../button/LogoutButton';
import ShopNavigationList from './shop/ShopNavigationList';
import CircularProgress from '@mui/material/CircularProgress';
import { availableRole } from '../../../enums/user.enum';

const AdminNavigationList = lazy(() => import('./admin/AdminNavigationList'));

const MenuSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  const authContext = useContext(AuthContext);

  const [showingAdminMenu, setShowingAdminMenu] = useState(false);
  const [hideShopNavigation, setHideShopNavigation] = useState(false);

  useEffect(() => {
    if (!authContext.isLoggedIn || authContext.role !== availableRole.admin) {
      setShowingAdminMenu(false);
      setHideShopNavigation(false);
    }
  }, [authContext.isLoggedIn, authContext.role]);

  const toggleSideBar = () => {
    sideBarContext.toggleSideBar();
  };
  const toggleHideShopNavigation = () =>
    setHideShopNavigation(!hideShopNavigation);
  const toggleAdminMenu = () => setShowingAdminMenu(!showingAdminMenu);

  return (
    <Drawer
      anchor="left"
      open={sideBarContext.sideBarIsOpen}
      onClose={toggleSideBar}>
      <Logo variant="h5" sx={{ mx: 9, my: 1 }} />
      <Divider />

      {!hideShopNavigation && (
        <Slide
          direction="right"
          in={!showingAdminMenu}
          onExited={toggleHideShopNavigation}>
          <Box>
            <ShopNavigationList toggleAdminMenu={toggleAdminMenu} />
          </Box>
        </Slide>
      )}
      {hideShopNavigation && (
        <Slide
          direction="left"
          in={showingAdminMenu}
          onExited={toggleHideShopNavigation}>
          <Box>
            <Suspense fallback={<CircularProgress />}>
              <AdminNavigationList toggleAdminMenu={toggleAdminMenu} />
            </Suspense>
          </Box>
        </Slide>
      )}
      <Divider />
      <Stack
        direction="row"
        sx={{ justifyContent: 'center', my: 1 }}
        spacing={2}>
        {!authContext.isLoggedIn && (
          <>
            <ToggleSignupModalWrapper onClick={toggleSideBar}>
              <Button variant="contained">Đăng Ký</Button>
            </ToggleSignupModalWrapper>

            <ToggleLoginModalWrapper onClick={toggleSideBar}>
              <Button variant="outlined">Đăng nhập</Button>
            </ToggleLoginModalWrapper>
          </>
        )}
        {authContext.isLoggedIn && <LogoutButton />}
      </Stack>
    </Drawer>
  );
};

export default MenuSideBar;
