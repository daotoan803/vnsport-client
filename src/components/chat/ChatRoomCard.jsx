import React from 'react';

import { Card, Grid, Avatar, Typography, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  const splitName = name.split(' ');
  let children = '';
  for (let i = 0; i < Math.min(splitName.length, 2); i++) {
    children += splitName[i][0];
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children,
  };
}

const ChatRoomCard = ({ user, message, isActive, onClick, isNew }) => {
  const theme = useTheme();
  const isLessThanLg = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Grid
      onClick={onClick}
      container
      component={Card}
      sx={{
        ...(isActive
          ? { bgcolor: '#aaa' }
          : {
              ':hover': { bgcolor: '#e7e7e7' },
            }),
      }}>
      <Grid item xs={12} lg={2.5} container justifyContent="center" alignItems="center">
        <Badge color="error" variant="dot" invisible={isActive ? true : !isNew}>
          {user.avatarUrl && (
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt={user.name}
              src={user.avatarUrl}
            />
          )}
          {!user.avatarUrl && (
            <Avatar
              sx={{ width: 56, height: 56 }}
              {...stringAvatar(user.name)}
            />
          )}
        </Badge>
      </Grid>
      <Grid
        item
        xs={0}
        lg={12 - 2.5}
        py={1}
        sx={{ height: '80px', ...(isLessThanLg ? { display: 'none' } : {}) }}>
        <Typography
          variant="h6"
          sx={{
            width: '100%',
            overflowWrap: 'break-word',
            textOverflow: 'ellipsis',
          }}>
          {user.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            width: '100%',
            overflowWrap: 'break-word',
            textOverflow: 'ellipsis',
          }}>
          {message.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChatRoomCard;
