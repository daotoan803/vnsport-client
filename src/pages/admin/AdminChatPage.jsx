import React from 'react';

import { Box, Grid } from '@mui/material';
import UserChatList from '../../components/chat/UserChatList';
import BackButton from '../../components/button/BackButton';
import MainChatBox from '../../components/chat/MainChatBox';
import UserInformationBox from './../../components/user/UserInformationBox';
import QuickProductSearchBox from '../../components/products/QuickProductSearchBox';
import ToggleSideMenuButton from './../../components/button/ToggleSideMenuButton';

const AdminChatPage = () => {
  return (
    <Grid
      container
      component={Box}
      sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item component={Box} xs={3} sx={{ border: '1px solid black' }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ pl: 2, py: 1 }}>
            <ToggleSideMenuButton />
            <BackButton />
          </Box>
          <UserChatList />
        </Box>
      </Grid>
      <Grid item component={Box} xs={6} sx={{ border: '1px solid black' }}>
        <MainChatBox />
      </Grid>
      <Grid item component={Box} xs={3} justifyContent="flex-start">
        <Box
          sx={{
            height: '40%',
            border: '1px solid black',
            overflow: 'auto',
          }}>
          <UserInformationBox />
        </Box>
        <Box
          sx={{
            height: '60%',
            border: '1px solid black',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <QuickProductSearchBox />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminChatPage;
