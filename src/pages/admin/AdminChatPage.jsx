import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper } from '@mui/material';
import UserChatList from '../../components/chat/UserChatList';
import BackButton from '../../components/button/BackButton';
import MainChatBox from '../../components/chat/MainChatBox';
import UserInformationBox from './../../components/user/UserInformationBox';
import QuickProductSearchBox from '../../components/products/QuickProductSearchBox';
import ToggleSideMenuButton from './../../components/button/ToggleSideMenuButton';
import AuthContext from './../../contexts/AuthContext';
import authApi from './../../apis/authApi';

const AdminChatPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.role !== authApi.availableRole.admin) {
      navigate('/');
      return;
    }
  }, [authContext.role, authContext.isLoggedIn]);

  return (
    <>
      {authContext.role === authApi.availableRole.admin && (
        <Grid
          container
          component={Box}
          sx={{ height: '100vh', overflow: 'hidden' }}
          spacing={1}>
          <Grid item component={Paper} xs={3}>
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ pl: 2, py: 1 }}>
                <ToggleSideMenuButton />
                <BackButton />
              </Box>
              <UserChatList />
            </Box>
          </Grid>
          <Grid item component={Paper} elevation={3} xs={6}>
            <MainChatBox />
          </Grid>
          <Grid item component={Box} xs={3} justifyContent="flex-start">
            <Paper
              elevation={1}
              sx={{
                height: '40%',
                overflow: 'auto',
              }}>
              <UserInformationBox />
            </Paper>
            <Paper
              sx={{
                height: '60%',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <QuickProductSearchBox />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AdminChatPage;
