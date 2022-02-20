import React, { useState, useEffect } from 'react';

import { Box, Paper, Typography, Stack } from '@mui/material';
import SearchInputBox from '../input/SearchInputBox';
import chatApi from '../../apis/chatApi';
import UserChatHistoryCard from './UserChatHistoryCard';

const UserChatHistory = ({ selectedRoomId, selectRoom, chatSocket }) => {
  const [messageHistories, setMessageHistories] = useState([]);

  console.log(messageHistories);

  useEffect(() => {
    chatApi.fetchUserListByNewestChat().then((res) => {
      setMessageHistories(res.data);
    });

    console.log('setup chat socket in user chat history');
    chatSocket.on('new-broadcast-message', (newMessage) => {
      console.log('inside user chat history');
      console.log(newMessage);

      const newMessagesHistory = messageHistories.filter(
        (message) => message.chatRoomId !== newMessage.chatRoomId
      );

      newMessagesHistory.push(newMessage);

      setMessageHistories(newMessagesHistory);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        flexGrow: 1,
        bgcolor: '#eeeeee',
        cursor: 'pointer',
      }}>
      <Paper component={Box} elevation={1} sx={{ py: 1 }}>
        <SearchInputBox label="Tên người dùng" />
      </Paper>
      <Stack
        sx={{
          pt: 0.1,
          height: 2,
          flexGrow: 1,
          overflow: 'auto',
        }}>
        {messageHistories.length === 0 && (
          <Typography variant="h5" align="center">
            Không có tin nhắn
          </Typography>
        )}
        {messageHistories.length > 0 &&
          messageHistories.map((message) => (
            <UserChatHistoryCard
              key={message.chatRoomId}
              user={message.user}
              isActive={selectedRoomId === message.chatRoomId}
              onClick={() => selectRoom(message.chatRoomId)}
              message={message}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default UserChatHistory;
