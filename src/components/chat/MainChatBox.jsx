import React, { useContext } from 'react';

import { Box, Paper, Typography } from '@mui/material';
import ChatInputBox from './../input/ChatInputBox';
import MessageList from './MessageList';
import ChatContext from './../../contexts/ChatContext';

const MainChatBox = ({ username }) => {
  const { messages, chatRoomId, onReadMessage, sendMessage } =
    useContext(ChatContext);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      onClick={() => {
        onReadMessage(chatRoomId);
      }}>
      <Paper
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 40,
          bgcolor: 'white',
          color: '',
          px: 2
        }}>
        <Typography variant="subtitle1">{'User name should display here'}</Typography>
      </Paper>
      <Box
        sx={{
          height: 2,
          display: 'flex',
          flexDirection: 'column-reverse',
          flexGrow: 1,
        }}>
        <MessageList messages={messages} />
      </Box>
      <Paper elevation={3}>
        <ChatInputBox onSendClick={sendMessage} />
      </Paper>
    </Box>
  );
};

export default MainChatBox;
