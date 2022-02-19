import React from 'react';

import { Typography, Box } from '@mui/material';

import Message from './Message';

const MessageList = ({ messages }) => {
  console.log(messages);

  return (
    <Box
      elevation={1}
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        px: '0.75rem',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
      }}>
      {messages.map((message, i) => {
        if (message.type === 'notification') {
          return (
            <Typography align="center" key={message.id}>
              {message.message}
            </Typography>
          );
        }
        const prevMessage = messages[i - 1];
        const nextMessage = messages[i + 1];

        if (message.userId === nextMessage?.userId) {
          if (message.userId === prevMessage?.userId) {
            message.position = 'middle';
          } else if (message.userId !== prevMessage?.userId) {
            message.position = 'bottom';
          }
        } else if (message.userId === prevMessage?.userId) {
          message.position = 'top';
        }
        return (
          <Message
            key={message.id}
            sender={message.username}
            isSender={message.isSender}
            position={message.position}
            message={message.message}
          />
        );
      })}
    </Box>
  );
};

export default MessageList;
