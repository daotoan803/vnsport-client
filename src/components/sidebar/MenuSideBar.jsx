import React, { useContext, useState, useEffect } from 'react';
import SideBarContext from '../../contexts/SideBarContext';

import { Drawer, Divider, Stack, Slide, Box } from '@mui/material';

import Logo from '../logo/Logo';
import Button from '@mui/material/Button';
import AuthContext from '../../contexts/AuthContext';
import ToggleSignupModalWrapper from '../modal/ToggleSignupModalWrapper';
import ToggleLoginModalWrapper from '../modal/ToggleLoginModal';
import LogoutButton from '../button/LogoutButton';
import ShopNavigationList from './ShopNavigationList';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import auth from '../../apis/auth';
import SideBarItem from './SideBarItem';
import AdminNavigationList from './AdminNavigationList';
import StorefrontIcon from '@mui/icons-material/Storefront';

const MenuSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  const authContext = useContext(AuthContext);

  const [showingAdminMenu, setShowingAdminMenu] = useState(false);
  const [hideShopNavigation, setHideShopNavigation] = useState(false);

  useEffect(() => {
    if (!authContext.isLoggedIn) {
      setShowingAdminMenu(false);
      setHideShopNavigation(false);
    }
  }, [authContext.isLoggedIn]);

  const toggleSideBar = () => sideBarContext.toggleSideBar();
  const toggleHideShopNavigation = () =>
    setHideShopNavigation(!hideShopNavigation);

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
            {authContext.role === auth.availableRole.admin && (
              <SideBarItem
                onClick={() => setShowingAdminMenu(!showingAdminMenu)}
                startIcon={<AdminPanelSettingsIcon />}
                endIcon={<ChevronRightIcon />}
                text="Quản lý"
              />
            )}
            <ShopNavigationList />
          </Box>
        </Slide>
      )}
      {hideShopNavigation && (
        <Slide
          direction="left"
          in={showingAdminMenu}
          onExited={toggleHideShopNavigation}>
          <Box>
            {authContext.role === auth.availableRole.admin && (
              <SideBarItem
                onClick={() => setShowingAdminMenu(!showingAdminMenu)}
                startIcon={<ChevronLeftIcon />}
                endIcon={<StorefrontIcon />}
                text="Cửa hàng"
              />
            )}
            <AdminNavigationList />
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
