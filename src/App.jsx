import React, { useContext, lazy, Suspense } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import ShopHeader from './components/header/ShopHeader';
import ModalContext from './contexts/ModalContext';
import SideBarContext from './contexts/SideBarContext';
import MenuSideBar from './components/sidebar/menu_side_bar/MenuSideBar';
import CartSideBar from './components/sidebar/cart_side_bar/CartSideBar';

const LoginModal = lazy(() => import('./components/modal/LoginModal'));
const SignupModal = lazy(() => import('./components/modal/SignupModal'));
const ProductDetailPage = lazy(() => import('./pages/shop/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/shop/ProductsPage'));

const App = () => {
  const modalContext = useContext(ModalContext);
  const sideBarContext = useContext(SideBarContext);

  const fallback = (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <>
      {modalContext.signupModalIsOpen && (
        <Suspense fallback={fallback}>
          <SignupModal />
        </Suspense>
      )}
      {modalContext.loginModalIsOpen && (
        <Suspense fallback={fallback}>
          <LoginModal />
        </Suspense>
      )}
      {sideBarContext.sideBarIsOpen && <MenuSideBar />}
      {sideBarContext.cartIsOpen && <CartSideBar />}
      <ShopHeader />

      <Container sx={{ mt: 5, px: 0 }}>
        <Card sx={{ py: 3, px: 0.5, width: '100%' }}>
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />

            <Route
              path="/products/:categoryGroupCode"
              exact
              element={
                <Suspense fallback={fallback}>
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
