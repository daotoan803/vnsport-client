import React, { useState } from 'react';

import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInputBox = ({ sendNewMessage }) => {
  const [message, setMessage] = useState('');

  return (
    <Box display="flex" sx={{ pt: 2, pb: 1, pl: 1 }}>
      <TextField
        sx={{ flexGrow: 1 }}
        label="Câu hỏi"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendNewMessage(message);
        }}
      />
      <IconButton size="large" onClick={() => sendNewMessage(message)}>
        <SendIcon fontSize="medium" color="primary" />
      </IconButton>
    </Box>
  );
};

export default MessageInputBox;
