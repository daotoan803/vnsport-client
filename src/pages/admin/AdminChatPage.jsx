import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Paper } from '@mui/material';
import ChatRoomList from '../../components/chat/ChatRoomList';
import BackButton from '../../components/button/BackButton';
import MainChatBox from '../../components/chat/MainChatBox';
import UserInformationBox from './../../components/user/UserInformationBox';
import ToggleSideMenuButton from './../../components/button/ToggleSideMenuButton';
import AuthContext from './../../contexts/AuthContext';
import authApi from './../../apis/auth.api';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ChatContext from './../../contexts/ChatContext';
import userApi from './../../apis/userApi';

const AdminChatPage = () => {
  const authContext = useContext(AuthContext);
  const { chatRoomId } = useContext(ChatContext);
  const navigate = useNavigate();
  const [opponentUser, setOpponentUser] = useState(null);

  useEffect(() => {
    if (!chatRoomId) return;

    userApi.findUserInfo({ chatRoomId }).then((res) => {
      setOpponentUser(res.data);
    });
  }, [chatRoomId]);

  const theme = useTheme();
  const isLessThanLg = useMediaQuery(theme.breakpoints.down('lg'));

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
          <Grid item component={Paper} xs={2} lg={3}>
            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ pl: 2, py: 1 }}>
                <ToggleSideMenuButton />
                <BackButton
                  sx={{ ...(isLessThanLg ? { display: 'none' } : {}) }}
                />
              </Box>
              <ChatRoomList />
            </Box>
          </Grid>
          <Grid item component={Paper} elevation={3} xs={10} lg={6}>
            <MainChatBox user={opponentUser} />
          </Grid>
          {!isLessThanLg && (
            <Grid
              item
              component={Box}
              xs={0}
              lg={12 - 3 - 6}
              sx={{ ...(isLessThanLg ? { display: 'none' } : {}) }}
              justifyContent="flex-start">
              <Paper
                elevation={1}
                sx={{
                  height: '100%',
                  overflow: 'auto',
                }}>
                <UserInformationBox user={opponentUser} />
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default AdminChatPage;
