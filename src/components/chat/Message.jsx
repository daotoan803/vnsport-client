import React from 'react';

import { Box, Typography } from '@mui/material';

const Message = ({ isSender, position, message }) => {
  let messageStyleBaseOnPosition = {};
  if (position === 'top') {
    messageStyleBaseOnPosition = {
      mb: 0,
      ...(isSender
        ? { borderBottomRightRadius: '0.15rem' }
        : { borderBottomLeftRadius: '0.15rem' }),
    };
  } else if (position === 'middle') {
    messageStyleBaseOnPosition = {
      my: 0,
      ...(isSender
        ? {
            borderTopRightRadius: '0.15rem',
            borderBottomRightRadius: '0.15rem',
          }
        : {
            borderTopLeftRadius: '0.15rem',
            borderBottomLeftRadius: '0.15rem',
          }),
    };
  } else if (position === 'bottom') {
    messageStyleBaseOnPosition = {
      mt: 0,
      ...(isSender
        ? { borderTopRightRadius: '0.15rem' }
        : { borderTopLeftRadius: '0.15rem' }),
    };
  }

  return (
    <Box
      sx={{
        py: 2,
        borderRadius: '1rem',
        my: 1,
        fontWeight: 500,
        maxWidth: '60%',
        border: '0.5px solid #999',

        ...(isSender
          ? {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              border: '0.5px solid #fff',
              alignSelf: 'flex-end',
              textAlign: 'end',
              pr: '0.75rem',
              pl: '1rem',
            }
          : { pl: '0.75rem', pr: '1rem', alignSelf: 'flex-start' }),

        ...messageStyleBaseOnPosition,
      }}>
      <Typography>{message}</Typography>
    </Box>
  );
};

export default Message;
