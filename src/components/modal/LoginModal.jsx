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
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';

import authApi from '../../apis/auth.api';
import AuthContext from './../../contexts/AuthContext';
import AlertContext from './../../contexts/AlertContext';

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
  const alertContext = useContext(AlertContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const res = await authApi.signin({ email, password });
    setLoading(false);

    if (res.status === 200) {
      authContext.onLoginSuccess(res.data);
      modalContext.toggleLoginModal();
      alertContext.showSuccessAlert('Đăng nhập thành công');
      return;
    }
    if (res.status !== 400) {
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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      login(e);
                    }
                  }}
                />
                <TextField
                  label="Mật khẩu"
                  variant="standard"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      login(e);
                    }
                  }}
                />
                <Box sx={{ textAlign: 'center', pt: 2 }}>
                  {loginError && (
                    <Typography variant="subtitle1" color="red">
                      Sai email hoặc mật khẩu
                    </Typography>
                  )}
                  <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    onClick={login}>
                    Đăng nhập
                  </LoadingButton>
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
