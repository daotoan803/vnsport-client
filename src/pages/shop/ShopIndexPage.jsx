import React, { useContext, Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import ModalContext from '../../contexts/ModalContext';
import BackdropSpinner from '../../components/suspend_fallback/BackdropSpinner';
import PopupChatWindow from '../../components/chat/PopupChatWindow';
import { Container, Paper } from '@mui/material';

const SignupModal = lazy(() => import('../../components/modal/SignupModal'));
const LoginModal = lazy(() => import('../../components/modal/LoginModal'));
import ShopHeader from './../../components/header/ShopHeader';

const ShopIndexPage = () => {
  const modalContext = useContext(ModalContext);

  return (
    <>
      <ShopHeader />
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
      <PopupChatWindow />
      <Container component={Paper} elevation={2} sx={{ mt: 5, py: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default ShopIndexPage;
