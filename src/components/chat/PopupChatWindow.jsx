import React, { useState, useContext, useEffect } from 'react';

import {
  Collapse,
  Box,
  Typography,
  Paper,
  IconButton,
  Badge,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthContext from './../../contexts/AuthContext';
import MessageIcon from '@mui/icons-material/Message';

const MessageList = React.lazy(() => import('./MessageList'));
import CenteredSpinner from './../suspend_fallback/CenteredSpinner';
import ToggleSignupModalButton from './../button/ToggleSignupModalButton';
import ToggleLoginModalButton from './../button/ToggleLoginModalButton';
import ChatInputBox from './../input/ChatInputBox';
import ChatContext from './../../contexts/ChatContext';

const PopupChatWindow = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [haveNewMessage, setHaveNewMessage] = useState(false);

  const authContext = useContext(AuthContext);

  const { messages, sendMessage, loadingMessage } = useContext(ChatContext);

  const togglePopupChatWindow = () => {
    setIsExpand(!isExpand);
  };

  useEffect(() => {
    setHaveNewMessage(true);
  }, [messages]);

  return (
    <>
      {!isExpand && (
        <IconButton
          onClick={() => {
            togglePopupChatWindow();
            setHaveNewMessage(false);
          }}
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
          <Badge
            color="error"
            variant="dot"
            invisible={isExpand ? true : !haveNewMessage}>
            <MessageIcon fontSize="large" />
          </Badge>
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
            <Box
              sx={{
                height: '50vh',
                px: 1,
                display: 'flex',
                flexDirection: 'column-reverse',
              }}>
              <React.Suspense fallback={<CenteredSpinner />}>
                {loadingMessage && (
                  <Typography align="center">Loading ...</Typography>
                )}
                <MessageList messages={messages} />
              </React.Suspense>
            </Box>
            <Paper elevation={2}>
              <ChatInputBox onSendClick={sendMessage} />
            </Paper>
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
