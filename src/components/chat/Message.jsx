import React from 'react';

import { Box, Typography } from '@mui/material';
import OpenableImage from './../image/OpenableImage';

const Message = ({ isSender, position, message, sender, type }) => {
  let messageStyleBaseOnPosition = {};
  if (position === 'top') {
    messageStyleBaseOnPosition = {
      mb: 0,
      ...(isSender
        ? { borderBottomRightRadius: '0.25rem' }
        : { borderBottomLeftRadius: '0.25rem' }),
    };
  } else if (position === 'middle') {
    messageStyleBaseOnPosition = {
      my: 0,
      ...(isSender
        ? {
            borderTopRightRadius: '0.25rem',
            borderBottomRightRadius: '0.25rem',
          }
        : {
            borderTopLeftRadius: '0.25rem',
            borderBottomLeftRadius: '0.25rem',
          }),
    };
  } else if (position === 'bottom') {
    messageStyleBaseOnPosition = {
      mt: 0,
      ...(isSender
        ? { borderTopRightRadius: '0.25rem' }
        : { borderTopLeftRadius: '0.25rem' }),
    };
  }

  return (
    <>
      <Box
        sx={{
          ...(isSender
            ? { alignSelf: 'flex-end' }
            : { alignSelf: 'flex-start' }),
          maxWidth: '60%',
        }}>
        {(position === 'top' || !position) && (
          <Typography align={isSender ? 'right' : 'left'} variant="body2">
            {isSender ? 'You' : sender}
          </Typography>
        )}
        <Box
          sx={{
            py: 1,
            borderRadius: '1rem',
            my: 1,
            fontWeight: 500,
            maxWidth: '100%',
            border: '0.5px solid #999',

            ...(isSender
              ? {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  border: '0.5px solid #fff',
                  textAlign: 'end',
                  pr: '0.75rem',
                  pl: '1rem',
                }
              : { pl: '0.75rem', pr: '1rem', alignSelf: 'flex-start' }),

            ...messageStyleBaseOnPosition,
          }}>
          {type === 'image' && (
            <Box sx={{ width: '100%' }}>
              <OpenableImage src={message} width="100%" />
            </Box>
          )}
          {type === 'message' && <Typography>{message}</Typography>}
        </Box>
      </Box>
    </>
  );
};

export default Message;
