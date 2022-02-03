import React, { useContext, useState } from 'react';
import ModalContext from '../../contexts/ModalContext';
import {
  Modal,
  Typography,
  Container,
  Divider,
  TextField,
  Stack,
  Box,
  Button,
} from '@mui/material';

import authApi from '../../apis/auth';
import AuthContext from './../../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 0,
  py: 2,
};

const LoginModal = () => {
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    console.log('event');
    const res = await authApi.logIn(email, password);
    if (res.status === 200) {
      authContext.toggleLoggedIn();
      modalContext.toggleLoginModal();
      if (res.role !== '') {
        authContext.setRole(res.role);
      }
      return;
    }
    if (res.status === 400) {
      setLoginError(true);
    }
  };

  return (
    <div>
      <Modal
        open={modalContext.loginModalIsOpen}
        onClose={modalContext.toggleLoginModal}>
        <Container sx={style}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Đăng nhập
          </Typography>
          <Divider />
          <Container>
            <form>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  variant="standard"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Mật khẩu"
                  variant="standard"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loginError && (
                  <Typography variant="subtitle1" color="danger">
                    Sai email hoặc mật khẩu
                  </Typography>
                )}
                <Box sx={{ textAlign: 'center', pt: 2 }}>
                  <Button variant="contained" onClick={login}>
                    Đăng nhập
                  </Button>
                </Box>
              </Stack>
            </form>
          </Container>
        </Container>
      </Modal>
    </div>
  );
};

export default LoginModal;
