import React, { useContext } from 'react';

import { Box, Paper } from '@mui/material';
import ChatInputBox from './../input/ChatInputBox';
import MessageList from './MessageList';
import ChatContext from './../../contexts/ChatContext';

const MainChatBox = () => {
  const { messages, chatRoomId, onReadMessage, sendMessage } =
    useContext(ChatContext);

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      onClick={() => {
        onReadMessage(chatRoomId);
      }}>
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
