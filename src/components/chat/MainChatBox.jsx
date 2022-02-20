import React, { useState, useEffect } from 'react';

import { Box, Paper } from '@mui/material';
import ChatInputBox from './../input/ChatInputBox';
import chatApi from './../../apis/chatApi';
import MessageList from './MessageList';

const MainChatBox = ({ selectedRoomId, chatSocket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!selectedRoomId) return;

    chatApi.fetchChatByRoomId({ roomId: selectedRoomId }).then((res) => {
      if (res.data) {
        setMessages(res.data.messages.messages);
      }
    });
  }, [selectedRoomId]);

  useEffect(() => {
    chatSocket.on('new-message', (data) => {
      setMessages((prev) => [data, ...prev]);
    });
  }, []);

  const sendNewMessage = (newMessage) => {
    if (newMessage.trim() === '') return;

    chatSocket.emit('send-message', {message: newMessage, chatRoomId: selectedRoomId}, (sentMessage) => {
      sentMessage.isSender = true;
      setMessages((prev) => [sentMessage, ...prev]);
    });
  };

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
        <MessageList messages={messages} />
      </Box>
      <Paper elevation={3}>
        <ChatInputBox onSendClick={sendNewMessage} />
      </Paper>
    </Box>
  );
};

export default MainChatBox;
