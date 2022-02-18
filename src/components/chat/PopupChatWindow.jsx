import React, { useState, useContext, useEffect } from 'react';

import { Collapse, Box, Typography, Paper, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageInputBox from './MessageInputBox';
import SocketContext from './../../contexts/SocketContext';
import AuthContext from './../../contexts/AuthContext';
import MessageIcon from '@mui/icons-material/Message';

const MessageList = React.lazy(() => import('./MessageList'));
import CenteredSpinner from './../suspend_fallback/CenteredSpinner';
import ToggleSignupModalButton from './../button/ToggleSignupModalButton';
import ToggleLoginModalButton from './../button/ToggleLoginModalButton';
import chatApi from './../../apis/chatApi';

const PopupChatWindow = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState([]);
  const MESSAGE_LIMIT = 15;

  const { chatSocket } = useContext(SocketContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!isExpand || !authContext.isLoggedIn || !chatSocket) return;

    if (messages.length !== 0) return;

    setLoadingMessage(true);
    chatApi.fetchChat(page, MESSAGE_LIMIT).then((res) => {
      if (res.status === 200) {
        setMessages(res.data);
        setLoadingMessage(false);
      }
    });
    chatSocket.emit('join-support-chat');
  }, [isExpand]);

  const sendNewMessage = (newMessage) => {
    if (newMessage.trim() === '') return;
    if (!authContext.isLoggedIn && !chatSocket) return;
    chatSocket.emit('sendMessage', {});
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
              <React.Suspense fallback={<CenteredSpinner />}>
                {loadingMessage && <Typography align='center'>Loading ...</Typography>}
                <MessageList />
              </React.Suspense>
            </Box>
            <MessageInputBox sendNewMessage={sendNewMessage} />
          </>
        )}
        {!authContext.isLoggedIn && (
          <Box
            sx={{
              px: 1,
              pb: 2,
              height: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Typography>
              Vui lòng đăng nhập hoặc đăng ký tài khoản để được hỗ trợ từ nhân
              viên
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              <ToggleSignupModalButton
                onClick={() => togglePopupChatWindow()}
              />
              <ToggleLoginModalButton onClick={() => togglePopupChatWindow()} />
            </Box>
          </Box>
        )}
      </Collapse>
    </>
  );
};

export default PopupChatWindow;
