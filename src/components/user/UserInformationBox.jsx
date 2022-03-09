import React from 'react';

import { Box, Typography, Avatar, Container } from '@mui/material';
import NameBasedAvatar from './../avatar/NameBasedAvatar';

const UserInformationBox = ({ user = {} }) => {
  if (!user) return <></>;
  console.log(user);

  const dob = new Date(user.dob);
  console.log(dob);
  const date = dob.getDate();
  const month = dob.getMonth() + 1;
  const year = dob.getFullYear();

  const userDob = `${date}/${month}/${year}`;

  console.log(userDob);

  return (
    <Container sx={{ py: 2 }}>
      {user && (
        <>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {user.avatarUrl && (
              <Avatar
                sx={{ height: 50, width: 50 }}
                alt={user.name}
                src={user.avatarUrl}
              />
            )}
            {!user.avatarUrl && (
              <NameBasedAvatar
                sx={{ height: 70, width: 70 }}
                alt={user.name}
                name={user.name}
              />
            )}
          </Box>
          <Typography variant="h6" align="center">
            {user.name}
          </Typography>
          <Typography variant="subtitle1">Ngày sinh : {userDob}</Typography>
          <Typography variant="subtitle1">Giới tính: {user.gender}</Typography>
          <Typography variant="subtitle1">Email : {user.email}</Typography>
          <Typography variant="subtitle1">
            Số điện thoại: {user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1">Địa chỉ: {user.address}</Typography>
        </>
      )}
    </Container>
  );
};

export default UserInformationBox;
