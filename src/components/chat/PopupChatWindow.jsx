import React, { useState, useContext, useEffect } from 'react';

import { Collapse, Box, Typography, Paper, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageList from './MessageList';
import MessageInputBox from './MessageInputBox';
import SocketContext from './../../contexts/SocketContext';
import AuthContext from './../../contexts/AuthContext';
import MessageIcon from '@mui/icons-material/Message';

const PopupChatWindow = () => {
  const [isExpand, setIsExpand] = useState(false);

  const socket = useContext(SocketContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!isExpand) return;

    if (authContext.token) {
      socket.emit('join-chat', { token: authContext.token });
    }
  }, [isExpand]);

  const sendNewMessage = (newMessage) => {
    if (newMessage.trim() === '') return;

    socket.emit('sendMessage', {});
  };

  const togglePopupChatWindow = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      {!isExpand && (
        <IconButton
          onClick={togglePopupChatWindow}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
          size="large">
          <MessageIcon fontSize="large" />
        </IconButton>
      )}
      <Collapse
        component={Paper}
        elevation={2}
        sx={{
          zIndex: 'tooltip',
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          left: { xs: 0, sm: '40vw', md: '50vw', lg: '70vw' },
          width: {
            xs: '100vw',
            sm: '60vw',
            md: '45vw',
            lg: '25vw',
          },
        }}
        in={isExpand}
        unmountOnExit>
        <Box
          onClick={togglePopupChatWindow}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            px: 2,
            py: 1,
            borderRadius: '0.5rem',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="h6">Yêu cầu tư vấn</Typography>
          {!isExpand ? (
            <ExpandLessIcon fontSize="large" />
          ) : (
            <ExpandMoreIcon fontSize="large" />
          )}
        </Box>
        {authContext.isLoggedIn && (
          <>
            <Box sx={{ flexGrow: 1, height: '45vh', overflow: 'auto', px: 1 }}>
              <MessageList />
            </Box>
            <MessageInputBox sendNewMessage={sendNewMessage} />
          </>
        )}
      </Collapse>
    </>
  );
};

export default PopupChatWindow;
