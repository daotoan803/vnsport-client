import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import SearchInputBox from '../input/SearchInputBox';

const UserChatList = () => {
  return (
    <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
      <Paper component={Box} elevation={1} sx={{ py: 1 }}>
        <SearchInputBox label="Tên người dùng" />
      </Paper>
      <Box
        sx={{
          height: 2,
          flexGrow: 1,
          overflow: 'auto',
        }}>
        {new Array(30).fill(null).map((_, index) => (
          <Typography key={index}>{index} This is shit</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default UserChatList;
