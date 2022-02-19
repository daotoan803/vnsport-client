import React, { useContext, useState, useEffect } from 'react';
import ModalContext from '../../contexts/ModalContext';
import authApi from '../../apis/authApi';
import AuthContext from './../../contexts/AuthContext';
import DatePicker from '@mui/lab/DatePicker';

import {
  Modal,
  Typography,
  Container,
  Divider,
  TextField,
  Stack,
  Box,
  MenuItem,
  FormControl,
  Grid,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
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

const availableGender = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' },
];

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignupModal = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(availableGender[2].value);
  const [dob, setDob] = useState(new Date('1/1/2000'));

  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [signupErr, setSignupErr] = useState('');

  //validate name
  useEffect(() => {
    if (name === '' || (name.trim().length >= 1 && name.length <= 254)) {
      if (nameErr) setNameErr(false);
      return;
    }
    if (!nameErr) setNameErr(true);
  }, [name]);

  //validate email
  useEffect(() => {
    if (email === '' || email.match(emailRegex)) {
      if (emailErr) setEmailErr(false);
      return;
    }
    if (!emailErr) return setEmailErr(true);
  }, [email]);

  //Validate password
  useEffect(() => {
    if (password === '' || (password.length >= 4 && password.length <= 200)) {
      if (passwordErr) setPasswordErr(false);
      return;
    }
    if (!passwordErr) setPasswordErr(true);
  }, [password]);

  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const checkErr = () => nameErr || emailErr || passwordErr;

  const signup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (checkErr()) return setSignupErr('Vui lòng sửa đúng định dạng');

    setLoading(true);
    const res = await authApi.signup({ name, email, password, gender, dob });
    setLoading(false);
    if (res.status === 200) {
      authContext.toggleLoggedIn();
      modalContext.toggleSignupModal();
      alertContext.showSuccessAlert('Đăng ký tài khoản thành công!');
      return;
    }
    if (res.status === 400) {
      setSignupErr('Đăng ký không thành công');
      return;
    }

    if (res.status === 409) {
      setSignupErr('Email đã tồn tại');
    }
  };

  return (
    <div>
      {modalContext.signupModalIsOpen && (
        <>
          <Modal
            open={modalContext.signupModalIsOpen}
            onClose={modalContext.toggleSignupModal}>
            <Container sx={style}>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Đăng Ký
              </Typography>
              <Divider />
              <FormControl fullWidth sx={{ px: 5 }}>
                <Stack spacing={1}>
                  <TextField
                    error={nameErr}
                    helperText="Họ tên từ 1-254 ký tự"
                    required
                    label="Họ tên"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    required
                    error={emailErr}
                    helperText="Nhập email hợp lệ"
                    label="Email"
                    variant="standard"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                      <TextField
                        required
                        fullWidth
                        variant="standard"
                        value={gender}
                        label="Giới tính"
                        select
                        onChange={(e) => setGender(e.target.value)}>
                        {availableGender.map((gen) => (
                          <MenuItem key={gen.value} value={gen.value}>
                            {gen.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        disableFuture
                        label="Ngày sinh"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={dob}
                        onChange={(newValue) => {
                          setDob(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            variant="standard"
                            fullWidth
                            {...params}
                            helperText={params?.inputProps?.placeholder}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    sx={{ mt: 0 }}
                    required
                    error={passwordErr}
                    helperText="Mật khẩu cần từ 4-200 ký tự"
                    label="Mật khẩu"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Box sx={{ textAlign: 'center', pt: 2 }}>
                    {signupErr && (
                      <Typography variant="body1" color="red">
                        {signupErr}
                      </Typography>
                    )}

                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      onClick={signup}>
                      Đăng ký
                    </LoadingButton>
                  </Box>
                </Stack>
              </FormControl>
            </Container>
          </Modal>
        </>
      )}
    </div>
  );
};

export default SignupModal;
