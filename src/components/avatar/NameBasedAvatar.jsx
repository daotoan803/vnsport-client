import React from 'react';
import Avatar from '@mui/material/Avatar';

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

const NameBasedAvatar = ({ name, sx, ...props }) => {
  const nameAvatarProps = stringAvatar(name);

  const style = {
    ...sx,
    ...nameAvatarProps.sx,
  };

  console.log(style);

  return (
    <Avatar {...props} sx={style}>
      {nameAvatarProps.children}
    </Avatar>
  );
};

export default NameBasedAvatar;
