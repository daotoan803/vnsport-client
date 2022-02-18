import React, { useContext, lazy, Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import ShopHeader from './components/header/ShopHeader';
import ModalContext from './contexts/ModalContext';
import SideBarContext from './contexts/SideBarContext';
import MenuSideBar from './components/sidebar/menu_side_bar/MenuSideBar';
import CartSideBar from './components/sidebar/cart_side_bar/CartSideBar';
import PopupPopupChatWindow from './components/chat/PopupChatWindow';

const LoginModal = lazy(() => import('./components/modal/LoginModal'));
const SignupModal = lazy(() => import('./components/modal/SignupModal'));
const ProductDetailPage = lazy(() => import('./pages/shop/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/shop/ProductsPage'));
import BackdropSpinner from './components/suspend_fallback/BackdropSpinner';

const App = () => {
  const modalContext = useContext(ModalContext);
  const sideBarContext = useContext(SideBarContext);

  return (
    <>
      {modalContext.signupModalIsOpen && (
        <Suspense fallback={<BackdropSpinner />}>
          <SignupModal />
        </Suspense>
      )}
      {modalContext.loginModalIsOpen && (
        <Suspense fallback={<BackdropSpinner />}>
          <LoginModal />
        </Suspense>
      )}
      {sideBarContext.sideBarIsOpen && <MenuSideBar />}
      {sideBarContext.cartIsOpen && <CartSideBar />}
      <PopupPopupChatWindow />
      <ShopHeader />

      <Container sx={{ mt: 5, px: 0 }}>
        <Card sx={{ py: 3, px: 0.5, width: '100%' }}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />

            <Route
              path="/products/:categoryGroupCode"
              exact
              element={
                <Suspense fallback={<BackdropSpinner />}>
                  <ProductsPage />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={<Typography variant="h1">404 NOT FOUND</Typography>}
            />
          </Routes>
        </Card>
      </Container>
    </>
  );
};

export default App;
