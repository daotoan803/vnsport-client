import React from 'react';

import { CircularProgress, Backdrop } from '@mui/material';

const BackdropSpinner = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropSpinner;
