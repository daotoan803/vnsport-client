import React, { useContext, lazy, Suspense } from 'react';
import Typography from '@mui/material/Typography';
import ShopHeader from './components/header/ShopHeader';
import ModalContext from './contexts/ModalContext';
import SideBarContext from './contexts/SideBarContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MenuSideBar from './components/sidebar/MenuSideBar';
import CartSideBar from './components/sidebar/CartSideBar';

import { Routes, Route } from 'react-router-dom';

const LoginModal = lazy(() => import('./components/modal/LoginModal'));
const SignupModal = lazy(() => import('./components/modal/SignupModal'));
const ProductPage = lazy(() => import('./pages/shop/ProductPage'));
import ProductDetailPage from './pages/shop/ProductDetailPage';

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
      <Typography variant="h2">Hello world</Typography>
      <Routes>
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route
          path="/products"
          element={
            <Suspense fallback={fallback}>
              <ProductPage />
            </Suspense>
          }
        />

        <Route
          path=""
          element={<Typography variant="h1">404 NOT FOUND</Typography>}
        />
      </Routes>
    </>
  );
};

export default App;
