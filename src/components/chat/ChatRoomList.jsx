import React, { useContext } from 'react';

import { Box, Paper, Typography, Stack } from '@mui/material';
import SearchInputBox from '../input/SearchInputBox';
import ChatRoomCard from './ChatRoomCard';
import ChatContext from './../../contexts/ChatContext';

const ChatRoomList = () => {
  const { chatRooms, chatRoomId, setRoom, onReadMessage } =
    useContext(ChatContext);

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
        {chatRooms.length === 0 && (
          <Typography variant="h5" align="center">
            Không có tin nhắn
          </Typography>
        )}
        {chatRooms.length > 0 &&
          chatRooms.map((message) => (
            <ChatRoomCard
              key={message.chatRoomId}
              user={message.user}
              isActive={chatRoomId === message.chatRoomId}
              isNew={message.chatRoom.haveNewMessage}
              onClick={() => {
                setRoom(message.chatRoomId);
                onReadMessage(message.chatRoomId);
              }}
              message={message}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default ChatRoomList;
