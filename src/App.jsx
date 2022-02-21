import React, { useContext, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import MenuSideBar from './components/sidebar/menu_side_bar/MenuSideBar';
import CartSideBar from './components/sidebar/cart_side_bar/CartSideBar';
import BackdropSpinner from './components/suspend_fallback/BackdropSpinner';

import SideBarContext from './contexts/SideBarContext';

const AdminChatPage = lazy(() => import('./pages/admin/AdminChatPage'));
const ShopHomePage = lazy(() => import('./pages/shop/ShopIndexPage'));
const AdminIndexPage = lazy(() => import('./pages/admin/AdminIndexPage'));
import ImageModal from './components/modal/ImageModal';

const App = () => {
  const sideBarContext = useContext(SideBarContext);
  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ minHeight: '100%' }}>
        {sideBarContext.sideBarIsOpen && <MenuSideBar />}
        {sideBarContext.cartIsOpen && <CartSideBar />}
        <ImageModal />
        <Routes>
          <Route
            path="/admin/chat"
            element={
              <Suspense fallback={<BackdropSpinner />}>
                <AdminChatPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<BackdropSpinner />}>
                <AdminIndexPage />
              </Suspense>
            }></Route>
          <Route
            path="/*"
            element={
              <Suspense fallback={<BackdropSpinner />}>
                <ShopHomePage />
              </Suspense>
            }
          />
        </Routes>
      </Box>
    </>
  );
};

export default App;
