import React, { useState, useEffect, useContext } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import SearchInputBox from '../input/SearchInputBox';
import chatApi from './../../apis/chatApi';
import SocketContext from './../../contexts/SocketContext';

const UserChatList = () => {
  const [users, setUsers] = useState([]);

  const { chatSocket } = useContext(SocketContext);

  useEffect(() => {
    chatApi.fetchUserListByNewestChat().then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
    chatSocket.on('new-message', (data) => {
      // const { userId, newMessage } = data;
      console.log(data);
    });
  }, []);

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
        {users.length === 0 ? (
          <Typography variant="h5" align="center">
            Không có tin nhắn
          </Typography>
        ) : (
          new Array(30)
            .fill(null)
            .map((_, index) => (
              <Typography key={index}>{index} This is shit</Typography>
            ))
        )}
      </Box>
    </Box>
  );
};

export default UserChatList;
