import React, { useContext, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';

import MenuSideBar from './components/sidebar/menu_side_bar/MenuSideBar';
import CartSideBar from './components/sidebar/cart_side_bar/CartSideBar';
import BackdropSpinner from './components/suspend_fallback/BackdropSpinner';

import SideBarContext from './contexts/SideBarContext';
import ImageModal from './components/modal/ImageModal';

const AdminChatPage = lazy(() => import('./pages/admin/AdminChatPage'));
const ShopHomePage = lazy(() => import('./pages/shop/ShopIndexPage'));
const AdminIndexPage = lazy(() => import('./pages/admin/AdminIndexPage'));
const AdminProductPage = lazy(() => import('./pages/admin/AdminProductPage'));
const AddProductPanel = lazy(() =>
  import('./pages/admin/product/AddProductPanel')
);
const ManageProductPanel = lazy(() =>
  import('./pages/admin/product/ManageProductPanel')
);

const renderSuspense = (lazyComponent) => {
  return <Suspense fallback={<BackdropSpinner />}>{lazyComponent}</Suspense>;
};

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
            path="admin/chat"
            element={renderSuspense(<AdminChatPage />)}
          />
          <Route path="admin" element={renderSuspense(<AdminIndexPage />)}>
            <Route
              path="products"
              element={renderSuspense(<AdminProductPage />)}>
              <Route
                path=""
                element={renderSuspense(<ManageProductPanel />)}></Route>
              <Route path="new" element={renderSuspense(<AddProductPanel />)} />
            </Route>
          </Route>
          <Route path="/*" element={renderSuspense(<ShopHomePage />)} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
