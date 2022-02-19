import React from 'react';

import { Box, Typography, Paper } from '@mui/material';
import ChatInputBox from './../input/ChatInputBox';

const MainChatBox = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 2,
          display: 'flex',
          flexDirection: 'column-reverse',
          flexGrow: 1,
          overflow: 'auto',
        }}>
        {new Array(30).fill(null).map((_, index) => (
          <Typography key={index}>{index} This is shit</Typography>
        ))}
      </Box>
      <Paper elevation={3}>
        <ChatInputBox />
      </Paper>
    </Box>
  );
};

export default MainChatBox;
