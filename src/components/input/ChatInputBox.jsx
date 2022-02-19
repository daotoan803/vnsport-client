import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';

const ChatInputBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        py: 1,
        px: 2,
      }}
      gap={2}>
      <IconButton size="large" color="primary">
        <ImageIcon fontSize="medium" />
      </IconButton>
      <TextField sx={{ flexGrow: 1 }} label="Tin nhắn" />
      <IconButton size="large" color="primary">
        <SendIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default ChatInputBox;
